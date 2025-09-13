import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function SearchResult() {
  const [params] = useSearchParams();
  const query = params.get('query');
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const token = localStorage.getItem('token');

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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">{product.name}</h2>
      <p><strong>Code:</strong> {product.productCode}</p>
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Price:</strong> ${product.price}</p>
      <p><strong>Quantity:</strong> {product.quantity}</p>
      <p><strong>Description:</strong> {product.description}</p>
    </div>
  );
}
