import axios from 'axios';
import { API_ENDPOINTS, PAGINATION_CONSTANTS } from '../constants/app.constants';
import {
  ICursorPaginationRequest,
  IPaginatedResponse,
  IProductCreatePayload
} from '../types/product.types';

const normalizeBaseUrl = (url: string): string => {
  if (url.endsWith(API_ENDPOINTS.PRODUCTS)) {
    return url.slice(0, -API_ENDPOINTS.PRODUCTS.length);
  }
  return url;
};

const API_BASE_URL = normalizeBaseUrl(
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'
);

const PRODUCTS_URL = `${API_BASE_URL}${API_ENDPOINTS.PRODUCTS}`;
const SEARCH_URL = `${API_BASE_URL}${API_ENDPOINTS.PRODUCTS_SEARCH}`;

export const fetchProducts = async (
  cursor?: string | null,
  limit: number = PAGINATION_CONSTANTS.DEFAULT_LIMIT,
  category?: string,
  search?: string
): Promise<IPaginatedResponse> => {
  try {
    const params: ICursorPaginationRequest = { limit };
    
    if (cursor) params.cursor = cursor;
    if (category) params.category = category;
    
    // Determine endpoint based on search availability
    const url = search ? SEARCH_URL : PRODUCTS_URL;
    if (search) params.q = search;

    const response = await axios.get<IPaginatedResponse>(url, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const createProduct = async (payload: IProductCreatePayload): Promise<void> => {
  await axios.post(PRODUCTS_URL, payload);
};