import React from "react";
import "./App.css";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "./apolloClient";
import Products from "./Products";

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Products />
      </div>
    </ApolloProvider>
  );
}

export default App;
