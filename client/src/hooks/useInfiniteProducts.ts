import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { PAGINATION_CONSTANTS } from '../constants/app.constants';
import { IProduct, IPaginatedResponse, IProductStats } from '../types/product.types';
import { fetchProducts } from '../services/product.service';

interface UseInfiniteProductsReturn {
  products: IProduct[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  stats: IProductStats | null;
  loadMore: () => void;
  refresh: () => void;
}

export const useInfiniteProducts = (
  initialCategory?: string, 
  initialSearch?: string,
  initialData?: IPaginatedResponse
): UseInfiniteProductsReturn => {
  const [products, setProducts] = useState<IProduct[]>(() => initialData?.data ?? []);
  const [nextCursor, setNextCursor] = useState<string | null>(
    () => initialData?.pagination.nextCursor ?? null
  );
  const [hasMore, setHasMore] = useState<boolean>(
    () => initialData?.pagination.hasMore ?? false
  );
  const [stats, setStats] = useState<IProductStats | null>(
    () => initialData?.stats ?? null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const queryKey = useMemo(
    () => `${initialCategory || ''}::${initialSearch || ''}`,
    [initialCategory, initialSearch]
  );
  const hasInitialized = useRef(false);

  const fetchFirstPage = useCallback(async () => {
    setLoading(true);
    setError(null);
    setProducts([]);
    setNextCursor(null);
    setHasMore(false);
    try {
      const response = await fetchProducts(
        null,
        PAGINATION_CONSTANTS.DEFAULT_LIMIT,
        initialCategory,
        initialSearch
      );

      if (response && response.pagination) {
        setProducts(response.data || []);
        setNextCursor(response.pagination.nextCursor ?? null);
        setHasMore(response.pagination.hasMore ?? false);
        setStats(response.stats ?? null);
      }
    } catch (err) {
      setError('Failed to load products');
      setProducts([]);
      setNextCursor(null);
      setHasMore(false);
      setStats(null);
    } finally {
      setLoading(false);
    }
  }, [initialCategory, initialSearch]);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore || !nextCursor) return;

    setLoading(true);
    try {
      const response = await fetchProducts(
        nextCursor,
        PAGINATION_CONSTANTS.DEFAULT_LIMIT,
        initialCategory,
        initialSearch
      );
      
      // FIX: Ensure response structure is valid before updating
      if (response && response.data) {
        setProducts(prev => [...prev, ...response.data]);
        setNextCursor(response.pagination?.nextCursor ?? null);
        setHasMore(response.pagination?.hasMore ?? false);
        setStats(response.stats ?? null);
      }
    } catch (err) {
      setError('Failed to load more products');
    } finally {
      setLoading(false);
    }
  }, [nextCursor, hasMore, loading, initialCategory, initialSearch]);

  const refresh = useCallback(() => {
    void fetchFirstPage();
  }, [fetchFirstPage]);

  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      return;
    }
    void fetchFirstPage();
  }, [queryKey, fetchFirstPage]);

  return { products, loading, error, hasMore, stats, loadMore, refresh };
};