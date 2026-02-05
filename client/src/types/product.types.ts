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

export interface IPaginatedResponse {
  data: IProduct[];
  pagination: {
    nextCursor: string | null;
    hasMore: boolean;
  };
}