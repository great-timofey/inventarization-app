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

export default {
  GET_COMPANY_CATEGORIES,
};
