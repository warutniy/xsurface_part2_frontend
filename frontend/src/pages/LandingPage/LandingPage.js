import React from 'react';
import ProductListContainer from '../../containers/ProductList/ProductListContainer';
import UploadProductContainer from '../../containers/UploadProduct/UploadProductContainer';

const LandingPage = () => {

    return (
        <>
            <ProductListContainer />
            <UploadProductContainer />
        </>
    );
};

export default LandingPage;