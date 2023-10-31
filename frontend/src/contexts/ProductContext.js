import React, { createContext, useState, useEffect } from 'react';
import * as ProductAPI from '../api/product';

export const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {

    const [products, setProducts] = useState();
    const [autoComplete, setAutoComplete] = useState([]);
    const [term, setTerm] = useState("");

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await ProductAPI.getProduct();
                const fetchedProduct = response.data.products;
        
                // set current product
                if ( fetchedProduct ) {
                    setProducts(fetchedProduct);
                };
                
            } catch (error) {
                console.log(error);
            };
        };
    
        fetchProduct();
    }, []);

    const createProduct = async (body) => {
        try {
            const response = await ProductAPI.createProduct(body);
            console.log(response);

            alert(response.data.message);
            window.location.href = '/';
            
        } catch (error) {
            console.log(error);
            alert('Create Product Failed!');
        };
    };

    const fetchAutoCompleteData = async (body) => {
        try {
            const response = await ProductAPI.getAutoComplete(body);
            const formatAutoComplete = response.data.map((item) => item.productName.toLowerCase());
            const uniqAutoComplete = formatAutoComplete.filter((item, index, arr) => arr.indexOf(item) === index);
            const fetchedAutoComplete = uniqAutoComplete.map((text) => text.trim().replace(/\s+/g, ' ').split(' ').join(' '));
            
            // set current autocomplete
            setAutoComplete(fetchedAutoComplete);
    
        } catch (error) {
            console.log(error);
            alert('Fetch AutoComplete Data Failed!');
        };
    };

    const resetAutoCompleteData = () => {
        setAutoComplete([]);
    };
    
    const fetchSearchData = async (body) => {
        try {
            if ( !body || body.trim() === '' ) {
                const response = await ProductAPI.getProduct();
                const fetchedSearchProducts = response.data.products;

                // set current product
                setProducts(fetchedSearchProducts);
            
            } else {
                const response = await ProductAPI.getSearchProduct(body);
                const fetchedSearchProducts = response.data.products;
                const term = response.data.term;

                // set current search
                setProducts(fetchedSearchProducts);
                setTerm(term);
                
            };

        } catch (error) {
            console.log(error);
            alert('Fetch Search Data Failed!');
        };
    };

    const handlers = {
        products,
        autoComplete,
        term,
        createProduct,
        fetchAutoCompleteData,
        resetAutoCompleteData,
        fetchSearchData
    };

    return (
        <ProductContext.Provider value={handlers}>
            { children }
        </ProductContext.Provider>
    );
};

export default ProductContextProvider;