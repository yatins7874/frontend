import React, { useEffect, useState } from 'react';
import {
  Box, Card, CardMedia, CardContent, Typography, CircularProgress, Container, Button, TextField, Rating, Stack
} from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import Footer from '../../components/footer/Footer';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [ratings, setRatings] = useState([]);
  const [newRating, setNewRating] = useState({ name: '', stars: 0, message: '' });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading product:", err);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/favorites', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsFavorite(res.data.some(favProduct => favProduct._id === id));
      } catch (err) {
        console.error("Error checking favorites:", err);
      }
    };

    const fetchRatings = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/ratings/${id}`);
        setRatings(res.data);
      } catch (err) {
        console.error("Error loading ratings:", err);
      }
    };

    if (product) {
      checkFavorite();
      fetchRatings();
    }
  }, [product, id]);

  const handleFavoriteToggle = async () => {
    try {
      const token = localStorage.getItem('token');
      if (isFavorite) {
        await axios.delete(`http://localhost:5000/api/favorites/${product._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsFavorite(false);
        toast.success('Removed from favorites');
      } else {
        await axios.post('http://localhost:5000/api/favorites', {
          productId: product._id,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsFavorite(true);
        toast.success('Added to favorites');
      }
    } catch (err) {
      console.error('Error updating favorites:', err);
      toast.error('Something went wrong');
    }
  };

  const handleRatingSubmit = async () => {
    if (!newRating.name || !newRating.stars || !newRating.message) {
      return toast.warning("Please fill all fields");
    }
  
    const token = localStorage.getItem('token');
    if (!token) {
      return toast.error("You must be logged in to submit a rating");
    }
  
    try {
      const res = await axios.post(
        `http://localhost:5000/api/ratings/${id}`,
        newRating,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRatings(prev => [res.data, ...prev]);
      setNewRating({ name: '', stars: 0, message: '' });
      toast.success("Rating submitted");
    } catch (err) {
      console.error("Error submitting rating:", err);
      toast.error("Failed to submit rating");
    }
  };
  

  if (loading) return <CircularProgress sx={{ m: 5 }} />;
  if (!product) return <Typography sx={{ m: 5 }}>Product not found</Typography>;

  return (
    <Box sx={{ minHeight: '100vh', backgroundImage: 'url(/images/bg.jpg)', backgroundSize: 'cover', pt: 5 }}>
      <Container maxWidth="md" sx={{ mb: 5 }}>
        <Card>
          <CardMedia component="img" height="400" image={product.image} alt={product.title} />
          <CardContent>
            <Typography variant="h4" gutterBottom>{product.title}</Typography>
            <Typography variant="subtitle1" gutterBottom><strong>Category:</strong> {product.category}</Typography>
            <Typography variant="body1" gutterBottom><strong>Description:</strong> {product.description}</Typography>
            {product.material && (
              <Typography variant="body2" gutterBottom><strong>Material:</strong> {product.material}</Typography>
            )}
            <Button
              variant={isFavorite ? 'outlined' : 'contained'}
              color={isFavorite ? 'secondary' : 'primary'}
              onClick={handleFavoriteToggle}
              sx={{ mt: 2 }}
            >
              {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </Button>

            {/* Rating Form */}
            <Box sx={{ mt: 5 }}>
              <Typography variant="h6">Leave a Rating</Typography>
              <Stack spacing={2} sx={{ mt: 2 }}>
                <TextField
                  label="Name"
                  value={newRating.name}
                  onChange={(e) => setNewRating({ ...newRating, name: e.target.value })}
                />
                <Rating
                  name="stars"
                  value={newRating.stars}
                  onChange={(e, newValue) => setNewRating({ ...newRating, stars: newValue })}
                />
                <TextField
                  label="Message"
                  multiline
                  minRows={3}
                  value={newRating.message}
                  onChange={(e) => setNewRating({ ...newRating, message: e.target.value })}
                />
                <Button variant="contained" onClick={handleRatingSubmit}>Submit Rating</Button>
              </Stack>
            </Box>

            {/* Ratings List */}
            <Box sx={{ mt: 5 }}>
              <Typography variant="h6" gutterBottom>User Ratings</Typography>
              {ratings.map((rating, index) => (
                <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
                  <Typography variant="subtitle2">{rating.name}</Typography>
                  <Rating value={rating.stars} readOnly />
                  <Typography variant="body2">{rating.message}</Typography>
                </Box>
              ))}
            </Box>

          </CardContent>
        </Card>
      </Container>
      <Footer />
    </Box>
  );
};

export default ProductDetail;
