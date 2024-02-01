import gql from 'graphql-tag';

// Define the GraphQL schema using the GraphQL schema language
const typeDefs = gql`
  type User {
    _id: ID!
    fullName: String!
    email: String!
    password: String!
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

  input ContactInput {
    fullName: String!
    email: String!
    subject: String!
    message: String!
  }

  type ContactResponse {
    success: Boolean!
    message: String!
  }

  type Query {
    getUsers: [User]
    getUserById(id: ID!): User
  }

  type Mutation {
    register(registerInput: RegisterInput): AuthPayload!
    login(loginInput: LoginInput): AuthPayload!
    logout(token: String!): String
    updateUser(_id: ID!, fullName: String, password: String): User
    deleteUser(_id: ID!): String
  }

  extend type Mutation {
    sendContactMessage(contactInput: ContactInput!): ContactResponse!
  }
`;

export default typeDefs;
