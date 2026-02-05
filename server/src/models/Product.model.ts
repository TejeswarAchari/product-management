import mongoose, { Schema, Document } from 'mongoose';
import { IProduct } from '../types/product.types';
import { ProductCategory } from '../constants/app.constants';

export interface IProductDocument extends Omit<IProduct, '_id'>, Document {
  _id: mongoose.Types.ObjectId;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true, index: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  category: { 
    type: String, 
    enum: Object.values(ProductCategory), 
    required: true,
    index: true 
  },
  stock: { type: Number, required: true, min: 0, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const ProductModel = mongoose.model<IProductDocument>('Product', ProductSchema);

export default ProductModel;