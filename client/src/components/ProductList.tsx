import React from 'react';
import { IProduct } from '../types/product.types';
import ProductCard from './ProductCard';
import styles from './ProductList.module.css';

interface ProductListProps {
  products: IProduct[];
  hasMore: boolean;
  loading: boolean;
  loadMore: () => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, hasMore, loading, loadMore }) => {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {/* Pagination Trigger */}
      <div className={styles.loadMoreContainer}>
        {hasMore ? (
          <button 
            onClick={loadMore} 
            disabled={loading}
            className={styles.loadMoreBtn}
          >
            {loading ? 'Loading...' : 'Load More Products'}
          </button>
        ) : (
          <p className={styles.endMessage}>You have reached the end of the list.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;