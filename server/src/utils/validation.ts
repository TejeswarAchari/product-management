import { HttpStatus, PAGINATION_CONSTANTS, ProductCategory } from '../constants/app.constants';
import { AppError } from '../middleware/error.middleware';
import { IProduct } from '../types/product.types';

const normalizeText = (value: string, maxLength: number): string => {
  return value.trim().replace(/\s+/g, ' ').slice(0, maxLength);
};

export const parseLimit = (limit?: string): number => {
  if (!limit) return PAGINATION_CONSTANTS.DEFAULT_LIMIT;
  const parsed = Number(limit);
  if (!Number.isInteger(parsed) || parsed < 1 || parsed > PAGINATION_CONSTANTS.MAX_LIMIT) {
    throw new AppError(
      HttpStatus.BAD_REQUEST,
      `Limit must be between 1 and ${PAGINATION_CONSTANTS.MAX_LIMIT}`
    );
  }
  return parsed;
};

export const parseCategory = (category?: string): ProductCategory | undefined => {
  if (!category) return undefined;
  if (!Object.values(ProductCategory).includes(category as ProductCategory)) {
    throw new AppError(HttpStatus.BAD_REQUEST, 'Invalid category');
  }
  return category as ProductCategory;
};

export const sanitizeSearchQuery = (queryText: string | undefined): string => {
  if (!queryText || typeof queryText !== 'string') {
    throw new AppError(HttpStatus.BAD_REQUEST, 'Query parameter q is required');
  }
  const trimmed = normalizeText(queryText, 100);
  if (!trimmed) {
    throw new AppError(HttpStatus.BAD_REQUEST, 'Query parameter q is required');
  }
  return trimmed;
};

export const validateCreateProductPayload = (payload: unknown): IProduct => {
  if (!payload || typeof payload !== 'object') {
    throw new AppError(HttpStatus.BAD_REQUEST, 'Invalid product payload');
  }

  const body = payload as Record<string, unknown>;
  const name = typeof body.name === 'string' ? normalizeText(body.name, 120) : '';
  const description = typeof body.description === 'string' ? normalizeText(body.description, 2000) : '';
  const price = Number(body.price);
  const stock = Number(body.stock);
  const category = typeof body.category === 'string' ? parseCategory(body.category) : undefined;

  if (!name) {
    throw new AppError(HttpStatus.BAD_REQUEST, 'Product name is required');
  }
  if (!description) {
    throw new AppError(HttpStatus.BAD_REQUEST, 'Product description is required');
  }
  if (!Number.isFinite(price) || price < 0) {
    throw new AppError(HttpStatus.BAD_REQUEST, 'Price must be a positive number');
  }
  if (!Number.isInteger(stock) || stock < 0) {
    throw new AppError(HttpStatus.BAD_REQUEST, 'Stock must be a non-negative integer');
  }
  if (!category) {
    throw new AppError(HttpStatus.BAD_REQUEST, 'Category is required');
  }

  return {
    name,
    description,
    price,
    stock,
    category
  };
};
