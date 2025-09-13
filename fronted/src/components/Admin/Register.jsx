import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole]         = useState('staff');
  const [error, setError]       = useState('');
  const [success, setSuccess]   = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/');

    try {
      const decoded = jwtDecode(token);
      if (decoded.role !== 'admin') navigate('/dashboard');
    } catch {
      navigate('/');
    }
  }, []);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const token = localStorage.getItem('token');
    if (!token) return setError('Missing admin token');

    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      await axios.post(`${API_URL}/api/auth/register`, { username, password, role }, config);
      setSuccess('User registered successfully');
      setUsername('');
      setPassword('');
    } catch (err) {
      console.error('[Register] Error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl mb-6 text-center">Register</h2>
        {error   && <div className="text-red-600 mb-4">{error}</div>}
        {success && <div className="text-green-600 mb-4">{success}</div>}

        <div className="mb-4">
          <label className="block mb-1">Username</label>
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} required className="w-full px-3 py-2 border rounded" />
        </div>

        <div className="mb-6">
          <label className="block mb-1">Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full px-3 py-2 border rounded" />
        </div>

        <div className="mb-6">
          <label className="block mb-1">Role</label>
          <select value={role} onChange={e => setRole(e.target.value)} className="w-full px-3 py-2 border rounded">
            <option value="staff">Staff</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}
