import CartWidget from '../CartWidget/CartWidget'
import './navbar.css'


function NavBar() {
  return (
    <nav className="navbar">
      <h1 className="navbar-title"></h1>
      <ul className="navbar-menu">
        <li><a href="#home">Inicio</a></li>
        <li><a href="#about">Sobre Nosotros</a></li>
        <li><a href="#shop">Tienda</a></li>
        <li><a href="#contact">Contacto</a></li>
        <li>
          <a href="#cartwidget" className="cart-link">
            <CartWidget />
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
