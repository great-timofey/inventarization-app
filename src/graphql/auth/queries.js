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

export const GET_COMPANY_PLACES = gql`
  query GetCompanyPlaces($companyId: ID!) {
    places(companyId: $companyId) {
      id
      name
    }
  }
`;

export const GET_COMPANY_USERS_BY_ROLE = gql`
  query GetCompanyUserByRole($companyId: ID!, $role: Role!) {
    users(companyId: $companyId, role: $role) {
      id
      fullName
      phoneNumber
    }
  }
`;

export const GET_USER_AUTH_CLIENT = gql`
  query {
    isAuthed @client
  }
`;

export const GET_USER_ID_CLIENT = gql`
  query {
    id @client
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
  GET_USER_ID_CLIENT,
  GET_COMPANY_PLACES,
  GET_USER_AUTH_CLIENT,
  GET_COMPANY_USERS_BY_ROLE,
  GET_CURRENT_USER_COMPANIES,
  GET_CURRENT_USER_COMPANY_CLIENT,
};
