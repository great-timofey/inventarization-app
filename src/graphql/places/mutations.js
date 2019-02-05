//  @flow
import gql from 'graphql-tag';

export const DESTROY_PLACE = gql`
  mutation DestroyPlace(
    $id: ID!
  ) {
    destroyPlace( id: $id )
  }
`;

export const CREATE_PLACE = gql`
  mutation CreatePlace(
    $companyId: ID!
    $name: String!
    $gps: GpsAttr
    $address: String
    $managerId: ID
  ) {
    createPlace(
      attributes: {
        companyId: $companyId
        name: $name
        gps: $gps
        address: $address
        managerId: $managerId
      }
    ) {
      id
      assetsCount
      company {
        id
        name
      }
      creator {
        id
        fullName
      }
      gps {
        lat
        lon
      }
      manager {
        id
        fullName
      }
      name
    }
  }
`;

export const UPDATE_PLACE = gql`
  mutation UpdatePlace(
    $companyId: ID!
    $name: String!
    $gps: GpsAttr
    $address: String
    $managerId: ID
  ) {
    updatePlace(
      attributes: {
        companyId: $companyId
        name: $name
        gps: $gps
        address: $address
        managerId: $managerId
      }
    ) {
      id
      assetsCount
      company {
        id
        name
      }
      creator {
        id
        fullName
      }
      gps {
        lat
        lon
      }
      manager {
        id
        fullName
      }
      name
    }
  }
`;

export default {
  CREATE_PLACE,
  UPDATE_PLACE,
  DESTROY_PLACE,
};
