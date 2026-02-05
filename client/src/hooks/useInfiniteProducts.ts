import { useState, useCallback } from 'react';
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

  const loadMore = useCallback(async () => {
    if (loading || !hasMore || !nextCursor) return;

    setLoading(true);
    try {
      const response = await fetchProducts(nextCursor, 10, initialCategory, initialSearch);
      
      // FIX: Ensure response structure is valid before updating
      if (response && response.data) {
        setProducts(prev => [...prev, ...response.data]);
        setNextCursor(response.pagination?.nextCursor ?? null);
        setHasMore(response.pagination?.hasMore ?? false);
      }
    } catch (err) {
      setError('Failed to load more products');
    } finally {
      setLoading(false);
    }
  }, [nextCursor, hasMore, loading, initialCategory, initialSearch]);

  const reset = useCallback(() => {
    setProducts([]);
    setNextCursor(null);
    setHasMore(true);
    setError(null);
  }, []);

  // FIX: Add safety check for initial data structure
  const setInitialData = useCallback((data: IPaginatedResponse) => {
    if (!data || !data.pagination) return; // Stop if data is malformed

    setProducts(data.data || []);
    setNextCursor(data.pagination.nextCursor);
    setHasMore(data.pagination.hasMore);
  }, []);

  return { products, loading, error, hasMore, loadMore, reset, setInitialData };
};