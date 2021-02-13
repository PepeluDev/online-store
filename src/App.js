import React from "react";
// react router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// components
import Error from "./components/Error";
import Footer from "./components/footer/Footer";
import Home from "./components/pages/Home";
import LoginComponent from "./components/authentication/Login";
import Navbar from "./components/navbar/Navbar";
import Products from "./components/pages/Products";

import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/products" component={Products} />
          <Route path="/login" component={LoginComponent} />
          <Route path="*" component={Error} />
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
