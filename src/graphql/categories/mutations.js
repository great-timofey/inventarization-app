//  @flow
import gql from 'graphql-tag';

export const CREATE_CATEGORY = gql`
  mutation CreateCategory(
    $parentId: ID
    $companyId: ID
    $name: String!
    $icon: String!
  ) {
    createCategory(
      attributes: {
        name: $name
        icon: $icon
        parentId: $parentId
        companyId: $companyId
      }
    ) {
    id
    name
    icon
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory(
    $id: ID!
    $name: String
    $icon: String
  ) {
    updateCategory(
      id: $id,
      attributes: {
        name: $name
        icon: $icon
      }
    ) {
    id
    name
    icon
    }
  }
`;

export const DESTROY_CATEGORY = gql`
  mutation DestroyCategory(
    $id: ID!
  ) {
    destroyCategory( id: $id, )
  }
`;

export default {
  UPDATE_CATEGORY,
  DESTROY_CATEGORY,
};
