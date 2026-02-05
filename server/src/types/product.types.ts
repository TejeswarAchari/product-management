import { ProductCategory } from '../constants/app.constants';

export interface IProduct {
  _id?: string; // Optional for creation, required for fetch
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  stock: number;
  createdAt: Date;
}