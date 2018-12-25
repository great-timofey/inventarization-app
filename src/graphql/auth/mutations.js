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
      input: { email: $email, password: $password, fullName: $fullName, phoneNumber: $phoneNumber }
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
  mutation CreateCompany($name: String!, $logo: Upload, $inviters: [InviteAttr!]) {
    createCompany(attributes: { name: $name, logo: $logo }, inviters: $inviters) {
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
  mutation SetAuth($isAuthed: Boolean!) {
    setAuth(isAuthed: $isAuthed) @client
  }
`;

export const SET_USER_COMPANY_MUTATION_CLIENT = gql`
  mutation SetUserCompany($userCompany: UserCompany!) {
    setUserCompany(userCompany: $userCompany) @client 
  }
`;

export const LOG_OUT = gql`
  mutation LogOutUser {
    logOutUser {
      message
    } 
  }
`;

export default {
  LOG_OUT,
  SIGN_IN_MUTATION,
  SIGN_UP_MUTATION,
  RESET_PASSWORD_MUTATION,
  SET_AUTH_MUTATION_CLIENT,
  SET_USER_COMPANY_MUTATION_CLIENT,
};
