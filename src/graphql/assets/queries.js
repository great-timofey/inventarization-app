//  @flow
import gql from 'graphql-tag';

export const GET_COMPANY_ASSETS = gql`
  query GetCompanyAssets($companyId: ID!) {
    assets(companyId: $companyId) {
      id
      name
      model
      status
      photos
      assessedValue
      purchasePrice
      purchasePrice
      photosOfDamages
      codeData
      company {
        id
      }
      createdAt
      creator {
        id
        email
      }
      assessedDate
      dateOfPurchase
      description
      gps
      guaranteeExpires
      inventoryId
      manufacture
      onTheBalanceSheet
      quantity
      responsible {
        id
        email
        fullName
      }
      status
    }
  }
`;

export const GET_COMPANY_ASSETS_RESPONSIBLES = gql`
  query GetCompanyAssets($companyId: ID!) {
    assets(companyId: $companyId) {
      id
      responsible {
        id
      }
      creator {
        id
      }
      status
    }
  }
`;

export default {
  GET_COMPANY_ASSETS,
  GET_COMPANY_ASSETS_RESPONSIBLES,
};
