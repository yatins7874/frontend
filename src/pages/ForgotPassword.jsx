import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Paper } from '@mui/material';
import API from '../services/api';  // Your API service

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async () => {
    try {
      // Send the forgot password request
      await API.post('/auth/forgot-password', { email });
      alert('If this email exists, you will receive a reset link shortly.');

      // Navigate to the reset password page after successful email submission
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to send reset link');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: 'url("/images/bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper elevation={6} sx={{ padding: 4, width: 400 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Forgot Password
        </Typography>

        <TextField
          fullWidth
          margin="normal"
          name="email"
          label="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button sx={{ marginTop: 2 }} fullWidth variant="contained" onClick={handleSubmit}>
          Send Reset Link
        </Button>
      </Paper>
    </Box>
  );
};

export default ForgotPassword;
