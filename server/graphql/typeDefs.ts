import gql from 'graphql-tag';

// Define the GraphQL schema using the GraphQL schema language
const typeDefs = gql`
  type User {
    _id: ID!
    fullName: String!
    email: String!
    password: String!
    isVerified: Boolean!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type RegistrationResult {
    message: String!
  }

  type VerifyEmailResponse {
    message: String!
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
    register(registerInput: RegisterInput): RegistrationResult!
    login(loginInput: LoginInput): AuthPayload!
    logout(token: String!): String
    updateUser(_id: ID!, fullName: String, password: String): User
    deleteUser(_id: ID!): String
    subscribeToNewsletter(email: String!): String
    verifyEmail(verificationToken: String!): VerifyEmailResponse
  }
`;

export default typeDefs;
