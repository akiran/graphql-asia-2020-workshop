import React from "react";
import { useQuery, useMutation, useSubscription } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Product from "./Product";

const PRODUCTS_QUERY = gql`
  query productsQuery {
    products {
      id
      name
      description
      price
    }
  }
`;

export default function Products() {
  const { loading, error, data } = useQuery(PRODUCTS_QUERY);
  if (loading) {
    return <div>loading...</div>;
  }
  return (
    <div>
      <h1>Products</h1>
      {data.products.map(product => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}
