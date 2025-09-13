import { useState } from 'react';
import axios from 'axios';

export default function InventorySearch() {
  const [query, setQuery] = useState('');
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const token = localStorage.getItem('token');

  const handleSearch = async e => {
    e.preventDefault();
    setError('');
    setProduct(null);

    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const { data } = await axios.get(`${API_URL}/api/products/search`, {
        params: { query },
        ...config
      });
      setProduct(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Search failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Search Product</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter Product Code or Name"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full mb-4 px-3 py-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          Search
        </button>
      </form>

      {error && <div className="text-red-600 mt-4">{error}</div>}
      {product && (
        <div className="mt-6 border p-4 rounded bg-gray-50">
          <h3 className="font-bold text-lg mb-2">{product.name}</h3>
          <p><strong>Code:</strong> {product.productCode}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Price:</strong> ${product.price}</p>
          <p><strong>Quantity:</strong> {product.quantity}</p>
          <p><strong>Description:</strong> {product.description}</p>
        </div>
      )}
    </div>
  );
}
