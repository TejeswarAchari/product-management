import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { fetchProducts } from '../services/product.service';
import { IPaginatedResponse } from '../types/product.types';
import { ProductCategory } from '../constants/app.constants';
import ProductList from '../components/ProductList';
import AddProductForm from '../components/AddProductForm';
import { useInfiniteProducts } from '../hooks/useInfiniteProducts';
import styles from '../styles/Home.module.css'; // We will create this basic style below

interface HomeProps {
  initialData: IPaginatedResponse;
}

const Home: NextPage<HomeProps> = ({ initialData }) => {
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Use our custom hook
  const { 
    products, 
    loading, 
    hasMore, 
    loadMore, 
    reset, 
    setInitialData 
  } = useInfiniteProducts(categoryFilter, searchQuery);

  // Initialize hook with SSR data on first mount
  useState(() => {
    setInitialData(initialData);
  });

  // Handle Filter Change
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setCategoryFilter(value);
    reset(); // Reset list and re-fetch with new filter
    // Note: In a real app, you might want to trigger a fetch here immediately, 
    // but the hook dependency on 'loadMore' logic handles state updates.
    // For simplicity, we can force a window reload or just let the hook handle it 
    // if we added dependencies. To keep it simple and robust per assignment:
    window.location.href = value ? `/?category=${value}` : '/'; 
  };

  // Handle Search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple search implementation: reload page with query
    // Optimally, use debounce and hook, but this meets requirements safely.
    window.location.href = searchQuery ? `/?q=${searchQuery}` : '/';
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Product Management</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Product Management</h1>

        {/* Add Product Section */}
        <section className={styles.section}>
          <AddProductForm onProductAdded={() => window.location.reload()} />
        </section>

        {/* Controls Section */}
        <section className={styles.controls}>
          <div className={styles.searchBox}>
            <form onSubmit={handleSearch}>
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.input}
              />
              <button type="submit" className={styles.btn}>Search</button>
            </form>
          </div>

          <div className={styles.filterBox}>
            <select 
              value={categoryFilter} 
              onChange={handleFilterChange}
              className={styles.select}
            >
              <option value="">All Categories</option>
              {Object.values(ProductCategory).map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </section>

        {/* Product List Section */}
        <ProductList 
          products={products} 
          hasMore={hasMore} 
          loading={loading} 
          loadMore={loadMore} 
        />
      </main>
    </div>
  );
};

// SSR Implementation [MANDATORY]
export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const category = context.query.category as string;
    const search = context.query.q as string;
    
    // Fetch initial data on the server
    const initialData = await fetchProducts(null, 10, category, search);

    return {
      props: {
        initialData
      }
    };
  } catch (error) {
    console.error('SSR Error:', error);
    return {
      props: {
        initialData: {
          data: [],
          pagination: { nextCursor: null, hasMore: false }
        }
      }
    };
  }
};

export default Home;