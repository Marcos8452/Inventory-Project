import React from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default function MainPage() {
  const token = localStorage.getItem('token');
  let role = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      role = decoded.role;
    } catch (err) {
      console.error('Invalid token:', err);
    }
  }

  const menuItems = {
    admin: [
      { label: 'Inventory Search', path: '/inventorysearch' },
      { label: 'Create Order', path: '/createorder' },
      { label: 'Update Stock', path: '/updatestock' },
      { label: 'Create Stock', path: '/createstock' },
      { label: 'Check User', path: '/checkuser' },
      { label: 'Register User', path: '/registeruser' },
      { label: 'My User', path: '/myprofile' }
    ],
    manager: [
      { label: 'Inventory Search', path: '/inventorysearch' },
      { label: 'Create Order', path: '/createorder' },
      { label: 'Update Stock', path: '/updatestock' },
      { label: 'My User', path: '/myprofile' }
    ],
    staff: [
      { label: 'Inventory Search', path: '/inventorysearch' },
      { label: 'My User', path: '/myprofile' }
    ]
  };

  const tabs = menuItems[role] || [];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-3 mb-6">
        {tabs.map((tab, idx) => (
          <Link
            key={idx}
            to={tab.path}
            className="bg-white px-4 py-2 rounded shadow hover:bg-blue-100 text-sm font-medium border border-gray-300"
          >
            {tab.label}
          </Link>
        ))}
      </div>

      {/* Search Criteria Section */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Search Inventory</h2>
        <form className="grid grid-cols-2 gap-4">
          <input type="text" placeholder="Product Code" className="border px-3 py-2 rounded" />
          <input type="text" placeholder="Product Name" className="border px-3 py-2 rounded" />
          <input type="text" placeholder="Category (e.g. food, electronics)" className="border px-3 py-2 rounded" />
          <input type="number" placeholder="Minimum Quantity" className="border px-3 py-2 rounded" />
          <input type="number" placeholder="Maximum Price" className="border px-3 py-2 rounded" />
          <input type="text" placeholder="Updated By (username)" className="border px-3 py-2 rounded" />
          <div className="flex gap-2">
            <label className="text-sm text-gray-600">Updated After:</label>
            <input type="datetime-local" className="border px-2 py-1 rounded" />
          </div>
          <div className="flex gap-2">
            <label className="text-sm text-gray-600">Updated Before:</label>
            <input type="datetime-local" className="border px-2 py-1 rounded" />
          </div>
          <div className="col-span-2 flex justify-between items-center mt-4">
            <select className="border px-3 py-2 rounded">
              <option>Maximum Rows: 100</option>
              <option>50</option>
              <option>200</option>
            </select>
            <div className="flex gap-3">
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Search
              </button>
              <button type="reset" className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400">
                Clear All
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Action Button */}
      {role === 'admin' || role === 'manager' ? (
        <div className="text-right">
          <Link to="/createticket">
            <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
              Issue Inventory
            </button>
          </Link>
        </div>
      ) : null}
    </div>
  );
}
