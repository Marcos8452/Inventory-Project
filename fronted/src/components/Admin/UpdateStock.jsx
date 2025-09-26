import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export default function UpdateStock() {
  const location = useLocation();
  const passedProduct = location.state?.product;

  const [code, setCode] = useState(passedProduct?.productCode || '');
  const [product, setProduct] = useState(passedProduct || null);
  const [price, setPrice] = useState(passedProduct?.price || '');
  const [quantity, setQuantity] = useState(passedProduct?.quantity || '');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const handleSearch = async e => {
    e.preventDefault();
    setError('');
    setMessage('');
    setProduct(null);

    try {
      const { data } = await axios.get(`${API_URL}/api/products/search`, {
        params: { query: code }
      });
      setProduct(data);
      setPrice(data.price);
      setQuantity(data.quantity);
    } catch (err) {
      setError(err.response?.data?.message || 'Product not found');
    }
  };

  const handleUpdate = async e => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const { data } = await axios.put(`${API_URL}/api/products/update/${code}`, {
        price,
        quantity
      });
      setMessage('Product updated successfully!');
      setProduct(data.product);
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Update Product Stock</h2>

      {!product && (
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Enter Product Code"
            value={code}
            onChange={e => setCode(e.target.value)}
            className="w-full mb-4 px-3 py-2 border rounded"
            required
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
            Search Product
          </button>
        </form>
      )}

      {error && <div className="text-red-600 mt-4">{error}</div>}
      {message && <div className="text-green-600 mt-4">{message}</div>}

      {product && (
        <form onSubmit={handleUpdate} className="mt-6">
          <div className="mb-3">
            <label className="block mb-1">Price</label>
            <input
              type="number"
              value={price}
              onChange={e => setPrice(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">
            Update Product
          </button>
        </form>
      )}
    </div>
  );
}

