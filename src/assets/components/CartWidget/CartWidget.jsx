import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../CartContext/CartContext"; 
import "./CartWidget.css";

const CartWidget = () => {
  const { cart } = useContext(CartContext); 

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="cart-widget">
      <Link to="/cart" className="cart-link">
        🛒 <span className="cart-count">{totalItems}</span>
      </Link>
    </div>
  );
};

export default CartWidget;
