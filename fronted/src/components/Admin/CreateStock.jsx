import { useState } from 'react';
import axios from 'axios';

export default function CreateProduct() {
  const [name, setName]             = useState('');
  const [description, setDesc]      = useState('');
  const [price, setPrice]           = useState('');
  const [quantity, setQuantity]     = useState('');
  const [category, setCategory]     = useState('');
  const [success, setSuccess]       = useState('');
  const [error, setError]           = useState('');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const token = localStorage.getItem('token');

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      const body = { name, description, price, quantity, category };
      await axios.post(`${API_URL}/api/products/create`, body, config);

      setSuccess('Product created successfully!');
      setName('');
      setDesc('');
      setPrice('');
      setQuantity('');
      setCategory('');
    } catch (err) {
      console.error('[CreateProduct] Error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Failed to create product');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Create New Product</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      {success && <div className="text-green-600 mb-2">{success}</div>}

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required className="w-full mb-3 px-3 py-2 border rounded" />
        <textarea placeholder="Description" value={description} onChange={e => setDesc(e.target.value)} className="w-full mb-3 px-3 py-2 border rounded" />
        <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} required className="w-full mb-3 px-3 py-2 border rounded" />
        <input type="number" placeholder="Quantity" value={quantity} onChange={e => setQuantity(e.target.value)} required className="w-full mb-3 px-3 py-2 border rounded" />
        <input type="text" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} className="w-full mb-4 px-3 py-2 border rounded" />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Add Product</button>
      </form>
    </div>
  );
}

