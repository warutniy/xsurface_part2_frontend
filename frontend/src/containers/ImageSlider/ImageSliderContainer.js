import React, { useState } from 'react';
import ImageSlider from '../../components/ImageSlider/ImageSlider';

const SERVER = process.env.REACT_APP_BACKEND_URL;

const ImageSliderContainer = (props) => {

    const { images } = props;

    const [currentIndex, setCurrentIndex] = useState(0);

    const goToSlide = (imageIndex) => {
        setCurrentIndex(imageIndex);
    };

    const slideImages = (index) => ({
        backgroundImage: `url(${SERVER}/uploads/${images[index]})`
    });

    const selectedImage = (index) => (
        currentIndex === index ? { backgroundColor: '#E13B30' } : { backgroundColor: '#D9D9D9' }
    );

    return (
        <>
            <ImageSlider 
                images={images}
                currentIndex={currentIndex}
                goToSlide={goToSlide}
                slideImages={slideImages}
                selectedImage={selectedImage}
            />
        </>    
    );
};

export default ImageSliderContainer;