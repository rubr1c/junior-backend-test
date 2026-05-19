import { body } from 'express-validator';

export const createProductRules = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required'),
  body('category')
    .optional({ values: 'null' })
    .isString()
    .withMessage('Category must be a string')
    .trim(),
  body('price')
    .exists({ checkNull: true })
    .withMessage('Price is required')
    .isFloat({ gt: 0 })
    .withMessage('Price must be a positive number'),
  body('quantity')
    .exists({ checkNull: true })
    .withMessage('Quantity is required')
    .isInt({ min: 0 })
    .withMessage('Quantity must be a non-negative integer'),
];

export const updateProductRules = [
  body('name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Name cannot be empty'),
  body('category')
    .optional({ values: 'null' })
    .isString()
    .withMessage('Category must be a string')
    .trim(),
  body('price')
    .optional()
    .isFloat({ gt: 0 })
    .withMessage('Price must be a positive number'),
  body('quantity')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Quantity must be a non-negative integer'),
];
