import React, { useState } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = e => {
  e.preventDefault();
  if (searchQuery.trim()) {
    navigate(`/searchbycode?query=${encodeURIComponent(searchQuery.trim())}`);
    setSearchQuery('');
  }
};

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear JWT
    navigate("/login"); // Redirect to login
  };

  const token = localStorage.getItem("token");
  let role = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      role = decoded.role;
    } catch (err) {
      console.error("Invalid token:", err);
    }
  }

  const menuItems = {
    admin: [
      { label: "Inventory Search", path: "/inventorysearch" },
      { label: "Create Order", path: "/createorder" },
      { label: "Check Stock", path: "/checkstock" },
      { label: "Update Stock", path: "/updatestock" },
      { label: "Create Stock", path: "/createstock" },
      { label: "Check User", path: "/checkuser" },
      { label: "Register User", path: "/registeruser" },
      { label: "My User", path: "/myprofile" },
    ],
    manager: [
      { label: "Inventory Search", path: "/inventorysearch" },
      { label: "Create Order", path: "/createorder" },
      { label: "Check Stock", path: "/checkstock" },
      { label: "Update Stock", path: "/updatestock" },
      { label: "My User", path: "/myprofile" },
    ],
    staff: [
      { label: "Inventory Search", path: "/inventorysearch" },
      { label: "My User", path: "/myprofile" },
    ],
  };

  return (
    <>
    <nav className="bg-blue-500 text-white px-6 py-4 shadow">
      <div className="flex justify-between items-center">
        {/* Left: Logo + Menu */}
        <ul className="flex items-center space-x-6">
          <Link to={"/"} className="font-bold text-lg">
            InventoryApp
          </Link>
          <li
            className="relative inline-block cursor-pointer"
            onMouseEnter={() => setMenuOpen(true)}
            onMouseLeave={() => setMenuOpen(false)}
          >
            <button className="px-2 py-1 hover:bg-blue-700 rounded cursor-pointer">
              Menu ▾
            </button>
            {menuOpen && (
              <ul className="absolute top-7 left-0 bg-white text-black mt-1 rounded shadow-lg w-48 z-10">
                {menuItems[role]?.map((item) => (
                  <li key={item.path} className="px-4 py-2 hover:bg-gray-100">
                    <Link to={item.path}>{item.label}</Link>
                  </li>
                ))}
                <li className="px-4 py-2 hover:bg-gray-100">
                  <button onClick={handleLogout} className="w-full text-left">
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </li>
        </ul>

        {/* Right: Search bar */}
        <form onSubmit={handleSearch} className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search by Code or Name"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="px-3 py-1 rounded border border-gray-300 text-black"
          />
        </form>
        </div>
    </nav>
    </>
  );
}
