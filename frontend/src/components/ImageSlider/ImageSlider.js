import React from 'react';
import styles from './ImageSlider.module.css';

const SERVER = process.env.REACT_APP_BACKEND_URL;

const ImageSlider = (props) => {

    const { images, 
            currentIndex, 
            sliderRef,
            slidesRef,
            goToSlide, 
            onMouseDown, 
            onMouseMove, 
            onMouseUp,
            onTouchStart, 
            onTouchMove,
            onTouchEnd } = props;

    return (
        <div className={styles.slide_container} ref={sliderRef}>
            <div 
                className={styles.slide} 
                ref={slidesRef}
                onMouseDown={(event) => onMouseDown(event)}
                onMouseMove={(event) => onMouseMove(event)}
                onMouseUp={(event) => onMouseUp(event)}
                onMouseLeave={(event) => onMouseUp(event)}
                onTouchStart={(event) => onTouchStart(event)}
                onTouchMove={(event) => onTouchMove(event)}
                onTouchEnd={(event) => onTouchEnd(event)}
            >
                {images.map((image, imageIndex) => {
                    return (
                        <div key={imageIndex} className={styles.slide_item}>
                            <img src={`${SERVER}/product/images/${image}`} alt={`slide ${imageIndex}`} />
                        </div>
                    );
                })}
            </div>
            <div className={styles.button_container}>
                {images.map((image, imageIndex) => {
                    return (
                        <div 
                            key={imageIndex} 
                            className={ currentIndex === imageIndex
                                ? styles.button.concat(' ' + styles.selected_button)
                                : styles.button} 
                            onClick={() => goToSlide(imageIndex)}
                        >
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ImageSlider;