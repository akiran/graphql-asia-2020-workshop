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
    // refetchQueries: [{ query: CART_QUERY }],
    optimisticResponse: {
      __typename: "Mutation",
      deleteCartItem: cartItem.id
    },
    update: (cache, { data: { deleteCartItem } }) => {
      console.log("update", deleteCartItem);
      const { cartItems } = cache.readQuery({ query: CART_QUERY });
      cache.writeQuery({
        query: CART_QUERY,
        data: { cartItems: cartItems.filter(c => c.id !== deleteCartItem) }
      });
    },
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
