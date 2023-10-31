import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductContext from './contexts/ProductContext';
import LandingPage from './pages/LandingPage/LandingPage';
import ProductDetailPage from './pages/ProductDetailPage/ProductDetailPage';

function App() {

  return (
    <ProductContext>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/product_detail" element={<ProductDetailPage />} />
        </Routes>
      </BrowserRouter>
    </ProductContext>
  );
};

export default App;
