import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

//Components
import Button from "../button/Button";

export default function Navbar() {
  const [iconClick, setIconClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setIconClick(!iconClick);
  const closeMobileMenu = () => setIconClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  // Is it needed?
  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            Piece of Eight
          </Link>
          <div className="menu-icon" onClick={() => handleClick()}>
            <i className={iconClick ? "ri-close-fill" : "ri-menu-line"}></i>
          </div>
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
              <Link
                to="/login"
                className="nav-links-mobile"
                onClick={closeMobileMenu}
              >
                Login
              </Link>
            </li>
          </ul>
          {button && <Button buttonStyle="btn--outline">SIGN UP</Button>}
        </div>
      </nav>
    </>
  );
}
