import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function InventorySearch() {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const token = localStorage.getItem('token');

  const handleSearch = async e => {
    e.preventDefault();
    setError('');

    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      // Optional: validate product exists before redirecting
      await axios.get(`${API_URL}/api/products/search`, {
        params: { query },
        ...config
      });

      navigate(`/searchbycode?query=${encodeURIComponent(query.trim())}`);
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
    </div>
  );
}

