//  @flow
import gql from 'graphql-tag';

export const GET_COMPANY_CATEGORIES = gql`
  query GetCompanyCategories($companyId: ID!) {
    categories(companyId: $companyId){
      id
      name
      icon
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

export default {
  GET_COMPANY_CATEGORIES,
};
