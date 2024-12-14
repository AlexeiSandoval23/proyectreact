import React from "react";
import { Link } from "react-router-dom";
import CartWidget from "../CartWidget/CartWidget";
import "./navbar.css"; 

const NavBar = () => {
  return (
    <nav className="navbar">
      <h1 className="navbar-title">Mi E-Commerce</h1>
      <ul className="navbar-menu">
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/category/electronica">Electrónica</Link>
        </li>
        <li>
          <Link to="/category/ropa">Ropa</Link>
        </li>
        <li>
          <Link to="/category/hogar">Hogar</Link>
        </li>
      </ul>
      <CartWidget cartCount={0} />
    </nav>
  );
};

export default NavBar;

