import React from 'react';
import { IProduct } from '../types/product.types';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Deterministic date formatting
  const formattedDate = new Date(product.createdAt).toISOString().split('T')[0];
  const isAvailable = product.stock > 0;
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(product.price);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{product.name}</h3>
        {/* We use data-attribute to style specific categories differently in CSS */}
        <span className={styles.badge} data-category={product.category}>
          {product.category}
        </span>
      </div>
      
      <span className={styles.date}>Added: {formattedDate}</span>
      
      <p className={styles.description}>{product.description}</p>
      
      <div className={styles.footer}>
        <span className={styles.price}>{formattedPrice}</span>
        
        <span className={`${styles.stock} ${isAvailable ? styles.inStock : styles.outStock}`}>
          <span className={styles.dot}></span>
          {isAvailable ? `${product.stock} in stock` : 'Out of Stock'}
        </span>
      </div>
    </div>
  );
};

export default ProductCard;