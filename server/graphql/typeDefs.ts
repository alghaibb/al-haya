import gql from 'graphql-tag';

// Define the GraphQL schema using the GraphQL schema language
const typeDefs = gql`
  type User {
    _id: ID!
    fullName: String!
    email: String!
    password: String!
  }

  type Product {
    _id: ID!
    name: String!
    description: String
    price: Float!
    image: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  input RegisterInput {
    fullName: String!
    email: String!
    password: String!
    confirmPassword: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Query {
    getUsers: [User]
    getUserById(id: ID!): User
    getProducts: [Product]
    getProductById(id: ID!): Product
  }

  type Mutation {
    register(registerInput: RegisterInput): AuthPayload!
    login(loginInput: LoginInput): AuthPayload!
    logout(token: String!): String
    updateUser(_id: ID!, fullName: String, password: String): User
    deleteUser(_id: ID!): String
    addProduct(name: String!, description: String, price: Float!, image: String!): Product
    deleteProduct(id: ID!): String
  }
`;

export default typeDefs;
