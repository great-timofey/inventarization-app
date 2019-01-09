//  @flow

import { AsyncStorage } from 'react-native';

import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import DeviceInfo from 'react-native-device-info';
import { createUploadLink } from 'apollo-upload-client';
import { withClientState } from 'apollo-link-state';
import { persistCache } from 'apollo-cache-persist';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { inventoryApiUrl } from '~/global/constants';

const cache = new InMemoryCache();

const httpLink = createUploadLink({
  uri: inventoryApiUrl,
});

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem('token');
  return {
    headers: {
      ...headers,
      device: DeviceInfo.getUniqueID(),
      authorization: token || '',
    },
  };
});

const stateLink = withClientState({
  cache,
  defaults: {
    id: '',
    userCompany: '',
    isAuthed: false,
    categoryOrder: [],
  },
  resolvers: {
    Mutation: {
      setAuth: async (_, { isAuthed }, { cache: innerCache }) => {
        await innerCache.writeData({ data: { isAuthed } });
        return null;
      },
      setUserCompany: async (_, { userCompany }, { cache: innerCache }) => {
        await innerCache.writeData({ data: { userCompany } });
        return null;
      },
      setUserId: async (_, { id }, { cache: innerCache }) => {
        await innerCache.writeData({ data: { id } });
        return null;
      },
      setCategoryOrder: async (_, { categoryOrder }, { cache: innerCache }) => {
        await innerCache.writeData({ data: { categoryOrder } });
        return null;
      },
    },
  },
  typeDefs: `
    type Query {
      id: ID
      isAuthed: Boolean
      categoryOrder: Array
      userCompany: {
        id: ID
        role: Role
        company: Company
        __typename: UserCompany 
      }
    }
  `,
});

async function getClient() {
  await persistCache({
    cache,
    debug: true,
    maxSize: false,
    storage: AsyncStorage,
  });

  const client = new ApolloClient({
    cache,
    link: ApolloLink.from([stateLink, authLink.concat(httpLink)]),
  });

  client.onResetStore(stateLink.writeDefaults);

  return client;
}

export default getClient;
