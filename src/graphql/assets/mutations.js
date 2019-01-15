//  @flow
import gql from 'graphql-tag';

export const CREATE_ASSET = gql`
  mutation CreateAsset(
    $name: String!
    $description: String
    $purchasePrice: Float
    $dateOfPurchase: String
    $assessedValue: Float
    $assessedDate: String
    $guaranteeExpires: String
    $gps: GpsAttr!
    $inventoryId: String!
    $codeData: String
    $manufacture: String
    $model: String
    $quantity: Int
    $categoryId: ID
    $placeId: ID
    $companyId: ID
    $responsibleId: ID
    $status: AssetStatus
    $onTheBalanceSheet: Boolean
  ) {
    createAsset(
      attributes: {
        name: $name
        description: $description
        purchasePrice: $purchasePrice
        dateOfPurchase: $dateOfPurchase
        assessedValue: $assessedValue
        assessedDate: $assessedDate
        guaranteeExpires: $guaranteeExpires
        gps: $gps
        inventoryId: $inventoryId
        codeData: $codeData
        manufacture: $manufacture
        model: $model
        quantity: $quantity
        categoryId: $categoryId
        placeId: $placeId
        companyId: $companyId
        responsibleId: $responsibleId
        status: $status
        onTheBalanceSheet: $onTheBalanceSheet
      }
    ) {
      id
      codeData
      company {
        id
      }
      assessedValue
      createdAt
      creator {
        id
        email
      }
      dateOfPurchase
      description
      gps {
        lat
        lon
      }
      assessedDate
      place {
        id
        name
      }
      guaranteeExpires
      inventoryId
      manufacture
      model
      name
      onTheBalanceSheet
      purchasePrice
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

export const UPDATE_ASSET = gql`
  mutation UpdateAsset(
    $id: ID!
    $name: String!
    $description: String
    $purchasePrice: Float
    $dateOfPurchase: String
    $assessedValue: Float
    $assessedDate: String
    $guaranteeExpires: String
    $gps: GpsAttr!
    $manufacture: String
    $model: String
    $quantity: Int
    $categoryId: ID
    $placeId: ID
    $responsibleId: ID
    $status: AssetStatus
    $onTheBalanceSheet: Boolean
  ) {
    updateAsset(
      id: $id
      attributes: {
        name: $name
        description: $description
        purchasePrice: $purchasePrice
        dateOfPurchase: $dateOfPurchase
        assessedValue: $assessedValue
        assessedDate: $assessedDate
        guaranteeExpires: $guaranteeExpires
        gps: $gps
        manufacture: $manufacture
        model: $model
        quantity: $quantity
        categoryId: $categoryId
        placeId: $placeId
        responsibleId: $responsibleId
        status: $status
        onTheBalanceSheet: $onTheBalanceSheet
      }
    ) {
      id
      codeData
      company {
        id
      }
      createdAt
      creator {
        id
        email
      }
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
      assessedDate
      assessedValue
      id
      manufacture
      model
      name
      onTheBalanceSheet
      purchasePrice
      quantity
      responsible {
        id
        email
      }
      status
    }
  }
`;

export const DESTROY_ASSET = gql`
  mutation DestroyAsset($id: ID!) {
    destroyAsset(id: $id)
  }
`;

export default {
  CREATE_ASSET,
  UPDATE_ASSET,
  DESTROY_ASSET,
};
