// client/src/App.jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login    from './components/Login';
import Register from './components/Admin/Register';
import AdminDashboard from './components/Admin/AdminDashboard';
import MangerDashboard from './components/MangerDashboard';
import StaffDashboard from './components/StaffDashboard';
import CreateOrder from './components/Admin/CreateOrder';
import CheckStock from './components/Admin/CheckStock';
import InventorySearch from './components/InventorySearch';
import UpdateStock from './components/Admin/UpdateStock';
import CheckUser from './components/Admin/CheckUser';
import SetPassword from './components/SetPassword';
import MyProfile from './components/MyProfile';
import Layout from './components/Layout';
import Dashboard from './components/Admin/AdminDashboard';
import MainPage from './components/MainPage';
import CreateStock from './components/Admin/CreateStock';

function App() {
  return (
    <BrowserRouter>
      <Layout>
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="/" element={<MainPage />} />
        <Route path='/login' element={<Login />} />
        <Route path="/registeruser" element={<Register />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path='/mangerdashboard' element={<MangerDashboard />} />
        <Route path='/staffdashboard' element={<StaffDashboard />} />
        <Route path='/inventorysearch' element={<InventorySearch />} />
        <Route path='/createorder' element={<CreateOrder />} />
        <Route path='/checkstock' element={<CheckStock />} />
        <Route path='/createstock' element={<CreateStock />} />
        <Route path='/updatestock' element={<UpdateStock />} />
        <Route path='/checkuser' element={<CheckUser />} />
        <Route path='/setpassword' element={<SetPassword />} />
        <Route path='/myprofile' element={<MyProfile />} />
      </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

