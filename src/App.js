import React from "react";
// react router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// components
import Error from "./components/Error";
import Home from "./components/pages/Home";
import LoginComponent from "./components/authentication/Login";
import Navbar from "./components/navbar/Navbar";

import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          {/*<Route path="/art" component={ProductList} />
          <Route path="/tees" component={ProductList} />*/}
          <Route path="/login" component={LoginComponent} />
          <Route path="*" component={Error} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
