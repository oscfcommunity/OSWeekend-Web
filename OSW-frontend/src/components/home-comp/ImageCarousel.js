import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './ImageCarousel.css'

const ImageCarousel = ({ images }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const customItemStyle = {
    paddingLeft: '10px', // Adjust the left padding to reduce spacing
    paddingRight: '10px', // Adjust the right padding to reduce spacing
  };


  return (
    <div className="multi-image-carousel">
      <Carousel  responsive={responsive}>
        {images.map((image, index) => (
          <div className='img-car-con' key={index} style={customItemStyle}>
            <img src={image} alt={`Image ${index}`} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
