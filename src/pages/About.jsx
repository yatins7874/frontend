import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Button, IconButton } from '@mui/material';
import { CheckCircle, Lightbulb, Group, Phone } from '@mui/icons-material';

const About = () => {
  return (
    <Box sx={{ backgroundColor: '#e8f5e9', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box sx={{ backgroundColor: '#388e3c', color: 'white', padding: '40px 16px' }}>
        <Box sx={{ maxWidth: 1200, margin: '0 auto' }}>
          <Typography variant="h3" component="h1" sx={{ fontWeight: 700, marginBottom: 2 }}>
            About Our Farm Waste Management
          </Typography>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Transforming agricultural waste into sustainable solutions since 2015.
          </Typography>
        </Box>
      </Box>

      {/* Our Story Section */}
      <Box sx={{ maxWidth: 1200, margin: '40px auto' }}>

      <Grid item xs={12} md={6}>
      <Typography variant="h4" sx={{ fontWeight: 700, marginBottom: 2, color: '#388e3c' }}>
              Our Story
            </Typography>

            <Box sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: 4, height:500, width:1200,mb:10
             }}>
              <img
                src="https://www.dairyglobal.net/app/uploads/2021/09/001_909_IMG_SK14ed.jpg"
                alt="Farmers discussing waste management"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Box>
          </Grid>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            
            <Typography variant="body1" paragraph>
              Founded by a team of agricultural experts and environmental scientists, our company began with a simple mission: to help farmers manage waste efficiently while protecting our planet.
            </Typography>
            <Typography variant="body1" paragraph>
              What started as a local initiative has grown into a comprehensive waste management solution serving farms across the region. We believe that agricultural waste isn't just a problem to solve—it's an opportunity for innovation and sustainability.
            </Typography>
            <Typography variant="body1" paragraph>
              Today, we work with farms of all sizes to implement tailored waste management strategies that reduce environmental impact, comply with regulations, and even create new revenue streams through waste conversion.
            </Typography>
          </Grid>
          
        </Grid>
      </Box>

      {/* Our Values Section */}
      <Box sx={{ backgroundColor: '#c8e6c9', padding: '40px 16px' }}>
        <Box sx={{ maxWidth: 1200, margin: '0 auto' }}>
          <Typography variant="h4" sx={{ fontWeight: 700, marginBottom: 4, textAlign: 'left', color: '#388e3c' }}>
            Our Values
          </Typography>
          <Grid  container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card sx={{ padding: 3, borderRadius: 2, boxShadow: 3, width:800, height:260, textAlign:'center' }}>
                <Box sx={{ color: '#388e3c', borderRadius: '50%', padding: 2, marginBottom: 2 }}>
                  <CheckCircle fontSize="large" />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, marginBottom: 2 }}>
                  Sustainability
                </Typography>
                <Typography variant="body1">
                  We're committed to environmentally responsible practices that preserve natural resources for future generations.
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ padding: 3, borderRadius: 2, boxShadow: 3, width:800, height:260, textAlign:'center' }}>
                <Box sx={{ color: '#388e3c', borderRadius: '50%', padding: 2, marginBottom: 2 }}>
                  <Lightbulb fontSize="large" />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, marginBottom: 2 }}>
                  Innovation
                </Typography>
                <Typography variant="body1">
                  We constantly research and develop new technologies and methods to improve waste management efficiency.
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ padding: 3, borderRadius: 2, boxShadow: 3, width:800, height:260, textAlign:'center' }}>
                <Box sx={{ color: '#388e3c', borderRadius: '50%', padding: 2, marginBottom: 2 }}>
                  <Group fontSize="large" />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, marginBottom: 2 }}>
                  Partnership
                </Typography>
                <Typography variant="body1">
                  We believe in working closely with farmers to develop solutions that meet their specific needs and challenges.
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Call to Action Section */}
      <Box sx={{ backgroundColor: '#388e3c', color: 'white', padding: '40px 16px', textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 700, marginBottom: 3 }}>
          Ready to transform your farm's waste management?
        </Typography>
        <Typography variant="h6" sx={{ marginBottom: 4, maxWidth: '800px', margin: '0 auto' }}>
          Contact us today to schedule a consultation and learn how our solutions can benefit your farm.
        </Typography>
        <Button variant="contained" size="large" sx={{ color:'#008000', backgroundColor:'white', fontSize: '16px' }}>
          Contact Us
        </Button>
      </Box>
    </Box>
  );
};

export default About;
