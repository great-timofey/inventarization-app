//  @flow
import gql from 'graphql-tag';

export const GET_REPOS_QUERY = gql`
  query myQuery($login: String!) {
    user(login: $login) {
      id
      url
      login
      repositories(first: 3) {
        edges {
          node {
            id
            name
            description
            primaryLanguage {
              name
            }
          }
        }
      }
    }
  }
`;

export default {
  GET_REPOS_QUERY,
};
