import { gql } from '@apollo/client';

// Query to fetch all users
export const GET_USERS = gql`
  query {
    getUsers {
      _id
      fullName
      email
    }
  }
`;

// Query to fetch a user by ID
export const GET_USER_BY_ID = gql`
  query getUserById($id: ID!) {
    getUserById(id: $id) {
      _id
      fullName
      email
    }
  }
`;
