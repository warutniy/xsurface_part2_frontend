import React from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';

const ProductCardContainer = (props) => {

    const { products } = props;

    // edit format product name
    const formatProduct = (text) => {
        const newText = text.trim().replace(/\s+/g, ' ').split(' ');
        return newText.join(' ');    
    };

    // edit format price
    const formatPrice = (price) => {
        const numPrice = Number(price);
        const intPrice = Math.round(numPrice);
        const stringPrice = intPrice.toString().split('').reverse().join('');
    
        const array = [];
        for ( let i = 0; i < stringPrice.length; i += 3 ) {
            const subStringArray = stringPrice.substring(i, i + 3).split('').reverse().join('');
            array.push(subStringArray);
        };

        const sumPrice = array.reverse().join(',');
        const resultPrice = '฿' + sumPrice;
    
        return resultPrice;
    };

    return (
        <>
          <ProductCard
            products={products} 
            formatProduct={formatProduct}
            formatPrice={formatPrice}
          />  
        </>
    );
};

export default ProductCardContainer;