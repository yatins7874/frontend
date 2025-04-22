// FeaturedCarousel.jsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Box } from '@mui/material';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const featuredImages = [
  "https://media.istockphoto.com/id/479440915/photo/compost-with-composted-earth.jpg?s=612x612&w=0&k=20&c=P5u2ACtdpVOZETebKudOz7RFL3b6EqY-2uQOrQ2_bdA=",
  "https://media.istockphoto.com/id/458054703/photo/maize-ears-left-on-a-field.jpg?s=612x612&w=0&k=20&c=oquRbD3NseBfSk6T2-ahAzjoUpzVqE_HTYsC_39ZN3Q=",
  "https://www.homebiogas.com/wp-content/uploads/2023/09/shutterstock_2057386766.jpg"
];

const FeaturedCarousel = () => {
  return (
    <Box sx={{ position: 'relative', zIndex: 2 }}>
      <Swiper
        modules={[ Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
        loop={true}
      >
        {featuredImages.map((url, index) => (
          <SwiperSlide key={index}>
            <img
              src={url}
              alt={`Slide ${index}`}
              style={{
                width: '100%',
                height: '350px',
                objectFit: 'cover',
                borderRadius: '20px',
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};


export default FeaturedCarousel;
