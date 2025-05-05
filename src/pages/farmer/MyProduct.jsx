
import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Grid,
  Snackbar,
  Alert,
  Stack,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const navigate = useNavigate();

  const fetchMyProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/products/myproducts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/farmer/edit-product/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDeleted(true);
      fetchMyProducts(); // refresh list
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  useEffect(() => {
    fetchMyProducts();
  }, []);

  return (
    <Box sx={{
      backgroundImage: 'url("https://www.shutterstock.com/image-photo/wooden-table-top-on-blur-600nw-2257635199.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }} p={4}>
      <Typography variant="h4" gutterBottom>
        My Products
      </Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <Card sx={{ bgcolor:'rgba(255, 255, 255, 0.62)' ,position: 'relative', height: '100%', width:'260px' }}>
              <CardMedia
                component="img"
                height="160"
                image={product.image || 'https://via.placeholder.com/300'}
                alt={product.title}
              />
              <CardContent>
                <Typography sx={{ wordWrap: 'break-word', whiteSpace: 'normal' }} variant="h6">{product.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Category: {product.category}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Materials: {product.materials.join(', ')}
                </Typography>
                <IconButton
                color="error"
                onClick={() => handleDelete(product._id)}
                sx={{ position: 'absolute', top: 8, right: 8 }}
              >
                <DeleteIcon />
              </IconButton>
              </CardContent>
              <IconButton
                  color="primary"
                    onClick={() => handleEdit(product._id)}
  >
                 <EditIcon />
              </IconButton>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Stack marginTop={10} spacing={2} direction="row">
        <Button variant="contained" color="primary" onClick={() => navigate('/farmer/add-product')}>
         + Add New Product
        </Button>
      </Stack>

      <Snackbar open={deleted} autoHideDuration={3000} onClose={() => setDeleted(false)}>
        <Alert onClose={() => setDeleted(false)} severity="info" sx={{ width: '100%' }}>
          Product deleted successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MyProducts;
