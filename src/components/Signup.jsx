import React, { useState } from 'react';
import {
  TextField, Button, MenuItem, Typography, Box, Paper, IconButton, CircularProgress
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import { toast } from 'react-toastify';  // Import toast for triggering notifications

const roles = ['client', 'farmer'];

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);  // New loading state

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(prev => !prev);
  };

  const validate = () => {
    const newErrors = {};
    const phoneRegex = /^\d{10}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!phoneRegex.test(form.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    if (!passwordRegex.test(form.password)) {
      newErrors.password = 'Password must be at least 8 characters and include letters and numbers';
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);  // Start loading

    try {
      const res = await API.post('/auth/register', {
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
        role: form.role
      });

      toast.success(res.data.message);  // Success toast
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed');  // Error toast
    } finally {
      setLoading(false);  // Stop loading
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      backgroundImage: 'url("/images/bg.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Paper elevation={6} sx={{ padding: 4, width: 400, backdropFilter: 'blur(5px)' }}>
        <Box sx={{ margin: -3, display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton onClick={() => navigate('/')}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography variant="h5" align="center" gutterBottom>Signup</Typography>
        <TextField
          fullWidth margin="normal" name="name" label="Name"
          onChange={handleChange} value={form.name}
        />
        <TextField
          fullWidth margin="normal" name="email" label="Email"
          onChange={handleChange} value={form.email}
        />
        <TextField
          fullWidth margin="normal" name="phone" label="Phone"
          onChange={handleChange} value={form.phone}
          error={!!errors.phone} helperText={errors.phone}
        />
        <TextField
          fullWidth margin="normal" name="password" label="Password" type={showPassword ? 'text' : 'password'}
          onChange={handleChange} value={form.password}
          error={!!errors.password} helperText={errors.password}
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
        <TextField
          fullWidth margin="normal" name="confirmPassword" label="Confirm Password" type={showConfirmPassword ? 'text' : 'password'}
          onChange={handleChange} value={form.confirmPassword}
          error={!!errors.confirmPassword} helperText={errors.confirmPassword}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle confirm password visibility"
                  onClick={toggleConfirmPasswordVisibility}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth select margin="normal" name="role" label="Role"
          value={form.role} onChange={handleChange}
        >
          {roles.map(role => (
            <MenuItem key={role} value={role}>{role}</MenuItem>
          ))}
        </TextField>

        <Button
          fullWidth
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}  // Disable button while loading
        >
          {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Sign Up'}
        </Button>

        <Button sx={{ marginTop: 2 }} fullWidth variant="outlined" color="secondary" onClick={() => navigate('/login')}>
          Already have an account? Login
        </Button>
      </Paper>
    </Box>
  );
};

export default Signup;
