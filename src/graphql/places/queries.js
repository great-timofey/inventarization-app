//  @flow
import gql from 'graphql-tag';

export const GET_COMPANY_PLACES_BY_ID = gql`
  query GetCompanyPlaces($companyId: ID!) {
    places(companyId: $companyId){
      id
      name
      address
      assetsCount
      gps {
        lat,
        lon
      }
    }
  }
`;

export default {
  GET_COMPANY_PLACES_BY_ID,
};
