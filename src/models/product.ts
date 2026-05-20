import mongoose, {
  Schema,
  type HydratedDocument,
  type InferSchemaType,
  type Model,
} from 'mongoose';

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 0 },
  },
  { timestamps: true },
);

export type Product = InferSchemaType<typeof productSchema>;
export type ProductDocument = HydratedDocument<Product>;

export const ProductModel =
  (mongoose.models.Product as Model<Product> | undefined) ??
  mongoose.model<Product>('Product', productSchema);
