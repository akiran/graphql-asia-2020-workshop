import React from "react";
import "./App.css";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "./apolloClient";
import Products from "./Products";
import { Container } from "reactstrap";

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Container>
          <Products />
        </Container>
      </div>
    </ApolloProvider>
  );
}

export default App;
