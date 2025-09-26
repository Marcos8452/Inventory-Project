import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function SearchResult() {
  const [params] = useSearchParams();
  const query = params.get('query');
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const { data } = await axios.get(`${API_URL}/api/products/search`, {
          params: { query },
          ...config
        });
        setProduct(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Product not found');
      }
    };

    if (query) fetchProduct();
  }, [query]);

  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!product) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-100 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-blue-800">Inventory Detail - {product.name}</h2>

      <div className="grid grid-cols-2 gap-6 bg-white p-6 rounded shadow">
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Product Info</h3>
          <p><strong>Product Code:</strong> {product.productCode}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Description:</strong> {product.description || 'N/A'}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Stock & Pricing</h3>
          <p><strong>Price:</strong> ${product.price}</p>
          <p><strong>Quantity Available:</strong> {product.quantity}</p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Actions</h3>
        <div className="flex space-x-4">
          <button className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-700">Create Shipment</button>
          <button className="bg-gray-600 cursor-pointer text-white px-4 py-2 rounded hover:bg-gray-700">Print Tag</button>
          <button
            className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded"
            onClick={() => navigate('/updatestock', { state: { product } })}
          >
            Update Stock
          </button>
        </div>
      </div>

      {product.history?.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Update History</h3>
          <div className="bg-white p-4 rounded shadow">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2">Date</th>
                  <th>User</th>
                  <th>Role</th>
                  <th>Action</th>
                  <th>Price</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {product.history.map((entry, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="py-2">{new Date(entry.timestamp).toLocaleString()}</td>
                    <td>{entry.updatedBy}</td>
                    <td>{entry.role}</td>
                    <td>{entry.action}</td>
                    <td>
                      {entry.changes.price
                        ? `$${entry.changes.price.from} → $${entry.changes.price.to}`
                        : '—'}
                    </td>
                    <td>
                      {entry.changes.quantity
                        ? `${entry.changes.quantity.from} → ${entry.changes.quantity.to}`
                        : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
