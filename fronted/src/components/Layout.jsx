import { useLocation } from 'react-router-dom';
import Dashboard from './Dashboard'; // your navbar component

export default function Layout({ children }) {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login';

  return (
    <>
      {!hideNavbar && <Dashboard />}
      <main>{children}</main>
    </>
  );
}
