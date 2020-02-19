import React from "react";
import "./App.css";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "./apolloClient";
import Header from "./Header";
import Products from "./Products";
import Login from "./Login";
import Cart from "./Cart";
import Orders from "./Orders";
import { Container } from "reactstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Header />
          <Container>
            <Switch>
              <Route exact path="/">
                <Products />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/cart">
                <Cart />
              </Route>
              <Route exact path="/orders">
                <Orders />
              </Route>
            </Switch>
          </Container>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
