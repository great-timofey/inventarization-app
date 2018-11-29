//  @flow
import React from 'react';
import { Text, FlatList, View, ActivityIndicator } from 'react-native';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import styles from './styles';

const GET_REPOS_QUERY = gql`
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

const Items = ({ login }: { login: string }) => (
  <Query query={GET_REPOS_QUERY} variables={{ login }}>
    {({ loading, error, data }) => {
      if (loading) return <ActivityIndicator />;
      if (error) return <Text>Error!: {error}</Text>;

      return (
        <FlatList
          keyExtractor={item => item.node.id}
          data={data.user.repositories.edges}
          renderItem={({
            item: {
              node: {
                name,
                description,
                primaryLanguage: { name: languageName },
              },
            },
          }) => (
            <Text>
              {name} : {description} : {languageName}
            </Text>
          )}
        />
      );
    }}
  </Query>
);

type Props = {};
function ItemsScene(props: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.instructions}>ITEMS</Text>
      <Items login="great-timofey" />
    </View>
  );
}

export default ItemsScene;
