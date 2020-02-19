import gql from "graphql-tag";

export const ME_QUERY = gql`
  query productsQuery {
    me {
      id
      firstName
    }
  }
`;
