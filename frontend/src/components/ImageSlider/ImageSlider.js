import React from 'react';
import styles from './ImageSlider.module.css';

// const SERVER = process.env.REACT_APP_BACKEND_URL;

const ImageSlider = (props) => {

    const { images, 
            currentIndex, 
            goToSlide, 
            onMouseDown, 
            onMouseMove, 
            onMouseUp,
            onTouchStart, 
            onTouchMove,
            slideImages, 
            selectedImage } = props;

    return (
        <div 
            className={styles.slide_container} 
            onMouseDown={onMouseDown} 
            onMouseMove={onMouseMove} 
            onMouseUp={onMouseUp} 
            onTouchStart={onTouchStart} 
            onTouchMove={onTouchMove} 
        >
            <div className={styles.slide} style={slideImages(currentIndex)}></div>
            {/* <img className={styles.slide} src={`${SERVER}/product/images/${images[currentIndex]}`} alt={`Slide ${currentIndex}`} /> */}
            <div className={styles.button_container}>
                {images.map((image, imageIndex) => {
                    return (
                        <div key={imageIndex} className={styles.button} style={selectedImage(imageIndex)} onClick={() => goToSlide(imageIndex)}></div>
                    );
                })}
            </div>
        </div>
    );
};

export default ImageSlider;