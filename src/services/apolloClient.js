//  @flow
import { AsyncStorage } from 'react-native';
import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

import {
  inventoryApiUrl /*  githubApiUrl, githubToken */,
} from 'global/constants';

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

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  clientState: {
    defaults: {
      isAuthed: false,
    },
    resolvers: {},
    typeDefs: `
      type Query {
        isAuthed: boolean
      }
    `,
  },
});

export default apolloClient;
