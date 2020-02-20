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
    id: ID!
    email: String
    firstName: String
    lastName: String
    fullName: String
    role: Role
  }

  type Product {
    id: ID!
    name: String!
    description: String
    price: Float!
  }

  type CartItem {
    id: ID!
    user: User!
    product: Product!
    quantity: Int!
  }

  type Order {
    id: ID!
    user: User!
    product: Product!
    quantity: Int!
    status: String!
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
    productId: ID!
    quantity: Int
  }

  input UpdateOrderStatusInput {
    id: ID!
    status: String
  }

  type Mutation {
    signup(input: SignupInput!): String
    login(input: LoginInput!): String
    logout: Boolean
    addToCart(input: AddToCartInput!): CartItem
    emptyCart: Boolean
    placeOrder: [Order]
    updateOrderStatus(input: UpdateOrderStatusInput!): Order
  }

  type Query {
    ping: Boolean
    me: User
    products: [Product]
    product(id: ID!): Product
    cartItems: [CartItem]
    orders: [Order]
  }

  type Subscription {
    onOrderStatusChange(id: ID!): Order
  }
`;

export default typeDefs;
