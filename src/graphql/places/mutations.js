//  @flow
import gql from 'graphql-tag';

export const DESTROY_PLACE = gql`
  mutation DestroyPlace(
    $id: ID!
  ) {
    destroyPlace( id: $id )
  }
`;

export default {
  DESTROY_PLACE,
};
