import React from 'react';
import ProductList from '../../components/ProductList/ProductList';

const ProductListContainer = (props) => {

    const { products,
            inputTerm,
            autoComplete,
            onChangeTerm,
            onSearchTerm } = props;

    const searchContainerStyle = (input) => (
        !input ? {} : { borderColor: 'rgba(223,225,229,0)', boxShadow: '0px 1px 6px rgba(32,33,36,.28)' }
    );

    const dropdownLineStyle = (input) => (
        input.length === 0 ? {} : { borderTop: '1px solid #e8eaed', margin: '0 20px', paddingBottom: '4px' }
    );

    return (
        <>
            <ProductList 
                products={products}
                inputTerm={inputTerm}
                autoComplete={autoComplete}
                onChangeTerm={onChangeTerm}
                onSearchTerm={onSearchTerm}
                searchContainerStyle={searchContainerStyle}
                dropdownLineStyle={dropdownLineStyle}
            />
        </>
    );
};

export default ProductListContainer;