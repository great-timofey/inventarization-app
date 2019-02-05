//  @flow
import gql from 'graphql-tag';

export const GET_COMPANY_PLACES = gql`
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

export const GET_CURRENT_USER_PLACES = gql`
  query GetCurrentUserPlaces {
    current {
      id
      createdPlaces {
        id
        company {
          id
        }
      }
      responsiblePlaces {
        id
        company {
          id
        }
      }
    }
  }
`;

export default {
  GET_COMPANY_PLACES,
  GET_CURRENT_USER_PLACES,
};
