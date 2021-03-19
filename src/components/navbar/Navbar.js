import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

//Components
//import Button from "../button/Button";

export default function Navbar({ CartDrawer, CartIcon }) {
  const [iconClick, setIconClick] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  //const [button, setButton] = useState(true);

  const handleClick = () => setIconClick(!iconClick);
  const closeMobileMenu = () => setIconClick(false);

  const handleCartClick = () => setCartOpen(!cartOpen);
  const closeCartDrawer = () => setCartOpen(false);

  // CartDrawer: came with context from dependency injection

  /* const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(true);
    } else {
      setButton(true);
    }
  };

  // Is it needed?
  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);
*/
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          Piece of Eight
        </Link>
        <div className="menu-icon" onClick={() => handleClick()}>
          <i className={iconClick ? "ri-close-fill" : "ri-menu-line"}></i>
        </div>

        <CartDrawer open={cartOpen} onClose={closeCartDrawer} />
        <ul className={iconClick ? "nav-menu active" : "nav-menu"}>
          <li>
            <Link
              to="/products"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              All Our Products
            </Link>
          </li>
          <li>
            <Link to="/login" className="nav-links" onClick={closeMobileMenu}>
              Login
            </Link>
          </li>
          <li>
            <div className="nav-links" onClick={handleCartClick}>
              <CartIcon />
            </div>
          </li>
        </ul>
        {/*button && <Button buttonStyle="btn--outline">SIGN UP</Button>*/}
      </div>
    </nav>
  );
}
