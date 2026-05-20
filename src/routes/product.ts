import { Router } from 'express';

import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from '../controllers/product.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validate.js';
import {
  createProductRules,
  updateProductRules,
} from '../validators/product.js';

export const productRouter = Router();

productRouter.post(
  '/',
  requireAuth,
  requireRole('admin'),
  createProductRules,
  validateRequest,
  createProduct,
);

productRouter.get('/', getProducts);

productRouter.get('/:id', getProductById);

productRouter.put(
  '/:id',
  requireAuth,
  requireRole('admin'),
  updateProductRules,
  validateRequest,
  updateProduct,
);

productRouter.delete(
  '/:id',
  requireAuth,
  requireRole('admin'),
  deleteProduct,
);
