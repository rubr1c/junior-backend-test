import mongoose, { Schema } from 'mongoose';

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 0 },
  },
  { 
    timestamps: true,
    toJSON: {
      versionKey: false,
    },
  },
);

export const ProductModel =
  mongoose.models.Product ?? mongoose.model('Product', productSchema);
