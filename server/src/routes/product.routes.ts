import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { API_ENDPOINTS } from '../constants/app.constants';

const router = Router();

// Define routes using constants
// Note: We mount this router at /api/products in server.ts, so paths are relative
router.get('/', ProductController.getProducts);
router.post('/', ProductController.createProduct);
router.get('/search', ProductController.searchProducts);

export default router;