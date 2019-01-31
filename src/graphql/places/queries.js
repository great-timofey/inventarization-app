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

export const GET_COMPANY_ASSETS_IN_PLACES = gql`
  query GetCompanyPlaces($companyId: ID!, $placeId: ID!) {
    places(companyId: $companyId, placeId: $placeId){
      assets {
        id
        name
        model
        status
        assessedValue
        purchasePrice
        category {
          id
        }
        codeData
        company {
          id
        }
        createdAt
        creator {
          id
          email
        }
        category {
          id
          name
        }
        assessedDate
        dateOfPurchase
        description
        gps {
          lat
          lon
        }
        place {
          id
          name
        }
        guaranteeExpires
        inventoryId
        manufacture
        onTheBalanceSheet
        photos {
          nodes {
            id
            photo
          }  
        }
        photosOfDamages {
          nodes {
            id
            photo
          }  
        }
        photosUrls
        photosOfDamagesUrls
        quantity
        responsible {
          id
          email
          fullName
        }
        status
      }  
    }
  }
`;

export default {
  GET_COMPANY_PLACES_BY_ID,
  GET_COMPANY_ASSETS_IN_PLACES,
};
