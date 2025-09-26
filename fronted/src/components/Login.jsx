import { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    try {
      const { data } = await axios.post(`${API_URL}/api/auth/login`, { username, password });
      const token = data.token;

      // Store token and set default header
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Decode token
      const decoded = jwtDecode(token);
      const { role, passwordInitialized } = decoded;

      // Redirect based on password status
      if (!passwordInitialized) {
        navigate('/setpassword');
      } else {
        if (role === 'admin') {
          navigate('/');
        } else if (role === 'manager') {
          navigate('/');
        } else {
          navigate('/');
        }
      }

    } catch (err) {
      console.error('[Login] Error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl mb-6 text-center">Login</h2>
        {error && <div className="text-red-600 mb-4">{error}</div>}

        <div className="mb-4">
          <label className="block mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded">
          Log In
        </button>
      </form>
    </div>
  );
}
