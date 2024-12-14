import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./assets/components/Navbar/navbar";
import ItemListContainer from "./assets/components/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./assets/components/ItemDetailContainer/ItemDetailContainer";
import CartPage from "./assets/components/CartPage/CartPage.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<ItemListContainer greeting="¡Bienvenido a nuestra tienda!" />} />
        <Route path="/category/:categoryId" element={<ItemListContainer />} />
        <Route path="/product/:productId" element={<ItemDetailContainer />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
      </Routes>
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
        theme="colored" 
      />
    </div>
  );
}

export default App;
