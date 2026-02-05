import ProductModel, { IProductDocument } from '../models/Product.model';
import { IProduct } from '../types/product.types';
import { IPaginatedResponse, IPaginationStats } from '../types/pagination.types';
import { PAGINATION_CONSTANTS, SortOrder } from '../constants/app.constants';

export class ProductService {
  private static async getStockStats(): Promise<IPaginationStats> {
    const [total, inStock, outOfStock] = await Promise.all([
      ProductModel.countDocuments(),
      ProductModel.countDocuments({ stock: { $gt: 0 } }),
      ProductModel.countDocuments({ stock: { $lte: 0 } })
    ]);

    return { total, inStock, outOfStock };
  }
  
  static async createProduct(data: IProduct): Promise<IProductDocument> {
    const product = new ProductModel(data);
    return await product.save();
  }

  static async getProducts(
    cursor: string | undefined,
    limit: number = PAGINATION_CONSTANTS.DEFAULT_LIMIT,
    category?: string
  ): Promise<IPaginatedResponse<IProductDocument>> {
    
    const safeLimit = Math.min(limit, PAGINATION_CONSTANTS.MAX_LIMIT);
    

    const query: { _id?: { $gt: string }; category?: string } = {};
    
    if (cursor) {
      query._id = { $gt: cursor };
    }

    if (category) {
      query.category = category;
    }

    // Pass the query to find
    const products = await ProductModel.find(query)
      .sort({ _id: SortOrder.ASC })
      .limit(safeLimit + 1);

    const hasMore = products.length > safeLimit;
    let nextCursor: string | null = null;
    
    if (hasMore) {
      products.pop();
      const lastItem = products[products.length - 1];
      nextCursor = lastItem._id.toString();
    } else if (products.length > 0) {
      const lastItem = products[products.length - 1];
      nextCursor = lastItem._id.toString();
    }

    const stats = await ProductService.getStockStats();

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
    category?: string
  ): Promise<IPaginatedResponse<IProductDocument>> {
    const safeLimit = Math.min(limit, PAGINATION_CONSTANTS.MAX_LIMIT);

    const query: {
      _id?: { $gt: string };
      category?: string;
      name?: { $regex: string; $options: string };
    } = {
      name: { $regex: queryText, $options: 'i' }
    };

    if (cursor) {
      query._id = { $gt: cursor };
    }

    if (category) {
      query.category = category;
    }

    const products = await ProductModel.find(query)
      .sort({ _id: SortOrder.ASC })
      .limit(safeLimit + 1);

    const hasMore = products.length > safeLimit;
    let nextCursor: string | null = null;

    if (hasMore) {
      products.pop();
      const lastItem = products[products.length - 1];
      nextCursor = lastItem._id.toString();
    } else if (products.length > 0) {
      const lastItem = products[products.length - 1];
      nextCursor = lastItem._id.toString();
    }

    const stats = await ProductService.getStockStats();

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