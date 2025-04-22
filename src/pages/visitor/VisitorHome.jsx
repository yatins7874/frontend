import React from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FeaturedCarousel from '../../components/FeaturedCarousel';
import Footer from '../../components/footer/Footer';



const trendingProducts = [
  { title: 'Compost Turner Machine', image: 'https://organicfertilizermachine.com/wp-content/uploads/2017/05/Commercial-Compost-Windrow-Turner.jpg' },
  { title: 'Vermicompost Bin System', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTnRoj5zYUbayy37wcedYdD5GqgNsCksTpPA&s' },
  { title: 'Biogas Plant', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_nctgtuWNK_JLpwP0J0DSO3ciEgVRtQLwCw&s' },
  { title: 'Manure Separator (Solid-Liquid)', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxPpc-BEGEIzlgnFC1yTPDjc6gU_O6Tn7K4A&s' },
  { title: 'Organic Waste Converter (OWC)', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnk_j2ttPU9X2vcc_RXqhls3KgST0smdXCnA&s' },
  { title: 'Baling Machine for Crop Residue ', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHYn2K2nsFg1uQXsAfmjxkOhmfHlOlCDxAOg&s' },
];

const featuredContent = {
  bigCard: {
    title: 'Smart Composting Solutions ',
    image: 'https://th-i.thgim.com/public/incoming/9z830x/article69042407.ece/alternates/FREE_1200/Food%20Waste%20Composting.jpg',
  },

  smallCards1: [
    { title: 'Clean Energy from Waste', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeXp2uS8ACqC7Tzw4gB7w-YOqwY5mKNLVQqA&s' },
    { title: 'Eco-Friendly Slurry Management', image: 'https://awsmfarming.co.uk/wp-content/uploads/2024/07/Featured-image-1.jpg' },
    { title: 'Crop Residue Recycling', image: 'https://media.licdn.com/dms/image/v2/D4D12AQGNQDS9ebPfiw/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1667368504266?e=2147483647&v=beta&t=9xSZVdhJaikGd_ZVdV_o79NvIENohdlYHmVN3L7bVXE' },
  ],
};

const VisitorHome = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ backgroundImage: 'url(/images/bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center', pt: 6, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    
      {/* Inner Container */}
      <Box sx={{ width: '100%', maxWidth: '1500px', px: { xs: 2, md: 4 } }}>
        {/* Hero Banner */}
        <Box
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: '1500px',
          height: '350px',
          borderRadius: 5,
          overflow: 'hidden',
          mb: 8,
        }}
      >
        {/* Carousel Background */}
        <Box sx={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0 }}>
          <FeaturedCarousel />
          {/* Dark overlay for better readability */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              zIndex: 1,
            }}
          />
        </Box>

        {/* Text on top of Carousel */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            px: { xs: 4, md: 10 },
            color: 'white',
            pointerEvents:'none',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
          Lets Transform Waste Into Resources
          </Typography>
          <Typography variant="h6" sx={{ mb: 4 }}>
            Lets Explore Waste Management Products
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#00000000',
              pointerEvents:'all',
              border: 1,
              fontSize: '1.1rem',
              px: 4,
              py: 1,
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                backgroundColor: '#ffffff22',
              },
            }}
            onClick={() => navigate('/products')}
          >
            Explore Products
          </Button>
        </Box>
      </Box>

        {/* Top Trending Products */}
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography variant="h4" sx={{ textAlign:'left', fontWeight: 'bold', mb: 3 }}>
            Trending Products
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {trendingProducts.map((product, index) => (
              <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
                <Card sx={{ borderRadius: 3, width:'224px', height: '100%', boxShadow: 3, 
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                 }}>
                  <CardMedia
                    component="img"
                    height="160"
                    image={product.image}
                    alt={product.title}
                  />
                  <CardContent>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {product.title}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Featured Content */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, textAlign: 'left' }}>
        Featured Content
          </Typography>
          <Grid container spacing={4} justifyContent="center">

         <Grid item xs={12} md={4}>
                    <Card
                      sx={{
                        width: '800px',
                        height: '550px',
                        borderRadius: 4,
                        boxShadow: 4,
                        position: 'relative',
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.05)',
                        },
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="550"
                        image={featuredContent.bigCard.image}
                        alt={featuredContent.bigCard.title}
                        sx={{ borderRadius: 4 }}
                      />
                      <CardContent
                        sx={{
                          position: 'absolute',
                          bottom: 30,
                          left: 30,
                          color: 'white',
                        }}
                      >
                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                          {featuredContent.bigCard.title}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
         
                   {/* Center */}
         
         
                  <Grid item xs={12} md={4}>
                    <Stack spacing={3} alignItems="center">
                      {featuredContent.smallCards1.map((card, index) => (
                        <Card
                          key={index}
                          sx={{
                            width:'500px',
                            display: 'flex',
                            height: '168px',
                            borderRadius: 3,
                            boxShadow: 3,
                            transition: 'transform 0.3s ease',
                            '&:hover': {
                              transform: 'scale(1.05)',
                            },
                          }}
                        >
                          <CardMedia
                            component="img"
                            image={card.image}
                            alt={card.title}
                            sx={{
                              width: 168,
                              height: 168,
                              borderTopLeftRadius: 12,
                              borderBottomLeftRadius: 12,
                            }}
                          />
                          <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                              {card.title}
                            </Typography>
                          </CardContent>
                        </Card>
                      ))}
                    </Stack>
                  </Grid>
           
        
         
             
         
        </Grid>

        </Box>

      </Box>
      <Footer />
    </Box>
  );
};

export default VisitorHome;
