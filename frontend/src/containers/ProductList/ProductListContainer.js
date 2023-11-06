import React, { useState, useContext } from 'react';
import ProductList from '../../components/ProductList/ProductList';
import { ProductContext } from '../../contexts/ProductContext';

const ProductListContainer = () => {

    const { fetchAutoCompleteData, resetAutoCompleteData, fetchSearchData } = useContext(ProductContext);

    const [inputTerm, setInputTerm] = useState("");

    const handleChangeTerm = async (event) => {
        try {
            const { value } = event.target;
            setInputTerm(value);
            await fetchAutoCompleteData(value);
        } catch (error) {
            console.log(error);
        };
    };

    const handleSearchTerm = async (event, searchTerm) => {
        event.preventDefault();
    
        try {
            setInputTerm(searchTerm);
            resetAutoCompleteData();
            await fetchSearchData(searchTerm);
        } catch (error) {
            console.log(error);
        };
    };

    const searchContainerStyle = (input) => (
        !input ? {} : { borderColor: 'rgba(223,225,229,0)', boxShadow: '0px 1px 6px rgba(32,33,36,.28)' }
    );

    const dropdownLineStyle = (input) => (
        input.length === 0 ? {} : { borderTop: '1px solid #e8eaed', margin: '0 20px', paddingBottom: '4px' }
    );

    return (
        <>
            <ProductList 
                inputTerm={inputTerm}
                onChangeTerm={handleChangeTerm}
                onSearchTerm={handleSearchTerm}
                searchContainerStyle={searchContainerStyle}
                dropdownLineStyle={dropdownLineStyle}
            />
        </>
    );
};

export default ProductListContainer;