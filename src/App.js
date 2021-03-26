import React, { Component } from "react";
// react router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// axios
import axios from "axios";
// components
import CartIcon from "./components/cart/CartIcon";
import CartDrawer from "./components/cart/CartDrawer";
import Error from "./components/Error";
import Footer from "./components/footer/Footer";
import Home from "./components/pages/Home";
import LoginComponent from "./components/authentication/Login";
import Navbar from "./components/navbar/Navbar";
import Products from "./components/pages/Products";
// context
import Context from "./context/Context";
import withContext from "./context/withContext";
// components that need context for component injection
import { AllCards, TopCards } from "./components/cards/Cards";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      cart: {},
      products: [],
    };
    this.routeRef = React.createRef();
  }

  async componentDidMount() {
    //let user = localStorage.getItem("user");
    //user = user ? JSON.parse(user) : null;
    //this.setState({ user });
    let cart = localStorage.getItem("cart");
    cart = cart ? JSON.parse(cart) : {};
    const products = await axios.get("/products");
    this.setState({ products: products.data, cart });
  }

  // Cart management methods
  addToCart = (cartItem) => {
    let cart = this.state.cart;
    let indexId = cartItem.id;
    // to handle sizes as different cart items
    if (cartItem.size !== "no-size") {
      indexId = indexId + cartItem.size;
    }
    if (cart[indexId]) {
      cart[indexId].amount++;
    } else {
      cart[indexId] = cartItem;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  };

  removeFromCart = (cartItemId) => {
    let cart = this.state.cart;
    if (cart[cartItemId].amount > 1) {
      cart[cartItemId].amount--;
    } else {
      delete cart[cartItemId];
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  };

  clearCart = () => {
    let cart = {};
    localStorage.removeItem("cart");
    this.setState({ cart });
  };

  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          addToCart: this.addToCart,
          removeFromCart: this.removeFromCart,
          clearCart: this.clearCart,
        }}
      >
        <Router>
          <Navbar
            CartDrawer={withContext(CartDrawer)}
            CartIcon={withContext(CartIcon)}
          />
          <Switch>
            <Route
              path="/"
              exact
              component={() => <Home TopCards={withContext(TopCards)} />}
            />
            <Route
              path="/products"
              component={() => <Products AllCards={withContext(AllCards)} />}
            />
            <Route path="/login" component={LoginComponent} />
            <Route path="*" component={Error} />
          </Switch>
          <Footer />
        </Router>
      </Context.Provider>
    );
  }
}

export default App;
