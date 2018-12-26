//  @flow
import gql from 'graphql-tag';

export const GET_COMPANY_ASSETS = gql`
  query GetCompanyAssets($companyId: ID!) {
    assets(companyId: $companyId){
      id
      name
      model
      status
      photos
      purchasePrice
      photosOfDamages
    }
  }
`;

export default {
  GET_COMPANY_ASSETS,
};
