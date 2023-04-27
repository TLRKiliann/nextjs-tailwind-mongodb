import mongoose, { model, models, Schema, Model, Document } from 'mongoose';

interface ProductProps extends Document {
  name: string;
  slug: string;
  category: string;
  image: string;
  price: string;
  brand: string;
  rating: number;
  numReviews: number; 
  countInStock: number;
  description: string;
}

const ProductSchema:Schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: String, required: true },
    brand: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 }, 
    countInStock: { type: Number, required: true, default: 0 },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Product: Model<ProductProps> = models.Product || model('Product', ProductSchema);
export default Product;
