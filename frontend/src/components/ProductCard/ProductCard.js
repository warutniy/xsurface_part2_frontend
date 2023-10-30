import React from 'react';
import styles from './ProductCard.module.css';
import ImageSliderContainer from '../../containers/ImageSlider/ImageSliderContainer';

const ProductCard = (props) => {

  const { products, 
          formatProduct, 
          formatHighlightedProduct, 
          formatPrice } = props;

  return (
    <div className={styles.wrapper}>
      {products.map((product) => {
        return (
          <div className={styles.product_card} key={product._id}>
            <div className={styles.image}>
              <ImageSliderContainer images={product.images} />
            </div>
            <div className={styles.product_name}>
              <h2>
                { 
                  !product.highlight ? formatProduct(product.productName) 
                    : (
                        product.highlight.filter((item) => item.path === 'productName').length === 0 ? formatProduct(product.productName) 
                        : formatHighlightedProduct(product.highlight, 'productName').map((item, index) => item.type === 'hit' ? <mark key={index}>{item.value}</mark> : item.value)
                      ) 
                }
              </h2>
            </div>
            <div className={styles.code}>
              <h3>
                { 
                  !product.highlight ? product.code 
                    : (
                        product.highlight.filter((item) => item.path === 'code').length === 0 ? product.code 
                        : formatHighlightedProduct(product.highlight, 'code').map((item, index) => item.type === 'hit' ? <mark key={index}>{item.value}</mark> : item.value)
                      ) 
                }
              </h3>
            </div>
            <div className={styles.price}>{formatPrice(product.price)}</div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductCard;