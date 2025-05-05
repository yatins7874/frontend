
import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Paper,
  Snackbar,
  Alert,
} from '@mui/material';
import axios from 'axios';

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

const AddProduct = () => {
  const [title, setTitle] = useState('');
  const [materials, setMaterials] = useState('');
  const [instructions, setInstructions] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const res = await axios.post(
        'http://localhost:5000/api/products',
        {
          title,
          materials: materials.split(','),
          instructions,
          category,
          image,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 201) {
        setSuccess(true);
        setTitle('');
        setMaterials('');
        setInstructions('');
        setCategory('');
        setImage('');
      }
    } catch (err) {
      console.error('Error adding product:', err);
    }
  };

  return (
    <Box sx={{ minHeight:'100vh', backgroundImage: 'url("https://www.shutterstock.com/image-photo/wooden-table-top-on-blur-600nw-2257635199.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center' }}>
    <Box p={4} maxWidth={600} margin="auto">
      <Paper elevation={3} sx={{ bgcolor:'rgba(255, 255, 255, 0.62)', p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Add New Product
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            fullWidth
            required
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Materials (comma-separated)"
            fullWidth
            required
            margin="normal"
            value={materials}
            onChange={(e) => setMaterials(e.target.value)}
          />
          <TextField
            label="Instructions"
            fullWidth
            required
            multiline
            rows={4}
            margin="normal"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
          <TextField
            label="Category"
            select
            fullWidth
            required
            margin="normal"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Image URL"
            fullWidth
            margin="normal"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Add Product
          </Button>
        </form>
      </Paper>

      <Snackbar open={success} autoHideDuration={4000} onClose={() => setSuccess(false)}>
        <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: '100%' }}>
          Product added successfully!
        </Alert>
      </Snackbar>
    </Box>
    </Box>
  );
};

export default AddProduct;
