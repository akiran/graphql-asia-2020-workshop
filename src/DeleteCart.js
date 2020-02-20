import React from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Button } from "reactstrap";
import { CART_QUERY } from "./queries";

const DELETE_CART_MUTATION = gql`
  mutation deleteCartItem($input: DeleteCartItemInput!) {
    deleteCartItem(input: $input)
  }
`;

export default function DeleteCartItem({ cartItem }) {
  const [deleteCart] = useMutation(DELETE_CART_MUTATION, {
    refetchQueries: [{ query: CART_QUERY }],
    onCompleted: () => null,
    onError: () => null
  });
  return (
    <div>
      <Button
        className="my-4"
        onClick={() =>
          deleteCart({ variables: { input: { id: cartItem.id } } })
        }
      >
        Delete
      </Button>
    </div>
  );
}
