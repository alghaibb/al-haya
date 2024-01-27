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
    id: ID!
  }

  type CartItem {
    product: Product!
    quantity: Int!
  }

  type WishlistItem {
    product: Product!
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
    cart(userId: ID!): [CartItem]
    wishlist(userId: ID!): [WishlistItem]
  }

  type Mutation {
    register(registerInput: RegisterInput): AuthPayload!
    login(loginInput: LoginInput): AuthPayload!
    logout(token: String!): String
    updateUser(_id: ID!, fullName: String, password: String): User
    deleteUser(_id: ID!): String
    addToCart(userId: ID!, productId: ID!, quantity: Int!): CartItem
    removeFromCart(userId: ID!, productId: ID!): CartItem
    clearCart(userId: ID!): Boolean
    addToWishlist(userId: ID!, productId: ID!): WishlistItem
    removeFromWishlist(userId: ID!, productId: ID!): WishlistItem
    clearWishlist(userId: ID!): Boolean
  }
`;

export default typeDefs;
