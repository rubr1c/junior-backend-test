import type { Request, Response } from 'express';

import { ProductModel } from '../models/product.js';
import { AppError } from '../utils/error.js';
import { HttpStatus } from '../utils/http.js';

export async function createProduct(req: Request, res: Response): Promise<void> {
  const product = await ProductModel.create(req.body);

  res.status(HttpStatus.CREATED).json({
    success: true,
    data: product,
  });
}

export async function getProducts(req: Request, res: Response): Promise<void> {
  const page = parseInt(req.query.page as string) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  const [products, total] = await Promise.all([
    ProductModel.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
    ProductModel.countDocuments(),
  ]);

  res.status(HttpStatus.OK).json({
    success: true,
    data: products,
    pagination: {
      total,
      page,
      pages: Math.ceil(total / limit),
      limit,
    },
  });
}

export async function getProductById(req: Request, res: Response): Promise<void> {
  const product = await ProductModel.findById(req.params.id);

  if (!product) {
    throw new AppError(HttpStatus.NOT_FOUND, 'Product not found');
  }

  res.status(HttpStatus.OK).json({
    success: true,
    data: product,
  });
}

export async function updateProduct(req: Request, res: Response): Promise<void> {
  const product = await ProductModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    throw new AppError(HttpStatus.NOT_FOUND, 'Product not found');
  }

  res.status(HttpStatus.OK).json({
    success: true,
    data: product,
  });
}

export async function deleteProduct(req: Request, res: Response): Promise<void> {
  const product = await ProductModel.findByIdAndDelete(req.params.id);

  if (!product) {
    throw new AppError(HttpStatus.NOT_FOUND, 'Product not found');
  }

  res.status(HttpStatus.OK).json({
    success: true,
    data: {},
  });
}
