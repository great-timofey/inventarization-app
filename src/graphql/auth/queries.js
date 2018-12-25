//  @flow
import gql from 'graphql-tag';

export const GET_CURRENT_USER_COMPANIES = gql`
  query GetCurrentUserCompanies {
    current {
      id
      userCompanies {
        id
        role
        createdAt
        company {
          name
        }
      }
    }
  }
`;

export const GET_USER_AUTH_CLIENT = gql`
  query {
    isAuthed @client
  }
`;

export const GET_CURRENT_USER_COMPANY_CLIENT = gql`
  query {
    userCompany @client {
      id
      role
      company {
        name
      }
    }
  }
`;

export default {
  GET_USER_AUTH_CLIENT,
  GET_CURRENT_USER_COMPANIES,
  GET_CURRENT_USER_COMPANY_CLIENT,
};
