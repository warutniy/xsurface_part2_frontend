import React from 'react';
import ProductList from '../../components/ProductList/ProductList';

const ProductListContainer = (props) => {

    const { products } = props;

    return (
        <>
            <ProductList 
                products={products}
            />
        </>
    );
};

export default ProductListContainer;