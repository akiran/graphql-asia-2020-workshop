import gql from "graphql-tag";

export const ME_QUERY = gql`
  query productsQuery {
    me {
      id
      firstName
    }
  }
`;

export const CART_QUERY = gql`
  query cartQuery {
    cartItems {
      id
      product {
        id
        name
        price
      }
      quantity
    }
  }
`;

export const ORDERS_QUERY = gql`
  query ordersQuery {
    orders {
      id
      product {
        id
        name
        price
      }
      quantity
      status
    }
  }
`;
