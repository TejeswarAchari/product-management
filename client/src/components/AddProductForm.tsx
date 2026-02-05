import React, { useState } from 'react';
import { ProductCategory } from '../constants/app.constants';
import { createProduct } from '../services/product.service';
import { IProductCreatePayload } from '../types/product.types';
import styles from './AddProductForm.module.css';

interface AddProductFormProps {
  onProductAdded: () => void;
}

const AddProductForm: React.FC<AddProductFormProps> = ({ onProductAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: ProductCategory.ELECTRONICS
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setIsError(false);

    try {
      const payload: IProductCreatePayload = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: Number(formData.price),
        stock: Number(formData.stock),
        category: formData.category
      };

      await createProduct(payload);
      setMessage('Product added successfully!');
      setFormData({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: ProductCategory.ELECTRONICS
      });
      onProductAdded();
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setMessage('');
        setIsError(false);
      }, 3000);
    } catch (error) {
      setIsError(true);
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
            step="0.01"
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
        <p className={`${styles.message} ${isError ? styles.messageError : styles.messageSuccess}`}>
          {message}
        </p>
      )}
    </form>
  );
};

export default AddProductForm;