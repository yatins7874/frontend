import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';

const AddAdmin = () => {
  const [admin, setAdmin] = useState({ name: '', email: '', password: '', role: 'admin' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    await API.post('/auth/register', admin);
      alert('Admin user created successfully');
      navigate('/admin/users');
    } catch (err) {
      alert(err.response?.data?.message || 'Error creating admin');
    }
  };

  return (
    <Box sx={{ mt:-6, pt:2, minHeight:'100vh',
      backgroundImage: 'url("https://i.pinimg.com/736x/dd/f4/0b/ddf40b85196cbc1028a907616990ba92.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center' }}>
    <Container>
      <Typography variant="h5" gutterBottom>
        Add New Admin
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          required
          value={admin.name}
          onChange={(e) => setAdmin({ ...admin, name: e.target.value })}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          required
          value={admin.email}
          onChange={(e) => setAdmin({ ...admin, email: e.target.value })}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          required
          value={admin.password}
          onChange={(e) => setAdmin({ ...admin, password: e.target.value })}
        />
        <Button type="submit" variant="contained" color="primary">
          Add Admin
        </Button>
      </form>
    </Container>
    </Box>
  );
};

export default AddAdmin;
