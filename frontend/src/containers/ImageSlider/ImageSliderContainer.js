import React, { useState } from 'react';
import ImageSlider from '../../components/ImageSlider/ImageSlider';

const SERVER = process.env.REACT_APP_BACKEND_URL;

const ImageSliderContainer = (props) => {

    const { images } = props;

    const [currentIndex, setCurrentIndex] = useState(0);

    const goToSlide = (imageIndex) => {
        setCurrentIndex(imageIndex);
    };

    let startX = 0;
    let isDragging = false;

    const handleMouseDown = (event) => {
        event.preventDefault();

        isDragging = true;
        startX = event.clientX;
    };

    const handleMouseMove = (event) => {
        event.preventDefault();

        if (!isDragging) return;
        const currentX = event.clientX;
        const deltaX = startX - currentX;

        if ( deltaX > 50 ) {
            // Swipe left to show the next slide
            if ( currentIndex < images.length - 1 ) {
                setCurrentIndex((prevIndex) => prevIndex + 1);
                isDragging = false;
            };
        } else if ( deltaX < -50 ) {
            // Swipe right to show the previous slide
            if ( currentIndex > 0 ) {
                setCurrentIndex((prevIndex) => prevIndex - 1);
                isDragging = false;
            };
        };
    };

    const handleMouseUp = (event) => {
        event.preventDefault();

        isDragging = false;
    };

    let touchStartX = 0;

    const handleTouchStart = (event) => {
        isDragging = true;
        touchStartX = event.touches[0].clientX;
    };

    const handleTouchMove = (event) => {
        const touchEndX = event.touches[0].clientX;
        const deltaX = touchStartX - touchEndX;

        if ( deltaX > 50 ) {
            // Swipe left to show the next slide
            if ( currentIndex < images.length - 1 ) {
                setCurrentIndex((prevIndex) => prevIndex + 1);
                isDragging = false;
            };
        } else if ( deltaX < -50 ) {
            // Swipe right to show the previous slide
            if ( currentIndex > 0 ) {
                setCurrentIndex((prevIndex) => prevIndex - 1);
                isDragging = false;
            };
        };
    };

    const handleTouchEnd = () => {
        isDragging = false;
    };

    const slideImages = (index) => ({
        backgroundImage: `url(${SERVER}/product/images/${images[index]})`
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
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                slideImages={slideImages}
                selectedImage={selectedImage}
            />
        </>    
    );
};

export default ImageSliderContainer;