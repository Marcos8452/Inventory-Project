import { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export default function CreateProduct() {
  const [name, setName] = useState('');
  const [description, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');
  const [productCode, setProductCode] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const token = localStorage.getItem('token');

  // Auto-fill category based on role
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const role = decoded.role;
        if (role === 'staff') setCategory('accessories, electronics, food');
      } catch (err) {
        console.error('Token decode error:', err);
      }
    }
  }, [token]);

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setProductCode('');
    setCopied(false);

    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      const body = { name, description, price, quantity, category };
      const { data } = await axios.post(`${API_URL}/api/products/create`, body, config);

      setProductCode(data.product.productCode);
      setSuccess('Product created successfully!');
      setName('');
      setDesc('');
      setPrice('');
      setQuantity('');
    } catch (err) {
      console.error('[CreateProduct] Error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Failed to create product');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(productCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Create New Product</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      {success && (
        <div className="text-green-600 mb-2">
          {success}
          {productCode && (
            <div className="mt-2 flex items-center space-x-2">
              <span className="font-mono bg-gray-100 px-2 py-1 rounded">{productCode}</span>
              <button
                onClick={handleCopy}
                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          className="w-full mb-3 px-3 py-2 border rounded"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={e => setDesc(e.target.value)}
          className="w-full mb-3 px-3 py-2 border rounded"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={e => setPrice(e.target.value)}
          required
          className="w-full mb-3 px-3 py-2 border rounded"
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
          required
          className="w-full mb-3 px-3 py-2 border rounded"
        />

        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          required
          className="w-full mb-4 px-3 py-2 border rounded"
        >
          <option value="">Select Category</option>
          <option value="food">Food</option>
          <option value="clothes">Clothes</option>
          <option value="accessories">Accessories</option>
          <option value="electronics">Electronics</option>
        </select>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          Add Product
        </button>
      </form>
    </div>
  );
}
