import { useState, useEffect, useCallback } from 'react';
import { IProduct, IPaginatedResponse } from '../types/product.types';
import { fetchProducts } from '../services/product.service';

interface UseInfiniteProductsReturn {
  products: IProduct[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => void;
  reset: () => void;
  setInitialData: (data: IPaginatedResponse) => void;
}

export const useInfiniteProducts = (
  initialCategory?: string, 
  initialSearch?: string
): UseInfiniteProductsReturn => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Function to load the next page
  const loadMore = useCallback(async () => {
    if (loading || !hasMore || !nextCursor) return;

    setLoading(true);
    try {
      const response = await fetchProducts(nextCursor, 10, initialCategory, initialSearch);
      
      setProducts(prev => [...prev, ...response.data]);
      setNextCursor(response.pagination.nextCursor);
      setHasMore(response.pagination.hasMore);
    } catch (err) {
      setError('Failed to load more products');
    } finally {
      setLoading(false);
    }
  }, [nextCursor, hasMore, loading, initialCategory, initialSearch]);

  // Reset function (useful when changing filters)
  const reset = useCallback(() => {
    setProducts([]);
    setNextCursor(null);
    setHasMore(true); // Assume true until first fetch
    setError(null);
  }, []);

  // Initialize with SSR data
  const setInitialData = useCallback((data: IPaginatedResponse) => {
    setProducts(data.data);
    setNextCursor(data.pagination.nextCursor);
    setHasMore(data.pagination.hasMore);
  }, []);

  return { products, loading, error, hasMore, loadMore, reset, setInitialData };
};