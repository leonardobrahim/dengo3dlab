import { ENV } from '@/src/config/env';
import { ApiResponse, ApiError } from '@/src/types';

export interface RequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean | undefined>;
  signal?: AbortSignal;
}

export type Interceptor<T> = (data: T) => T | Promise<T>;
export type ErrorInterceptor = (error: ApiError) => Promise<never> | void;

/**
 * Abstract HTTP Client providing standard CRUD operations,
 * token authorization, interceptors and decoupled backend connectivity.
 */
export class ApiClient {
  private baseUrl: string;
  private authToken: string | null = null;
  private requestInterceptors: Array<Interceptor<RequestInit>> = [];
  private responseInterceptors: Array<Interceptor<Response>> = [];
  private errorInterceptors: Array<ErrorInterceptor> = [];

  constructor(baseUrl: string = ENV.API_BASE_URL) {
    this.baseUrl = baseUrl;
    // Attempt to restore token from localStorage if available
    if (typeof window !== 'undefined') {
      this.authToken = localStorage.getItem('3dforge_auth_token');
    }
  }

  public setToken(token: string | null) {
    this.authToken = token;
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('3dforge_auth_token', token);
      } else {
        localStorage.removeItem('3dforge_auth_token');
      }
    }
  }

  public getToken(): string | null {
    return this.authToken;
  }

  public addRequestInterceptor(interceptor: Interceptor<RequestInit>) {
    this.requestInterceptors.push(interceptor);
  }

  public addResponseInterceptor(interceptor: Interceptor<Response>) {
    this.responseInterceptors.push(interceptor);
  }

  public addErrorInterceptor(interceptor: ErrorInterceptor) {
    this.errorInterceptors.push(interceptor);
  }

  private buildUrl(endpoint: string, params?: Record<string, string | number | boolean | undefined>): string {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    let url = `${this.baseUrl}${cleanEndpoint}`;

    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });
      const queryString = searchParams.toString();
      if (queryString) {
        url += (url.includes('?') ? '&' : '?') + queryString;
      }
    }

    return url;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}, params?: Record<string, any>): Promise<ApiResponse<T>> {
    const url = this.buildUrl(endpoint, params);

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (this.authToken) {
      headers['Authorization'] = `Bearer ${this.authToken}`;
    }

    let config: RequestInit = {
      ...options,
      headers,
    };

    // Apply request interceptors
    for (const interceptor of this.requestInterceptors) {
      config = await interceptor(config);
    }

    try {
      let response = await fetch(url, config);

      // Apply response interceptors
      for (const interceptor of this.responseInterceptors) {
        response = await interceptor(response);
      }

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const error: ApiError = {
          message: data.message || `Erro na requisição (${response.status})`,
          statusCode: response.status,
          code: data.code,
          details: data.details,
        };

        for (const handler of this.errorInterceptors) {
          handler(error);
        }

        throw error;
      }

      return {
        success: true,
        data: data.data !== undefined ? data.data : (data as T),
        message: data.message,
        statusCode: response.status,
      };
    } catch (err: any) {
      if (err.statusCode) {
        throw err;
      }
      const networkError: ApiError = {
        message: err.message || 'Erro de conexão com o servidor.',
        statusCode: 0,
      };
      throw networkError;
    }
  }

  public async get<T>(endpoint: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET', headers: options?.headers, signal: options?.signal }, options?.params);
  }

  public async post<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(
      endpoint,
      {
        method: 'POST',
        headers: options?.headers,
        signal: options?.signal,
        body: data !== undefined ? JSON.stringify(data) : undefined,
      },
      options?.params
    );
  }

  public async put<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(
      endpoint,
      {
        method: 'PUT',
        headers: options?.headers,
        signal: options?.signal,
        body: data !== undefined ? JSON.stringify(data) : undefined,
      },
      options?.params
    );
  }

  public async patch<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(
      endpoint,
      {
        method: 'PATCH',
        headers: options?.headers,
        signal: options?.signal,
        body: data !== undefined ? JSON.stringify(data) : undefined,
      },
      options?.params
    );
  }

  public async delete<T>(endpoint: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE', headers: options?.headers, signal: options?.signal }, options?.params);
  }
}

export const apiClient = new ApiClient();
