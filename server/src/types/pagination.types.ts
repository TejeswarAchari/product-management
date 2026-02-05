export interface IPaginatedResponse<T> {
  data: T[];
  pagination: {
    nextCursor: string | null;
    hasMore: boolean;
  };
  stats?: IPaginationStats;
}

export interface ICursorPaginationRequest {
  cursor?: string;
  limit?: number;
}

export interface IPaginationStats {
  total: number;
  inStock: number;
  outOfStock: number;
}