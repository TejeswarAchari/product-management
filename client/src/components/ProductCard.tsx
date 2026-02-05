import React from 'react';
import { IProduct } from '../types/product.types';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{product.name}</h3>
      <div className={styles.meta}>
        <span className={styles.badge}>{product.category}</span>
        <span className={styles.date}>{new Date(product.createdAt).toLocaleDateString()}</span>
      </div>
      <p className={styles.description}>{product.description}</p>
      <div className={styles.footer}>
        <span className={styles.price}>${product.price}</span>
        <span className={styles.stock}>
          {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
        </span>
      </div>
    </div>
  );
};

export default ProductCard;