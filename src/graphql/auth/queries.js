//  @flow
import gql from 'graphql-tag';


export const GET_CURRENT_USER_ROLE = gql`
  query getCurrentUser {
    current{
      id
      userCompanies{
        id
        role
        createdAt
      }
    }
  }
`;

export const GET_CURRENT_USER_CREATED_ASSETS = gql`
  query getCurrentUser {
    current{
      id
      createdAssets{
        id
      }
    }
  }
`;

export const GET_CURRENT_COMPANY_ASSETS = gql`
query getAssetsFilter(
  $companyId: ID
) {
  assets(
    companyId: $companyId
  ) {
    creator{
        id
      }
      gps
      id
      name
      purchasePrice
    }
  }
`;


export default {
  GET_CURRENT_USER_ROLE,
  GET_CURRENT_COMPANY_ASSETS,
  GET_CURRENT_USER_CREATED_ASSETS,
};
