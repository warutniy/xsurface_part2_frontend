import React from 'react';
import styles from './ProductCard.module.css';
import ImageSliderContainer from '../../containers/ImageSlider/ImageSliderContainer';

const ProductCard = (props) => {

  const { products, formatProduct, formatPrice } = props;

  return (
    <div className={styles.wrapper}>
      {products.map(({_id, images, productName, code, price}) => {
        return (
          <div className={styles.product_card} key={_id}>
            <div className={styles.image}>
              <ImageSliderContainer images={images} />
            </div>
            <div className={styles.product_name}><h2>{formatProduct(productName)}</h2></div>
            <div className={styles.code}><h3>{code}</h3></div>
            <div className={styles.price}>{formatPrice(price)}</div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductCard;