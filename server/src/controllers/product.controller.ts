import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';
import { HttpStatus } from '../constants/app.constants';

export class ProductController {
  
  // GET /api/products
  static async getProducts(req: Request, res: Response): Promise<void> {
    try {
      const cursor = req.query.cursor as string | undefined;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const category = req.query.category as string | undefined;

      const result = await ProductService.getProducts(cursor, limit, category);
      
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error fetching products', error });
    }
  }

  // POST /api/products
  static async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const product = await ProductService.createProduct(req.body);
      res.status(HttpStatus.CREATED).json(product);
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({ message: 'Error creating product', error });
    }
  }

  // GET /api/products/search
  static async searchProducts(req: Request, res: Response): Promise<void> {
    try {
      const query = req.query.q as string;
      if (!query) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: 'Query parameter q is required' });
        return;
      }
      const results = await ProductService.searchProducts(query);
      res.status(HttpStatus.OK).json(results);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Search failed', error });
    }
  }
}