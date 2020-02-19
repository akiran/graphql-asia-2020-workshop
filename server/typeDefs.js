import { gql } from "apollo-server-express";

const typeDefs = gql`
  enum Role {
    ADMIN
    REVIEWER
    USER
    UNKNOWN
  }

  directive @auth(requires: Role = ADMIN) on OBJECT | FIELD_DEFINITION

  type User {
    id: Int!
    email: String
    firstName: String
    lastName: String
    fullName: String
    role: Role
  }

  type Product {
    id: Int!
    name: String!
    description: String
    price: Float!
  }

  type CartItem {
    id: Int!
    user: User!
    product: Product!
    quantity: Int!
  }

  type Order {
    id: Int!
    user: User!
    product: Product!
    quantity: Int!
  }

  input SignupInput {
    email: String!
    password: String!
    firstName: String
    lastName: String
    role: Role
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input AddToCartInput {
    productId: Int!
    quantity: Int
  }

  type Mutation {
    signup(input: SignupInput!): Boolean
    login(input: LoginInput!): Boolean
    logout: Boolean
    addToCart(input: AddToCartInput!): CartItem
    emptyCart: Boolean
    placeOrder: [Order]
  }

  type Query {
    ping: Boolean
    me: User
    products: [Product]
    product(id: Int!): Product
    cartItems: [CartItem]
    orders: [Order]
  }
`;

export default typeDefs;
