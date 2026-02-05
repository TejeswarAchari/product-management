import mongoose from 'mongoose';
import ProductModel, { IProductDocument } from '../models/Product.model';
import { IProduct } from '../types/product.types';
import { IPaginatedResponse, IPaginationStats } from '../types/pagination.types';
import { HttpStatus, PAGINATION_CONSTANTS, ProductCategory, SortOrder } from '../constants/app.constants';
import { AppError } from '../middleware/error.middleware';

type ProductQuery = Record<string, unknown>;

export class ProductService {
  private static async getStockStats(
    baseQuery: ProductQuery
  ): Promise<IPaginationStats> {
    const [total, inStock, outOfStock] = await Promise.all([
      ProductModel.countDocuments(baseQuery),
      ProductModel.countDocuments({ ...baseQuery, stock: { $gt: 0 } }),
      ProductModel.countDocuments({ ...baseQuery, stock: { $lte: 0 } })
    ]);

    return { total, inStock, outOfStock };
  }

  private static ensureValidCursor(cursor?: string): mongoose.Types.ObjectId | undefined {
    if (!cursor) return undefined;
    if (!mongoose.isValidObjectId(cursor)) {
      throw new AppError(HttpStatus.BAD_REQUEST, 'Invalid cursor');
    }
    return new mongoose.Types.ObjectId(cursor);
  }

  private static escapeRegex(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  
  static async createProduct(data: IProduct): Promise<IProductDocument> {
    const product = new ProductModel(data);
    return await product.save();
  }

  static async getProducts(
    cursor: string | undefined,
    limit: number = PAGINATION_CONSTANTS.DEFAULT_LIMIT,
    category?: ProductCategory
  ): Promise<IPaginatedResponse<IProductDocument>> {
    const safeLimit = Math.min(limit, PAGINATION_CONSTANTS.MAX_LIMIT);

    const cursorId = ProductService.ensureValidCursor(cursor);
    const query: ProductQuery = {
      ...(cursorId ? { _id: { $gt: cursorId } } : {}),
      ...(category ? { category } : {})
    };

    const products = await ProductModel.find(query)
      .sort({ _id: SortOrder.ASC })
      .limit(safeLimit + 1);

    const hasMore = products.length > safeLimit;
    let nextCursor: string | null = null;
    
    if (hasMore) {
      products.pop();
      const lastItem = products[products.length - 1];
      nextCursor = lastItem ? lastItem._id.toString() : null;
    }

    const statsQuery: ProductQuery = category ? { category } : {};
    const stats = await ProductService.getStockStats(statsQuery);

    return {
      data: products,
      pagination: {
        nextCursor,
        hasMore
      },
      stats
    };
  }

  static async searchProducts(
    queryText: string,
    cursor: string | undefined,
    limit: number = PAGINATION_CONSTANTS.DEFAULT_LIMIT,
    category?: ProductCategory
  ): Promise<IPaginatedResponse<IProductDocument>> {
    const safeLimit = Math.min(limit, PAGINATION_CONSTANTS.MAX_LIMIT);
    const trimmedQuery = queryText.trim().slice(0, 100);
    if (!trimmedQuery) {
      throw new AppError(HttpStatus.BAD_REQUEST, 'Query parameter q is required');
    }
    const safeQueryText = ProductService.escapeRegex(trimmedQuery);

    const cursorId = ProductService.ensureValidCursor(cursor);
    const query: ProductQuery = {
      ...(cursorId ? { _id: { $gt: cursorId } } : {}),
      ...(category ? { category } : {}),
      name: { $regex: safeQueryText, $options: 'i' }
    };

    const products = await ProductModel.find(query)
      .sort({ _id: SortOrder.ASC })
      .limit(safeLimit + 1);

    const hasMore = products.length > safeLimit;
    let nextCursor: string | null = null;

    if (hasMore) {
      products.pop();
      const lastItem = products[products.length - 1];
      nextCursor = lastItem ? lastItem._id.toString() : null;
    }

    const statsQuery: ProductQuery = {
      ...(category ? { category } : {}),
      name: { $regex: safeQueryText, $options: 'i' }
    };
    const stats = await ProductService.getStockStats(statsQuery);

    return {
      data: products,
      pagination: {
        nextCursor,
        hasMore
      },
      stats
    };
  }
}