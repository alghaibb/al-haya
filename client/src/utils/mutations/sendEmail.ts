import { gql } from '@apollo/client';

export const SEND_EMAIL = gql`
  mutation Subscribe($email: String!) {
    subscribe(email: $email)
  }
`;