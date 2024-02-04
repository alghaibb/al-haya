import { gql } from '@apollo/client';

export const SEND_EMAIL = gql`
  mutation SubscribeToNewsletter($email: String!) {
    subscribeToNewsletter(email: $email)
  }
`;