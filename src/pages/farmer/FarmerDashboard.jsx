import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const FarmerDashboard = () => {
  const navigate = useNavigate();

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Welcome, Farmer!
      </Typography>

      <Stack spacing={2} direction="row">
        <Button variant="contained" color="primary" onClick={() => navigate('/farmer/add-product')}>
          Add New Product
        </Button>
        <Button variant="outlined" color="secondary" onClick={() => navigate('/farmer/my-products')}>
          View My Products
        </Button>
      </Stack>
    </Box>
  );
};

export default FarmerDashboard;
