import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Import toast CSS

import Login from './components/Login';
import Signup from './components/Signup';
import UserLayout from './layouts/UserLayout';
import PrivateRoute from './components/PrivateRoute';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AddAdmin from './pages/admin/AddAdmin';

// Client Pages
import ClientDashboard from './pages/client/ClientDashboard';
import ClientProducts from './pages/client/ClientProducts';
import FavoritesPage from './pages/client/FavoritesPage';

// Farmer Pages
import FarmerDashboard from './pages/farmer/FarmerDashboard';
import AddProduct from './pages/farmer/AddProduct';
import MyProducts from './pages/farmer/MyProduct';
import EditProduct from './pages/farmer/EditProduct';

// Visitor Pages
import About from './pages/About';
import ProductDetail from './pages/client/ProductDetail';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

const App = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />      
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Default User Pages */}
        <Route path="/about" element={<UserLayout><About /></UserLayout>} />

        {/* Role-Based Dashboards */}
        {/* Admin Routes */}
        <Route 
          path="/admin/dashboard" 
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <UserLayout><AdminDashboard /></UserLayout>
            </PrivateRoute>
          }
        />
        <Route 
          path="/admin/users" 
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <UserLayout><AdminUsers /></UserLayout>
            </PrivateRoute>
          }
        />
        <Route 
          path="/admin/add-admin" 
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <UserLayout><AddAdmin /></UserLayout>
            </PrivateRoute>
          }
        />

        {/* Client Routes */}
        <Route 
          path="/" 
          element={<UserLayout><ClientDashboard /></UserLayout>}
        />
        <Route 
          path="/client/dashboard" 
          element={<UserLayout><ClientDashboard /></UserLayout>} 
        />
        <Route 
          path="/client/products" 
          element={<UserLayout><ClientProducts /></UserLayout>} 
        />
        <Route 
          path="/client/products/:id" 
          element={<UserLayout><ProductDetail /></UserLayout>} 
        />
        <Route 
          path="/favorites" 
          element={<UserLayout><FavoritesPage /></UserLayout>} 
        />
        {/* Farmer Routes */}
        <Route 
          path="/farmer/dashboard" 
          element={
            <PrivateRoute allowedRoles={['farmer']}>
              <UserLayout><FarmerDashboard /></UserLayout>
            </PrivateRoute>
          }
        />
        <Route 
          path="/farmer/add-product" 
          element={
            <PrivateRoute allowedRoles={['farmer']}>
              <UserLayout><AddProduct /></UserLayout>
            </PrivateRoute>
          }
        />
        <Route 
          path="/farmer/my-products" 
          element={
            <PrivateRoute allowedRoles={['farmer']}>
              <UserLayout><MyProducts /></UserLayout>
            </PrivateRoute>
          }
        />
        <Route 
          path="/farmer/edit-product/:id" 
          element={
            <PrivateRoute allowedRoles={['farmer']}>
              <UserLayout><EditProduct /></UserLayout>
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
