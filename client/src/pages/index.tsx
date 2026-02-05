import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { fetchProducts } from '../services/product.service';
import { IPaginatedResponse } from '../types/product.types';
import { ProductCategory } from '../constants/app.constants';
import ProductList from '../components/ProductList';
import AddProductForm from '../components/AddProductForm';
import { useInfiniteProducts } from '../hooks/useInfiniteProducts';
import styles from '../styles/Home.module.css';

interface HomeProps {
  initialData: IPaginatedResponse;
  initialCategory: string | null;
  initialSearch: string | null;
}

const Home: NextPage<HomeProps> = ({ initialData, initialCategory, initialSearch }) => {
  const [categoryFilter, setCategoryFilter] = useState<string>(initialCategory || '');
  const [searchInput, setSearchInput] = useState<string>(initialSearch || '');
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch || '');
  const router = useRouter();

  // Use our custom hook
  const { 
    products, 
    loading, 
    error,
    hasMore, 
    loadMore,
    refresh,
    stats
  } = useInfiniteProducts(categoryFilter, searchQuery, initialData);

  const trimmedSearch = useMemo(() => searchInput.trim(), [searchInput]);
  const { inStockCount, outOfStockCount } = useMemo(() => {
    if (stats) {
      return {
        inStockCount: stats.inStock,
        outOfStockCount: stats.outOfStock
      };
    }

    const inStock = products.filter((product) => product.stock > 0).length;
    return {
      inStockCount: inStock,
      outOfStockCount: Math.max(products.length - inStock, 0)
    };
  }, [products, stats]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(trimmedSearch);
    }, 350);

    return () => clearTimeout(timer);
  }, [trimmedSearch]);

  useEffect(() => {
    const query: Record<string, string> = {};
    if (categoryFilter) query.category = categoryFilter;
    if (searchQuery) query.q = searchQuery;

    void router.replace({ pathname: '/', query }, undefined, { shallow: true });
  }, [categoryFilter, searchQuery, router]);

  // Handle Filter Change
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setCategoryFilter(value);
  };

  // Handle Search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(trimmedSearch);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Product Management</title>
      </Head>

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroTop}>
            <div className={styles.heroText}>
              <p className={styles.pill}>Inventory Dashboard</p>
              <h1 className={styles.title}>
                Product Management <span>System</span>
              </h1>
              <p className={styles.subtitle}>
                Confidently manage your catalog with fast search, stable pagination,
                and clear inventory visibility.
              </p>
            </div>
            <div className={styles.heroMedia}>
              <div className={styles.heroPortrait}>
                <div className={styles.heroGlow} />
                <div className={styles.heroCard}>
                  <div className={styles.cardHeader}>
                    <span>Overview</span>
                    <span className={styles.cardBadge}>Live</span>
                  </div>
                  <div className={styles.cardBody}>
                    <div className={styles.cardStat}>
                      <p>In stock</p>
                      <strong>{inStockCount}</strong>
                    </div>
                    <div className={styles.cardStat}>
                      <p>Out of stock</p>
                      <strong>{outOfStockCount}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.statsStrip}>
            <div className={styles.statItem}>
              <span>Total products</span>
              <strong>{stats?.total ?? products.length}</strong>
            </div>
            <div className={styles.statItem}>
              <span>In stock</span>
              <strong>{inStockCount}</strong>
            </div>
            <div className={styles.statItem}>
              <span>Out of stock</span>
              <strong>{outOfStockCount}</strong>
            </div>
            <div className={styles.statItem}>
              <span>Categories</span>
              <strong>{Object.values(ProductCategory).length}</strong>
            </div>
          </div>
        </section>

        {/* Add Product Section */}
        <section className={styles.section}>
          <AddProductForm onProductAdded={refresh} />
        </section>

        {/* Controls Section */}
        <section className={styles.controls}>
          <form onSubmit={handleSearch} className={styles.searchBox}>
            <label className={styles.controlLabel}>Search Products</label>
            <div className={styles.controlRow}>
              <input 
                type="text" 
                placeholder="Search by product name..." 
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className={styles.input}
              />
              <button type="submit" className={styles.btn}>Search</button>
            </div>
            <p className={styles.hint}>Search updates as you type.</p>
          </form>

          <div className={styles.filterBox}>
            <label className={styles.controlLabel}>Filter by Category</label>
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
            <p className={styles.hint}>Curate the list with a single tap.</p>
          </div>

          <div className={styles.actionBox}>
            <label className={styles.controlLabel}>Quick Actions</label>
            <div className={styles.actionRow}>
              <button className={styles.primaryBtn} onClick={() => refresh()} type="button">
                Refresh Listing
              </button>
              <button
                className={styles.ghostBtn}
                type="button"
                onClick={() => {
                  setCategoryFilter('');
                  setSearchInput('');
                  setSearchQuery('');
                }}
              >
                Clear Filters
              </button>
            </div>
            <p className={styles.hint}>Reset the list or force a fresh fetch.</p>
          </div>
        </section>

        {error && <div className={styles.errorBanner}>{error}</div>}

        {/* Product List Section */}
        <div className={styles.listCount}>
          Showing {products.length} product{products.length === 1 ? '' : 's'}
        </div>
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
    const category = (context.query.category as string) || '';
    const search = (context.query.q as string) || '';
    
    // Fetch initial data on the server
    const initialData = await fetchProducts(null, 10, category, search);

    return {
      props: {
        initialData,
        initialCategory: category || null,
        initialSearch: search || null
      }
    };
  } catch (error) {
    console.error('SSR Error:', error);
    return {
      props: {
        initialData: {
          data: [],
          pagination: { nextCursor: null, hasMore: false }
        },
        initialCategory: null,
        initialSearch: null
      }
    };
  }
};

export default Home;