import React, { useState, useEffect} from 'react';
import ProductListContainer from './containers/ProductList/ProductListContainer';
import UploadProductContainer from './containers/UploadProduct/UploadProductContainer';
import { getProduct, getAutoComplete, getSearchProduct } from './api/product';

function App() {

  const [products, setProducts] = useState([]);
  const [inputTerm, setInputTerm] = useState("");
  const [autoComplete, setAutoComplete] = useState([]);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProduct();
        const fetchedProduct = response.data.products;

        // set current product
        if ( fetchedProduct.length > 0 ) {
          setProducts(fetchedProduct);
        };
        
      } catch (error) {
        console.log(error);
      };
    };

    fetchProduct();
  }, [toggle]);

  const fetchAutoCompleteData = async (value) => {
    try {
      const response = await getAutoComplete(value);
      const formatAutoComplete = response.data.map((item) => item.productName.toLowerCase());
      const uniqAutoComplete = formatAutoComplete.filter((item, index, arr) => arr.indexOf(item) === index);
      const fetchedAutoComplete = uniqAutoComplete.map((text) => text.trim().replace(/\s+/g, ' ').split(' ').join(' '));
      
      // set current autocomplete
      setAutoComplete(fetchedAutoComplete);

    } catch (err) {
      console.log(err);
    };
  };

  const fetchSearchData = async (value) => {
    try {
      if ( !value || value.trim() === '' ) {
        const response = await getProduct();
        const fetchedSearchProducts = response.data.products;

        // set current product
        setProducts(fetchedSearchProducts);
        
      } else {
        const response = await getSearchProduct(value);
        const fetchedSearchProducts = response.data.products;

        // set current search
        setProducts(fetchedSearchProducts);

      };

    } catch (err) {
      console.log(err);
    };
  };

  const handleChangeTerm = (event) => {
    const { value } = event.target;
    setInputTerm(value);
    fetchAutoCompleteData(value);
  };

  const handleSearchTerm = (event, searchTerm) => {
    event.preventDefault();

    setInputTerm(searchTerm);
    setAutoComplete([]);
    fetchSearchData(searchTerm);
  };

  const onToggle = () => {
    setToggle(!toggle);
    setInputTerm("");
    setAutoComplete([]);
  };

  return (
    <>
      <ProductListContainer 
        products={products}
        inputTerm={inputTerm}
        autoComplete={autoComplete}
        onChangeTerm={handleChangeTerm}
        onSearchTerm={handleSearchTerm}
      />
      <UploadProductContainer onToggle={onToggle} />
    </>
  );
};

export default App;
