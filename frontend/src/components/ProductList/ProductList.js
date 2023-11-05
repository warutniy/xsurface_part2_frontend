import React, { useContext } from 'react';
import styles from './ProductList.module.css';
import ProductCardContainer from '../../containers/ProductCard/ProductCardContainer';
import { ProductContext } from '../../contexts/ProductContext';

const ProductList = (props) => {

  const { inputTerm, 
          onChangeTerm, 
          onSearchTerm, 
          resetInputTerm,
          searchContainerStyle, 
          dropdownLineStyle } = props;

  const { products, autoComplete, term } = useContext(ProductContext);

  return (
    <div className={styles.wrapper}>
      <div className={styles.product_header}>
        <div className={styles.title}><h1>Product list</h1></div>
        <div className={styles.search_container} style={searchContainerStyle(inputTerm)}>
          <div className={styles.search_box}>
            <form onSubmit={(event) => onSearchTerm(event, inputTerm)}>
              <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.0089 12.0282C11.5878 12.4487 11.8702 12.9601 12.2595 13.41L13.7305 15.3484C14.2888 15.9954 15.0446 16.2673 15.6495 15.6632C16.2545 15.0592 16.0205 14.2664 15.3725 13.7089L13.4092 12.3078C12.9586 11.9191 12.4301 11.6077 12.0089 12.0282Z" fill="#BCBCC0"/>
                <path fillRule ="evenodd" clipRule ="evenodd" d="M13.4422 6.71084C13.4422 10.4171 10.4328 13.4217 6.72112 13.4217C3.00941 13.4217 0 10.4171 0 6.71084C0 3.0046 3.00941 0 6.72112 0C10.4328 0 13.4422 3.0046 13.4422 6.71084ZM11.762 6.71084C11.762 9.49057 9.50572 11.744 6.72112 11.744C3.93651 11.744 1.68028 9.49057 1.68028 6.71084C1.68028 3.93111 3.93651 1.67771 6.72112 1.67771C9.50572 1.67771 11.762 3.93111 11.762 6.71084Z" fill="#BCBCC0"/>
              </svg>
              <input 
                type='text' 
                placeholder='Name, Catalogue, Code' 
                value={inputTerm || ''}
                onChange={onChangeTerm}
              />
              {
                inputTerm 
                &&  <svg onClick={resetInputTerm} xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512">
                      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M368 368L144 144M368 144L144 368"/>
                    </svg>
              }
            </form>
          </div>
          <div className={styles.dropdown_line} style={dropdownLineStyle(autoComplete)}></div>
          <div className={styles.dropdown}>
            {autoComplete.map((item, index) => (
              <div key={index} className={styles.dropdown_row} onClick={(event) => onSearchTerm(event, item)}>
                <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.0089 12.0282C11.5878 12.4487 11.8702 12.9601 12.2595 13.41L13.7305 15.3484C14.2888 15.9954 15.0446 16.2673 15.6495 15.6632C16.2545 15.0592 16.0205 14.2664 15.3725 13.7089L13.4092 12.3078C12.9586 11.9191 12.4301 11.6077 12.0089 12.0282Z" fill="#BCBCC0"/>
                  <path fillRule ="evenodd" clipRule ="evenodd" d="M13.4422 6.71084C13.4422 10.4171 10.4328 13.4217 6.72112 13.4217C3.00941 13.4217 0 10.4171 0 6.71084C0 3.0046 3.00941 0 6.72112 0C10.4328 0 13.4422 3.0046 13.4422 6.71084ZM11.762 6.71084C11.762 9.49057 9.50572 11.744 6.72112 11.744C3.93651 11.744 1.68028 9.49057 1.68028 6.71084C1.68028 3.93111 3.93651 1.67771 6.72112 1.67771C9.50572 1.67771 11.762 3.93111 11.762 6.71084Z" fill="#BCBCC0"/>
                </svg>
                <div className={styles.row_detail}>{item}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      { 
        !products 
        ? <div className={styles.loading_container}>
            <div className={styles.loading}></div>
            <h2>Loading...</h2>
          </div> 
        : (
            term && products.length === 0 
            ? <div className={styles.loading_container}>
                <h2>Your search - <strong>{term}</strong> - did not match any items.</h2>
              </div> 
            : <ProductCardContainer 
                products={products}
              /> 
          )
      }
    </div>
  );
};

export default ProductList;