import React from 'react';
import styles from './ImageSlider.module.css';

const ImageSlider = (props) => {

    const { images, currentIndex, goToSlide, slideImages, selectedImage } = props;

    return (
        <div className={styles.slide_container}>
            <div className={styles.slide} style={slideImages(currentIndex)}></div>
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