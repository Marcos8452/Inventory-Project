import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminUserPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get('/api/admin/users');
        setUsers(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load users');
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async id => {
    try {
      await axios.delete(`/api/admin/users/${id}`);
      setUsers(prev => prev.filter(user => user._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Username</th>
            <th className="p-2">Role</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id} className="border-t">
              <td className="p-2">{user.username}</td>
              <td className="p-2 capitalize">{user.role}</td>
              <td className="p-2">
                <button
                  onClick={() => handleDelete(user._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
