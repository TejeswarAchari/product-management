import Link from 'next/link';
import styles from '../styles/NotFound.module.css';

export default function NotFoundPage() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <p className={styles.kicker}>404</p>
        <h1 className={styles.title}>Page not found</h1>
        <p className={styles.subtitle}>
          The page you are looking for does not exist or has been moved.
        </p>
        <Link className={styles.button} href="/">
          Back to products
        </Link>
      </div>
    </div>
  );
}
