import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import Signup from './components/Signup';
import UserLayout from './layouts/UserLayout';
import PrivateRoute from './components/PrivateRoute';
// Dashboards


//Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AddAdmin from './pages/admin/AddAdmin';

//Client Pages
import ClientDashboard from './pages/client/ClientDashboard';
import ClientProducts from './pages/client/ClientProducts';



//Farmer Pages
import FarmerDashboard from './pages/farmer/FarmerDashboard';
import AddProduct from './pages/farmer/AddProduct';
import MyProducts from './pages/farmer/MyProduct';
import EditProduct from './pages/farmer/EditProduct';



//Visitor Pages


import VisitorProducts from './pages/visitor/VisitorProducts';
import VisitorHome from './pages/visitor/VisitorHome';
import About from './pages/About';


const App = () => {
  return (
    <Routes>
      {/* Public Routes */}

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Default User Pages */}

      <Route path="/" element={<UserLayout><VisitorHome /></UserLayout>}/>
      <Route path="/products" element={<UserLayout><VisitorProducts /></UserLayout>}/>
      <Route path="/about" element={<UserLayout><About /></UserLayout>} />

      {/* Role-Based Dashboards */}

      {/* Admin */}

      <Route path="/admin/dashboard" element={<PrivateRoute allowedRoles={['admin']}><UserLayout><AdminDashboard /></UserLayout></PrivateRoute>}/>
      <Route path="/admin/users" element={<PrivateRoute  allowedRoles={['admin']}><UserLayout><AdminUsers /></UserLayout></PrivateRoute>} />
      <Route path="/admin/add-admin" element={<PrivateRoute  allowedRoles={['admin']}><UserLayout><AddAdmin /></UserLayout></PrivateRoute>} />
 
      {/* Client */}
 
      <Route path="/client/dashboard" element={<PrivateRoute allowedRoles={['client']}><UserLayout><ClientDashboard /></UserLayout></PrivateRoute>}/>
      <Route path="/client/products" element={<PrivateRoute allowedRoles={['client']}><UserLayout><ClientProducts /></UserLayout></PrivateRoute>} />


        {/* Farmer */}

      <Route path="/farmer/dashboard" element={<PrivateRoute allowedRoles={['farmer']}><UserLayout><FarmerDashboard /></UserLayout></PrivateRoute>}/>
      <Route path="/farmer/add-product" element={<PrivateRoute allowedRoles={['farmer']}><UserLayout><AddProduct /></UserLayout></PrivateRoute>}/>
      <Route path="/farmer/my-products" element={<PrivateRoute allowedRoles={['farmer']}><UserLayout><MyProducts /></UserLayout></PrivateRoute>}/>
      <Route path="/farmer/edit-product/:id" element={<PrivateRoute allowedRoles={['farmer']}><UserLayout><EditProduct /></UserLayout></PrivateRoute>}/>


       {/* Vendor */}

  
      </Routes>
  );
};

export default App;
