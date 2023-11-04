import React, { useState, useRef } from 'react';
import ImageSlider from '../../components/ImageSlider/ImageSlider';
import styles from '../../components/ImageSlider/ImageSlider.module.css';

const widthSpan = 101;

const ImageSliderContainer = (props) => {

    const { images, infinite } = props;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [mouseStartPosition, setMouseStartPosition] = useState(0);
    const [mouseEndPosition, setMouseEndPosition] = useState(0);
    const [mouseClicked, setMouseClicked] = useState(false);
    const [mouseSwiped, setMouseSwiped] = useState(false);
    const [touchStartPosition, setTouchStartPosition] = useState(0);
    const [touchEndPosition, setTouchEndPosition] = useState(0);
    const [touched, setTouched] = useState(false);
    const [swiped, setSwiped] = useState(false);

    const sliderRef = useRef(null);
    const slidesRef = useRef(null);

    const backToPrevSlide = () => {
        let newPosition = currentIndex;
        if ( newPosition > 0 ) {
            newPosition = newPosition - 1;
        } else if ( infinite ) {
            newPosition = images.length - 1 || 0;
        };
        translateFullSlides(newPosition);
        setCurrentIndex(newPosition);
    };

    const goToNextSlide = () => {
        let newPosition = currentIndex;
        if ( newPosition < images.length - 1 ) {
            newPosition = newPosition + 1;
        } else if ( infinite ) {
            newPosition = 0;
        };
        translateFullSlides(newPosition);
        setCurrentIndex(newPosition);
    };

    const goToSlide = (index) => {
        translateFullSlides(index);
        setCurrentIndex(index);
    };

    const speedUpAnimation = () => {
        for ( let i = Math.max(0, currentIndex - 2); i < (Math.min(images.length, currentIndex + 3) || 1); i++ ) {
            const elem = slidesRef.current.children[i];
            elem.classList.add(styles.fast_animation);
        };
    };

    const slowDownAnimation = () => {
        for ( let i = Math.max(0, currentIndex - 2); i < (Math.min(images.length, currentIndex + 3) || 1); i++ ) {
            const elem = slidesRef.current.children[i];
            elem.classList.remove(styles.fast_animation);
        };
    };

    const handleMouseDown = (event) => {
        event.preventDefault();

        speedUpAnimation();
        setMouseStartPosition(event.clientX);
        setMouseEndPosition(event.clientX);
        setMouseClicked(true);
    };

    const handleMouseMove = (event) => {
        event.preventDefault();

        const frameWidth = slidesRef.current.offsetWidth;
        if ( mouseClicked === true ) {
            setMouseEndPosition(event.clientX);
            const translateDist = (mouseEndPosition - mouseStartPosition) / frameWidth * 100;
            translatePartialSlides(translateDist);
            setMouseSwiped(true);
        };
    };

    const handleMouseUp = (event) => {
        slowDownAnimation();
        if ( mouseSwiped === true ) {
            if ( mouseStartPosition - mouseEndPosition > 100 ) {
                goToNextSlide();
            } else if ( mouseStartPosition - mouseEndPosition < -100 ) {
                backToPrevSlide();
            } else {
                goToSlide(currentIndex);
            };
        };
        setMouseClicked(false);
        setMouseSwiped(false);
    };

    const handleTouchStart = (event) => {
        speedUpAnimation();
        setTouchStartPosition(event.targetTouches[0].clientX);
        setTouchEndPosition(event.targetTouches[0].clientX);
        setTouched(true);
    };

    const handleTouchMove = (event) => {
        setTouchEndPosition(event.targetTouches[0].clientX);
        const frameWidth = slidesRef.current.offsetWidth;
        const translateDist = (touchEndPosition - touchStartPosition) / frameWidth * 100;
        translatePartialSlides(translateDist);
        if ( touched === true ) {
            setSwiped(true);
        };
    };

    const handleTouchEnd = () => {
        if ( swiped ) {
            slowDownAnimation();
            if ( touchStartPosition - touchEndPosition > 75 ) {
                goToNextSlide();
            } else if ( touchStartPosition - touchEndPosition < -75 ) {
                backToPrevSlide();
            } else {
                goToSlide(currentIndex);
            };
        };
        setTouched(false);
        setSwiped(false);
    };

    const translatePartialSlides = (toTranslate) => {
        const currentTranslation = -widthSpan * currentIndex;
        const totalTranslation = currentTranslation + toTranslate;
        for ( let i = 0; i < ( images.length || 1 ); i++ ) {
            const elem = slidesRef.current.children[i];
            elem.style.transform = `translateX(` + totalTranslation + `%)`;
        };
    };

    const translateFullSlides = (newPosition) => {
        const toTranslate = -widthSpan * newPosition;
        for ( let i = 0; i < ( images.length || 1 ); i++ ) {
            const elem = slidesRef.current.children[i];
            elem.style.transform = `translateX(` + toTranslate + `%)`;
        };
    };

    return (
        <>
            <ImageSlider 
                images={images}
                currentIndex={currentIndex}
                sliderRef={sliderRef}
                slidesRef={slidesRef}
                goToSlide={goToSlide}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            />
        </>    
    );
};

export default ImageSliderContainer;