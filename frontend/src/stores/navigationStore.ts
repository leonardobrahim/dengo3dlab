import { create } from 'zustand';

export interface RouteParams {
  slug?: string;
  categorySlug?: string;
  category?: string;
  query?: string;
  q?: string;
  sort?: string;
  minPrice?: string | number;
  maxPrice?: string | number;
  material?: string;
  color?: string;
  size?: string;
  rating?: string | number;
  inStock?: boolean | string;
  page?: string | number;
  limit?: string | number;
  tab?: string;
  [key: string]: any;
}

interface NavigationState {
  currentPath: string;
  params: RouteParams;
  history: string[];
  navigate: (path: string, params?: RouteParams) => void;
  setQueryParams: (params: Partial<RouteParams>) => void;
  goBack: () => void;
  syncFromHash: () => void;
}

export const buildQueryString = (params: RouteParams): string => {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, val]) => {
    if (val !== undefined && val !== null && val !== '') {
      if (key === 'query' || key === 'q') {
        searchParams.set('q', String(val));
      } else if (key === 'categorySlug' || key === 'category') {
        searchParams.set('category', String(val));
      } else {
        searchParams.set(key, String(val));
      }
    }
  });

  const str = searchParams.toString();
  return str ? `?${str}` : '';
};

export const parseHashRoute = (): { path: string; params: RouteParams } => {
  if (typeof window === 'undefined') {
    return { path: '/', params: {} };
  }

  const hash = window.location.hash.replace(/^#/, '');
  if (!hash || !hash.startsWith('/')) {
    return { path: '/', params: {} };
  }

  const [pathPart, queryPart] = hash.split('?');
  const params: RouteParams = {};

  if (queryPart) {
    const searchParams = new URLSearchParams(queryPart);
    searchParams.forEach((value, key) => {
      if (key === 'q') {
        params.query = value;
        params.q = value;
      } else if (key === 'category') {
        params.categorySlug = value;
        params.category = value;
      } else if (key === 'inStock') {
        params.inStock = value === 'true';
      } else {
        params[key] = value;
      }
    });
  }

  // Check dynamic paths like /produtos/[slug]
  if (pathPart.startsWith('/produtos/') && pathPart !== '/produtos') {
    const slug = pathPart.replace('/produtos/', '');
    params.slug = slug;
  }

  // Check dynamic paths like /categorias/[slug]
  if (pathPart.startsWith('/categorias/') && pathPart !== '/categorias') {
    const categorySlug = pathPart.replace('/categorias/', '');
    params.categorySlug = categorySlug;
    params.category = categorySlug;
  }

  return { path: pathPart, params };
};

const initial = parseHashRoute();

export const useNavigationStore = create<NavigationState>((set, get) => ({
  currentPath: initial.path,
  params: initial.params,
  history: [initial.path],

  navigate: (path: string, params: RouteParams = {}) => {
    // Normalise slug / query keys
    const normalizedParams: RouteParams = { ...params };
    if (normalizedParams.q && !normalizedParams.query) normalizedParams.query = normalizedParams.q;
    if (normalizedParams.query && !normalizedParams.q) normalizedParams.q = normalizedParams.query;
    if (normalizedParams.category && !normalizedParams.categorySlug) normalizedParams.categorySlug = normalizedParams.category;
    if (normalizedParams.categorySlug && !normalizedParams.category) normalizedParams.category = normalizedParams.categorySlug;

    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const queryStr = buildQueryString(normalizedParams);
      window.location.hash = `${path}${queryStr}`;
    }

    set((state) => ({
      currentPath: path,
      params: normalizedParams,
      history: [...state.history, path],
    }));
  },

  setQueryParams: (newParams: Partial<RouteParams>) => {
    const currentPath = get().currentPath;
    const currentParams = get().params;
    const merged = { ...currentParams, ...newParams };

    // Clean empty values
    Object.keys(merged).forEach((k) => {
      if (merged[k] === undefined || merged[k] === null || merged[k] === '') {
        delete merged[k];
      }
    });

    if (typeof window !== 'undefined') {
      const queryStr = buildQueryString(merged);
      window.location.hash = `${currentPath}${queryStr}`;
    }

    set({
      params: merged,
    });
  },

  goBack: () => {
    const { history } = get();
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      const previousPath = newHistory[newHistory.length - 1];

      if (typeof window !== 'undefined') {
        window.location.hash = previousPath;
      }

      set({
        currentPath: previousPath,
        history: newHistory,
      });
    } else {
      get().navigate('/');
    }
  },

  syncFromHash: () => {
    const parsed = parseHashRoute();
    set({
      currentPath: parsed.path,
      params: parsed.params,
    });
  },
}));
