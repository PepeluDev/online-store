import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

import "./Navbar.css";

export default function NavbarComponent({ CartDrawer, CartIcon }) {
  // Cart stuff
  const [cartOpen, setCartOpen] = useState(false);
  const handleCartClick = () => setCartOpen(!cartOpen);
  const closeCartDrawer = () => setCartOpen(false);

  // fixed="top" prop maked the navbar to be over the content
  // sticky="top" seems to be more suitable

  return (
    <>
      <Navbar sticky="top" expand="sm" bg="dark" variant="dark">
        <CartDrawer open={cartOpen} onClose={closeCartDrawer} />
        <Container>
          <Navbar.Brand className="navbar-logo" href="/">
            Piece of eight
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/products" className="navigation-item">
                Our products
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link className="navigation-item" onClick={handleCartClick}>
                <CartIcon />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
