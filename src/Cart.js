import React from "react";
import { useQuery, useMutation, useSubscription } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useHistory } from "react-router-dom";
import { Card, CardText, CardBody, CardTitle, Button } from "reactstrap";
import { ORDERS_QUERY, CART_QUERY } from "./queries";

const PLACE_ORDER_MUTATION = gql`
  mutation {
    placeOrder {
      id
    }
  }
`;

export function CartItem({ cartItem }) {
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle>
            <h1 className="display-5">{cartItem.product.name}</h1>
          </CardTitle>
          <CardText>
            ${cartItem.product.price} x {cartItem.quantity}{" "}
          </CardText>
          <CardText>
            Total: ${cartItem.product.price * cartItem.quantity}
          </CardText>
        </CardBody>
      </Card>
    </div>
  );
}

export default function Products() {
  const history = useHistory();
  const [placeOrder, { error: placeOrderError }] = useMutation(
    PLACE_ORDER_MUTATION,
    {
      refetchQueries: [{ query: ORDERS_QUERY }],
      onCompleted: () => history.push("/orders"),
      onError: () => null
    }
  );
  const { loading, error, data } = useQuery(CART_QUERY);
  if (loading) {
    return <div>loading...</div>;
  }
  if (data.cartItems.length === 0) {
    return <h1>Cart is empty</h1>;
  }
  return (
    <div>
      <h1>Cart</h1>
      {data.cartItems.map(cartItem => (
        <CartItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <Button color="primary" className="my-4" onClick={placeOrder}>
        Place Order
      </Button>
    </div>
  );
}
