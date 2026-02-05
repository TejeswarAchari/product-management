import React, { useRef, useCallback } from 'react';
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
  // Intersection Observer to detect scroll to bottom
  const observer = useRef<IntersectionObserver | null>(null);
  
  const lastElementRef = useCallback((node: HTMLDivElement) => {
    if (loading) return; // Don't observe if already loading
    
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      // If the skeleton/bottom is visible AND we have more data...
      if (entries[0].isIntersecting && hasMore) {
        loadMore();
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore, loadMore]);

  // Helper to render Skeletons
  const renderSkeletons = () => {
    // Render 6 skeleton cards
    return Array(6).fill(0).map((_, index) => (
      <div key={`skeleton-${index}`} className={styles.skeletonCard}>
        <div>
          <div className={`${styles.shimmerLine} ${styles.shimmerTitle}`}></div>
          <div className={`${styles.shimmerLine} ${styles.shimmerBadge}`}></div>
          <div className={`${styles.shimmerLine} ${styles.shimmerDesc}`}></div>
          <div className={`${styles.shimmerLine} ${styles.shimmerDesc}`} style={{ width: '80%' }}></div>
        </div>
        <div className={`${styles.shimmerLine} ${styles.shimmerPrice}`}></div>
      </div>
    ));
  };

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {/* Render Actual Products */}
        {products.map((product, index) => {
          if (products.length === index + 1) {
            // Attach observer to the very last product
            return (
              <div ref={lastElementRef} key={product._id}>
                <ProductCard product={product} />
              </div>
            );
          } else {
            return <ProductCard key={product._id} product={product} />;
          }
        })}

        {/* Render Shimmer Skeletons when loading */}
        {loading && renderSkeletons()}
      </div>

      {/* End Message */}
      {!hasMore && !loading && products.length > 0 && (
        <div className={styles.endMessage}>
          ✨ You have reached the end of the list
        </div>
      )}
      
      {/* Empty State */}
      {!loading && products.length === 0 && (
        <div className={styles.endMessage}>
          No products found. Try changing your search or filter.
        </div>
      )}
    </div>
  );
};

export default ProductList;