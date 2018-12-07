//  @flow
import gql from 'graphql-tag';

export const SIGN_IN_MUTATION = gql`
  mutation SignInUser($email: String!, $password: String!) {
    signInUser(input: { email: $email, password: $password }) {
      message
      token
      user {
        id
        fullName
      }
    }
  }
`;

export const SIGN_UP_MUTATION = gql`
  mutation SignUpUser(
    $email: String!
    $password: String!
    $fullName: String!
    $phoneNumber: String
  ) {
    signUpUser(
      input: {
        email: $email
        password: $password
        fullName: $fullName
        phoneNumber: $phoneNumber
      }
    ) {
      message
      token
      user {
        id
        fullName
      }
    }
  }
`;

export const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword($email: String!) {
    resetPasswordForUser(email: $email) {
      message
    }
  }
`;

export const CREATE_COMPANY_MUTATION = gql`
  mutation CreateCompany(
    $name: String!
    $logo: Upload
    $inviters: [InviteAttr!]
  ) {
    createCompany(
      attributes: { name: $name, logo: $logo }
      inviters: $inviters
    ) {
      company {
        id
        name
      }
      invitations {
        id
        email
        role
      }
    }
  }
`;

export const SET_AUTH_MUTATION_CLIENT = gql`
  mutation setAuth($isAuthed: Boolean) {
    setAuth(isAuthed: $isAuthed) @client
  }
`;

export default {
  SIGN_IN_MUTATION,
  SIGN_UP_MUTATION,
  RESET_PASSWORD_MUTATION,
  SET_AUTH_MUTATION_CLIENT,
};
