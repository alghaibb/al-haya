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

  type Query {
    getUsers: [User]
    getUserById(id: ID!): User
  }

  type Mutation {
    register(registerInput: RegisterInput): AuthPayload!
    login(loginInput: LoginInput): AuthPayload!
    updateUser(_id: ID!, fullName: String, password: String): User
    deleteUser(_id: ID!): String
  }
`;

export default typeDefs;
