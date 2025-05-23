import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem,
  Box,
} from '@mui/material';

const categories = [
  'Composting Equipment',
  'Biogas & Energy Generation Systems',
  'Manure Management Solutions',
  'Crop Residue Handling',
  'Wastewater Treatment',
  'Plastic & Packaging Waste Handling',
  'Poultry & Livestock Waste Solutions',
  'Sensors & Monitoring Systems',
  'Organic Fertilizer Production',
  'Transportation & Storage'
];

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    materials: '',
    description: '',
    category: '',
    image: '',
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        const productData = res.data;
        if (!categories.includes(productData.category)) {
          productData.category = '';
        }
        setFormData({
          title: productData.title || '',
          materials: productData.materials || '',
          description: productData.description || '',
          category: productData.category || '',
          image: productData.image || '',
        });
      } catch (error) {
        console.error('Failed to fetch product:', error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:5000/api/products/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/farmer/my-products');
    } catch (error) {
      console.error('Failed to update product:', error);
    }
  };

  return (
    <Box sx={{ mt:-4.1, minHeight:'120vh', backgroundImage: 'url("https://www.shutterstock.com/image-photo/wooden-table-top-on-blur-600nw-2257635199.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center' }}>
    <Container maxWidth="md" sx={{ pt:6, mt: 4 }}>
      <Paper elevation={3} sx={{ bgcolor:'rgba(255, 255, 255, 0.62)', p: 4 }}>
        <Typography variant="h5" gutterBottom>Edit Product</Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Title" name="title" fullWidth margin="normal" value={formData.title || ''} onChange={handleChange} />
          <TextField label="Materials (comma-separated)" name="materials" fullWidth margin="normal" value={formData.materials || ''} onChange={handleChange} />
          <TextField label="Description" name="description" fullWidth margin="normal" value={formData.description || ''} onChange={handleChange} multiline rows={4} />
          <TextField
            select
            label="Category"
            name="category"
            fullWidth
            margin="normal"
            value={formData.category}
            onChange={handleChange}
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </TextField>
          <TextField label="Image URL" name="image" fullWidth margin="normal" value={formData.image || ''} onChange={handleChange} />
          <Button type="submit" variant="contained" color="primary">Update Product</Button>
        </form>
      </Paper>
    </Container>
    </Box>
  );
};

export default EditProduct;
