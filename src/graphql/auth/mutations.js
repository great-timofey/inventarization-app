//  @flow
import gql from 'graphql-tag';

export const SIGN_IN_MUTATION = gql`
  mutation SignInUser($email: String!, $password: String!) {
    signInUser(input: { email: $email, password: $password }) {
      message
      token
    }
  }
`;

export default {
  SIGN_IN_MUTATION,
};
