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

  type Comment {
    id: Int!
    text: String
    author: User
  }

  type Product {
    id: Int!
    name: String!
    description: String
    price: Float!
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

  type Mutation {
    signup(input: SignupInput!): Boolean
    login(input: LoginInput!): Boolean
    logout: Boolean
  }

  type Query {
    ping: Boolean
    me: User
    products: [Product]
    product(id: Int!): Product
  }
`;

export default typeDefs;
