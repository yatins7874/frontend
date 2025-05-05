import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Container,
  Grid,
  Button,
  CircularProgress
} from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import Footer from '../../components/footer/Footer';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/favorites', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFavorites(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to load favorites", err);
      toast.error("Could not fetch favorites");
      setLoading(false);
    }
  };

  const handleRemove = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/favorites/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFavorites(prev => prev.filter(item => item._id !== productId));
      toast.success('Removed from favorites');
    } catch (err) {
      console.error("Error removing favorite", err);
      toast.error("Failed to remove favorite");
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  if (loading) return <CircularProgress sx={{ m: 5 }} />;
  if (favorites.length === 0) return (
    <Typography sx={{ m: 5 }} variant="h6">
      You have no favorite products.
    </Typography>
  );

  return (
    <Box sx={{
      minHeight: '100vh',
      backgroundImage: 'url(/images/bg.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      pt: 5,
      pb: 10
    }}>
      <Container>
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
          My Favorite Products
        </Typography>
        <Grid container spacing={3}>
          {favorites.map(product => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <Card sx={{ width: 260, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.title}
                />
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h6">{product.title}</Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Category: {product.category}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {product.description}
                  </Typography>
                  <Box sx={{ mt: 'auto' }}>
                    <Button
                      fullWidth
                      variant="outlined"
                      color="error"
                      onClick={() => handleRemove(product._id)}
                    >
                      Remove
                    </Button>
                  </Box>
                </CardContent>

              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};

export default FavoritesPage;
