import React, { Component } from "react";
// react router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// axios
import axios from "axios";
// components
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
    const products = await axios.get("http://localhost:3001/products");
    this.setState({ products: products.data });
  }

  render() {
    return (
      <Context.Provider value={{ ...this.state }}>
        <Router>
          <Navbar />
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
