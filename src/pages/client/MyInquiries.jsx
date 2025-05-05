import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";  // Corrected import
import { toast } from 'react-toastify';  // Corrected import for toastify
import 'react-toastify/dist/ReactToastify.css';  // Import CSS for toastify

const MyInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const { user } = useContext(UserContext);  // Use context to get user data

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const res = await axios.get('/api/inquiries/mine', {
          headers: { Authorization: `Bearer ${user?.token}` },  // Use user.token from context
        });
        setInquiries(res.data);
      } catch (err) {
        toast.error('Failed to load inquiries');  // Show error toast if fetch fails
        console.error(err);
      }
    };

    if (user?.token) {
      fetchInquiries();
    }
  }, [user?.token]);  // Make sure token is available before fetching inquiries

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>
        My Inquiries
      </Typography>

      <Grid container spacing={3}>
        {inquiries.map((inquiry) => (
          <Grid item xs={12} sm={6} md={4} key={inquiry._id}>
            <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
              <CardMedia
                component="img"
                height="160"
                image={inquiry.product?.image}
                alt={inquiry.product?.title}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {inquiry.product?.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Category: {inquiry.product?.category}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Message: {inquiry.message || 'No message'}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Sent on: {new Date(inquiry.createdAt).toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MyInquiries;
