import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { appBarStyle, titleStyle, buttonStyle, buttonStyle1 } from './navbarStyles';

const ClientNavbar = () => {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.clear();
    navigate('/');
  };

  return (
    <AppBar position="static" sx={appBarStyle}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" component={Link} to="/" sx={titleStyle}>Agriclean</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button component={Link} to="/client/dashboard" sx={buttonStyle}>Home</Button>
          <Button component={Link} to="/client/products" sx={buttonStyle}>Product</Button>
          <Button component={Link} to="/favorites" sx={buttonStyle}>Favorites</Button>
          <Button component={Link} to="/client/orders" sx={buttonStyle}>My Orders</Button>
          <Button component={Link} to="/about" sx={buttonStyle}>About</Button>
          <Button onClick={handleLogout} sx={buttonStyle1}>Logout</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default ClientNavbar;
