//  @flow
import gql from 'graphql-tag';

export const GET_CURRENT_USER = gql`
  query getCurrentUser {
    current {
      id
      fullName
      responsibleAssets {
        id
      }
    }
  }
`;

export default {
  GET_CURRENT_USER,
};
