import { ProductCategory } from '../constants/app.constants';

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  stock: number;
  createdAt: string;
}

export interface IPaginatedResponse<T = IProduct> {
  data: T[];
  pagination: {
    nextCursor: string | null;
    hasMore: boolean;
  };
  stats?: IProductStats;
}

export interface IProductStats {
  total: number;
  inStock: number;
  outOfStock: number;
}

export interface ICursorPaginationRequest {
  cursor?: string | null;
  limit?: number;
  category?: string;
  q?: string;
}

export type IProductCreatePayload = Omit<IProduct, '_id' | 'createdAt'>;