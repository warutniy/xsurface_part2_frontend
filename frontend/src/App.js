import React, { useState, useEffect} from 'react';
import ProductListContainer from './containers/ProductList/ProductListContainer';
import UploadProductContainer from './containers/UploadProduct/UploadProductContainer';
import { getProduct } from './api/product';

function App() {

  const [products, setProducts] = useState([]);
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

  const onToggle = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <ProductListContainer products={products} />
      <UploadProductContainer onToggle={onToggle} />
    </>
  );
};

export default App;
