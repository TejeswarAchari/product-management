import React, { useState } from 'react';
import axios from 'axios';
import { ProductCategory } from '../constants/app.constants';
import styles from './AddProductForm.module.css';

interface AddProductFormProps {
  onProductAdded: () => void; // Callback to refresh list
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
      onProductAdded(); // Trigger refresh in parent
    } catch (error) {
      setMessage('Error adding product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3>Add New Product</h3>
      <div className={styles.group}>
        <input name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} required />
      </div>
      <div className={styles.group}>
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
      </div>
      <div className={styles.row}>
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required min="0" />
        <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} required min="0" />
      </div>
      <div className={styles.group}>
        <select name="category" value={formData.category} onChange={handleChange}>
          {Object.values(ProductCategory).map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <button type="submit" disabled={loading} className={styles.submitBtn}>
        {loading ? 'Adding...' : 'Add Product'}
      </button>
      {message && <p className={styles.message}>{message}</p>}
    </form>
  );
};

export default AddProductForm;