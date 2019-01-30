//  @flow
import gql from 'graphql-tag';

export const GET_COMPANY_PLACES = gql`
  query GetCompanyPlaces($companyId: ID!) {
    places(companyId: $companyId){
      id
      name
      address
      assetsCount
    }
  }
`;

export default {
  GET_COMPANY_PLACES,
};
