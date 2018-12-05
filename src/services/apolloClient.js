//  @flow
import { AsyncStorage } from 'react-native';

import gql from 'graphql-tag';
import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import { withClientState } from 'apollo-link-state';
import { persistCache } from 'apollo-cache-persist';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { SIGN_IN_MUTATION_CLIENT } from 'graphql/auth/mutations';
import { inventoryApiUrl } from 'global/constants';

const cache = new InMemoryCache();

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
  cache,
  defaults: {
    isAuthed: false,
  },
  resolvers: {
    Mutation: {
      loginUser: async (_, { isAuthed }, { cache }) => {
        await cache.writeData({ data: { isAuthed } });
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

persistCache({
  cache,
  debug: true,
  maxSize: false,
  trigger: 'background',
  storage: AsyncStorage,
});

console.log(cache);

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([stateLink, authLink.concat(httpLink)]),
});

export default client;
