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
    $inventoryId: String
    $photos: [Upload!]
    $photosOfDamages: [Upload!]
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
      photos: $photos
      photosOfDamages: $photosOfDamages
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
      category {
        id
        name
      }
      guaranteeExpires
      inventoryId
      manufacture
      model
      name
      photosUrls
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
      photosOfDamagesUrls
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
    $name: String
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
    $inventoryId: String
    $placeId: ID
    $responsibleId: ID
    $status: AssetStatus
    $onTheBalanceSheet: Boolean
  ) {
    updateAsset(
      id: $id
      attributes: {
        name: $name
        inventoryId: $inventoryId
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
      category {
        id
        name
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
      inventoryId
      manufacture
      model
      name
      photosUrls
      photosOfDamagesUrls
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

export const REMOVE_ASSET_PHOTOS = gql`
  mutation RemoveAssetsPhotos($assetId: ID!, $photoIds: [ID!]!) {
    removePhotosFromAssets(assetId: $assetId, photoIds: $photoIds){
      message
    }
  }
`;

export const ADD_PHOTOS_TO_ASSET = gql`
  mutation AddPhotosToAssets($assetId: ID!, $photos: [Upload!], $photosOfDamages: [Upload!]) {
    addPhotosToAssets(assetId: $assetId, photos: $photos, photosOfDamages: $photosOfDamages){
      message
    }
  }
`;

export const SET_CREATED_ASSETS_COUNT_CLIENT = gql`
  mutation SetCreatedAssetsCount($createdAssetsCount: Int!) {
    setCreatedAssetsCount(createdAssetsCount: $createdAssetsCount) @client 
  }
`;

export default {
  CREATE_ASSET,
  UPDATE_ASSET,
  DESTROY_ASSET,
  REMOVE_ASSET_PHOTOS,
  ADD_PHOTOS_TO_ASSET,
  SET_CREATED_ASSETS_COUNT_CLIENT,
};
