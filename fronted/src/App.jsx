// client/src/App.jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login    from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <BrowserRouter>
      <nav className="p-4 bg-gray-100">
        <Link to="/" className="mr-4 text-indigo-600">Login</Link>
        <Link to="/register" className="text-indigo-600">Register</Link>
      </nav>

      <Routes>
        <Route path="/"        element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

