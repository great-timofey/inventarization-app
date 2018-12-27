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
    $codeData: String
    $manufacture: String
    $model: String
    $quantity: Int
    $categoryId: ID
    $placeId: ID
    $companyId: ID
    $photos: [Upload!]
    $photosOfDamages: [Upload!]
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
        photos: $photos
        photosOfDamages: $photosOfDamages
        responsibleId: $responsibleId
        status: $status
        onTheBalanceSheet: $onTheBalanceSheet
      }
    ) {
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
      gps
      guaranteeExpires
      id
      inventoryId
      manufacture
      model
      name
      onTheBalanceSheet
      photos
      photosOfDamages
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

export default {
  CREATE_ASSET,
};
