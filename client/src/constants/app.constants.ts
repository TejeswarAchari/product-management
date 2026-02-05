export enum ProductCategory {
  ELECTRONICS = 'ELECTRONICS',
  CLOTHING = 'CLOTHING',
  BOOKS = 'BOOKS',
  FOOD = 'FOOD'
}

export const PAGINATION_CONSTANTS = {
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 50
} as const;

export const API_ENDPOINTS = {
  PRODUCTS: '/api/products',
  PRODUCTS_SEARCH: '/api/products/search'
} as const;