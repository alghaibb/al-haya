import { gql } from '@apollo/client';

// Mutation for user registration
export const REGISTER_USER = gql`
  mutation register($fullName: String!, $email: String!, $password: String!, $confirmPassword: String!) {
    register(registerInput: {
      fullName: $fullName,
      email: $email,
      password: $password,
      confirmPassword: $confirmPassword
    }) {
      token
      user {
        _id
        fullName
        email
      }
    }
  }
`;

// Mutation for user login
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(loginInput: {
      email: $email,
      password: $password
    }) {
      token
      user {
        _id
        fullName
        email
      }
    }
  }
`;
