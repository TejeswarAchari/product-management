import React, { useState } from 'react';
import axios from 'axios';
import { ProductCategory } from '../constants/app.constants';
import styles from './AddProductForm.module.css';

interface AddProductFormProps {
  onProductAdded: () => void;
}

const AddProductForm: React.FC<AddProductFormProps> = ({ onProductAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: ProductCategory.ELECTRONICS
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api/products';
      await axios.post(url, formData);
      setMessage('Product added successfully!');
      setFormData({
        name: '', description: '', price: 0, stock: 0, category: ProductCategory.ELECTRONICS
      });
      onProductAdded();
      
      // Clear success message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error adding product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      
      {/* Decorative Header */}
      <div className={styles.header}>
        <div className={styles.iconWrapper}>+</div>
        <h3 className={styles.title}>Add New Product</h3>
      </div>

      <div className={styles.group}>
        <label className={styles.label}>Product Name</label>
        <input 
          name="name" 
          placeholder="Enter product name..." 
          value={formData.name} 
          onChange={handleChange} 
          required 
          className={styles.input} 
        />
      </div>

      <div className={styles.group}>
        <label className={styles.label}>Description</label>
        <textarea 
          name="description" 
          placeholder="Describe your product..." 
          value={formData.description} 
          onChange={handleChange} 
          required 
          className={styles.textarea} 
        />
      </div>

      <div className={styles.row}>
        <div className={styles.group}>
          <label className={styles.label}>Price ($)</label>
          <input 
            type="number" 
            name="price" 
            value={formData.price} 
            onChange={handleChange} 
            required 
            min="0" 
            className={styles.input} 
          />
        </div>

        <div className={styles.group}>
          <label className={styles.label}>Stock Quantity</label>
          <input 
            type="number" 
            name="stock" 
            value={formData.stock} 
            onChange={handleChange} 
            required 
            min="0" 
            className={styles.input} 
          />
        </div>
      </div>

      <div className={styles.group}>
        <label className={styles.label}>Category</label>
        <select 
          name="category" 
          value={formData.category} 
          onChange={handleChange}
          className={styles.select}
        >
          {Object.values(ProductCategory).map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <button type="submit" disabled={loading} className={styles.submitBtn}>
        {loading ? 'Adding Product...' : 'Add Product'}
      </button>

      {message && (
        <p className={styles.message} style={{ 
          background: message.includes('Error') ? '#ffebee' : '#e8f5e9',
          color: message.includes('Error') ? '#c62828' : '#2e7d32' 
        }}>
          {message}
        </p>
      )}
    </form>
  );
};

export default AddProductForm;