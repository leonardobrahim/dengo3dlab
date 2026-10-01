import { ENV } from '@/src/config/env';
import { apiClient } from '../api/apiClient';
import { Product, Category, Review, ApiResponse, PaginatedResponse } from '@/src/types';
import { mockProducts, mockCategories, mockReviews } from '@/src/mocks';

export interface ProductFilterParams {
  category?: string;
  technology?: string;
  material?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: 'price_asc' | 'price_desc' | 'rating' | 'newest';
}

export const productService = {
  async getProducts(params?: ProductFilterParams): Promise<PaginatedResponse<Product>> {
    if (ENV.USE_MOCK_API) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      let filtered = [...mockProducts];

      if (params?.search) {
        const query = params.search.toLowerCase();
        filtered = filtered.filter(
          (p) =>
            p.name.toLowerCase().includes(query) ||
            p.shortDescription.toLowerCase().includes(query) ||
            p.tags.some((t) => t.toLowerCase().includes(query))
        );
      }

      if (params?.category) {
        filtered = filtered.filter((p) => p.categories.some((c) => c.slug === params.category));
      }

      if (params?.technology) {
        filtered = filtered.filter((p) => p.technicalSpecs?.technology === params.technology);
      }

      return {
        success: true,
        data: filtered,
        pagination: {
          page: params?.page || 1,
          limit: params?.limit || 10,
          total: filtered.length,
          totalPages: 1,
          hasNextPage: false,
          hasPrevPage: false,
        },
      };
    }

    const response = await apiClient.get<PaginatedResponse<Product>>('/products', { params: params as Record<string, any> });
    return response.data;
  },

  async getProductBySlug(slug: string): Promise<ApiResponse<Product>> {
    if (ENV.USE_MOCK_API) {
      await new Promise((resolve) => setTimeout(resolve, 250));
      const product = mockProducts.find((p) => p.slug === slug);
      if (!product) {
        throw { message: 'Produto não encontrado', statusCode: 404 };
      }
      return { success: true, data: product, statusCode: 200 };
    }
    return apiClient.get<Product>(`/products/slug/${slug}`);
  },

  async getCategories(): Promise<ApiResponse<Category[]>> {
    if (ENV.USE_MOCK_API) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return { success: true, data: mockCategories, statusCode: 200 };
    }
    return apiClient.get<Category[]>('/categories');
  },

  async getProductReviews(productId: string): Promise<ApiResponse<Review[]>> {
    if (ENV.USE_MOCK_API) {
      await new Promise((resolve) => setTimeout(resolve, 250));
      const reviews = mockReviews.filter((r) => r.productId === productId);
      return { success: true, data: reviews, statusCode: 200 };
    }
    return apiClient.get<Review[]>(`/products/${productId}/reviews`);
  },
};
