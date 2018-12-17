//  @flow

import { AsyncStorage } from 'react-native';

import { assoc } from 'ramda';
import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import DeviceInfo from 'react-native-device-info';
import { createUploadLink } from 'apollo-upload-client';
import { withClientState } from 'apollo-link-state';
import { persistCache } from 'apollo-cache-persist';
import { InMemoryCache } from 'apollo-cache-inmemory';
// $FlowFixMe
import Permissions from 'react-native-permissions';

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
    isAuthed: false,
    permissions: {
      camera: null,
      location: null,
      __typename: 'permissions',
    },
  },
  resolvers: {
    Mutation: {
      setAuth: async (_, { isAuthed }, { cache: innerCache }) => {
        await innerCache.writeData({ data: { isAuthed } });
        return null;
      },
      setInitialPermissions: async (_, __, { cache: innerCache }) => {
        const permissions = await Permissions.checkMultiple(['location', 'camera']);
        await innerCache.writeData({
          data: {
            permissions: {
              ...permissions,
              __typename: 'permissions',
            },
          },
        });
        return null;
      },
    },
    setPermission: async (_, { permission }, { cache: innerCache }) => {
      const { key, value } = permission;
      console.log(key, value);
      const { permissions } = innerCache;
      console.log(permissions);
      await innerCache.writeData({
        data: {
          permissions: assoc(key, value, permissions),
        },
      });
      return null;
    },
  },
  typeDefs: `
    type Query {
      isAuthed: Boolean
      permissions: Object
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

  return client;
}

export default getClient;
