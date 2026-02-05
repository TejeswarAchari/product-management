import axios from 'axios';
import { IPaginatedResponse } from '../types/product.types';

// Use environment variable for API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api/products';

export const fetchProducts = async (
  cursor?: string | null,
  limit: number = 10,
  category?: string,
  search?: string
): Promise<IPaginatedResponse> => {
  try {
    const params: any = { limit };
    
    if (cursor) params.cursor = cursor;
    if (category) params.category = category;
    
    // Determine endpoint based on search availability
    const url = search ? `${API_URL}/search` : API_URL;
    if (search) params.q = search;

    const response = await axios.get<IPaginatedResponse>(url, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};