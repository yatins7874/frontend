import React, { useState, useContext } from 'react';
import { TextField, Button, Typography, Box, Paper, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { UserContext } from '../context/UserContext';
import CloseIcon from '@mui/icons-material/Close'; // Corrected import
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import { toast } from 'react-toastify'; // Import toastify
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { login } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await API.post('/auth/login', form);
      const userData = {
        name: res.data.user.name,
        role: res.data.user.role,
        token: res.data.token,
      };
      login(userData);
      toast.success('Login Successful ✅'); // Use toastify for success

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.user.role);
      localStorage.setItem('name', res.data.user.name);

      const role = res.data.user.role;

      if (role === 'admin') navigate('/admin/dashboard');
      else if (role === 'client') navigate('/client/dashboard');
      else if (role === 'farmer') navigate('/farmer/dashboard');
      else navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed'); // Use toastify for error
    }
  };

  return (
    <>
      {/* Add ToastContainer to the root of your component */}
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
          <Box sx={{ margin: -3, display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton onClick={() => navigate('/')}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography variant="h5" align="center" gutterBottom>
            Login
          </Typography>

          <TextField
            fullWidth
            margin="normal"
            name="email"
            label="Email"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            name="password"
            label="Password"
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={togglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button sx={{ marginTop: 2 }} fullWidth variant="contained" onClick={handleSubmit}>
            Login
          </Button>
          <Button
            sx={{ marginTop: 2 }}
            fullWidth
            variant="outlined"
            color="secondary"
            onClick={() => navigate('/signup')}
          >
            Don't have an account? Register
          </Button>

          {/* Forgot Password Button */}
          <Button
            sx={{ marginTop: 2 }}
            fullWidth
            variant="text"
            color="secondary"
            onClick={() => navigate('/forgot-password')}
          >
            Forgot Password?
          </Button>
        </Paper>
      </Box>
    </>
  );
};

export default Login;
