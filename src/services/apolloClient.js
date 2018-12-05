//  @flow
import { AsyncStorage } from 'react-native';
import ApolloClient from 'apollo-client';
import { withClientState } from 'apollo-link-state';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { inventoryApiUrl } from 'global/constants';

const httpLink = createHttpLink({
  uri: inventoryApiUrl,
});

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem('token');
  return {
    headers: {
      ...headers,
      device: 'abc',
      authorization: token || '',
    },
  };
});

const stateLink = withClientState({
  defaults: {
    isAuthed: false,
  },
  resolvers: {
    Mutation: {
      loginUser: (_, { isAuthed }, { cache }) => {
        cache.writeData({ data: { isAuthed } });
        return null;
      },
    },
  },
  typeDefs: `
    type Query {
      isAuthed: Boolean
    }
  `,
});

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([stateLink, authLink.concat(httpLink)]),
});

export default apolloClient;
