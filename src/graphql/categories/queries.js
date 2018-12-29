//  @flow
import gql from 'graphql-tag';

export const GET_COMPANY_CATEGORIES_BY_ID = gql`
  query GetCompanyCategories($companyId: ID!) {
    categories(companyId: $companyId){
      id
      name
      icon
      chields{
        name
      }
    }
  }
`;

export const GET_COMPANY_CATEGORIES = gql`
  query GetCompanyCategories {
    current{
      id
      companies{
        categories{
          id
          name
          icon
          parent{
            id
          }
          chields{
            id
            name
          }
        }
      }
    }
  }
`;

export default {
  GET_COMPANY_CATEGORIES,
  GET_COMPANY_CATEGORIES_BY_ID,
};
