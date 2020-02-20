import React from "react";
import { Card, CardText, CardBody, CardTitle, Button } from "reactstrap";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import { CART_QUERY } from "./queries";

const ADD_TO_CART_MUTATION = gql`
  mutation addToCartMutation($input: AddToCartInput!) {
    addToCart(input: $input) {
      id
    }
  }
`;

export default function Product({ product }) {
  console.log(product);
  const history = useHistory();
  const [addToCart, { error: addToCartError }] = useMutation(
    ADD_TO_CART_MUTATION,
    {
      refetchQueries: [{ query: CART_QUERY }],
      onCompleted: () => history.push("/cart"),
      onError: () => null
    }
  );
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle>
            <h1 className="display-5">{product.name}</h1>
          </CardTitle>
          <CardText>{product.description}</CardText>
          <CardText>${product.price}</CardText>
          <Button
            color="primary"
            onClick={() =>
              addToCart({ variables: { input: { productId: product.id } } })
            }
          >
            Add to cart
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}
