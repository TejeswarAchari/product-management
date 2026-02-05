import { NextFunction, Request, Response } from 'express';
import { ProductService } from '../services/product.service';
import { HttpStatus } from '../constants/app.constants';
import { AppError } from '../middleware/error.middleware';
import {
  parseCategory,
  parseLimit,
  sanitizeSearchQuery,
  validateCreateProductPayload
} from '../utils/validation';

export class ProductController {
  
  static async getProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const cursor = req.query.cursor as string | undefined;
      const limit = parseLimit(req.query.limit as string | undefined);
      const category = parseCategory(req.query.category as string | undefined);

      const result = await ProductService.getProducts(cursor, limit, category);
      
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error as AppError);
    }
  }

  static async createProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const payload = validateCreateProductPayload(req.body);
      const product = await ProductService.createProduct(payload);
      res.status(HttpStatus.CREATED).json(product);
    } catch (error) {
      next(error as AppError);
    }
  }

  static async searchProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const query = sanitizeSearchQuery(req.query.q as string);
      const cursor = req.query.cursor as string | undefined;
      const limit = parseLimit(req.query.limit as string | undefined);
      const category = parseCategory(req.query.category as string | undefined);

      const results = await ProductService.searchProducts(query, cursor, limit, category);
      res.status(HttpStatus.OK).json(results);
    } catch (error) {
      next(error as AppError);
    }
  }
}