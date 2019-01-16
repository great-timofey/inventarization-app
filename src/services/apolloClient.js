//  @flow

import { AsyncStorage } from 'react-native';
// $FlowFixMe
import { without, intersection } from 'ramda';
import { ApolloLink } from 'apollo-link';
import ApolloClient from 'apollo-client';
import { setContext } from 'apollo-link-context';
import DeviceInfo from 'react-native-device-info';
import { createUploadLink } from 'apollo-upload-client';
import { withClientState } from 'apollo-link-state';
import { persistCache } from 'apollo-cache-persist';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { inventoryApiUrl } from '~/global/constants';
import { GET_SELECTED_CATEGORIES } from '~/graphql/categories/queries';

const cache = new InMemoryCache();

const httpLink = createUploadLink({
  uri: inventoryApiUrl,
});

const defaults = {
  id: '',
  userCompany: '',
  isAuthed: false,
  categoryOrder: [],
  createdAssetsCount: 0,
  saveSelectedCategories: [],
};

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

const typeDefs = `
type Query {
  id: ID
  isAuthed: Boolean
  createdAssetsCount: Int
  categoryOrder: [String]
  saveSelectedCategories: [String]
  userCompany: {
    id: ID
    role: Role
    company: Company
    __typename: UserCompany 
  }
}
`;

const resolvers = {
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
    setCreatedAssetsCount: async (_, { createdAssetsCount }, { cache: innerCache }) => {
      await innerCache.writeData({ data: { createdAssetsCount } });
      return null;
    },
    setSelectedCategories: async (_, { selectedCategories }, { cache: innerCache }) => {
      // eslint-disable-next-line max-len
      const { saveSelectedCategories } = await innerCache.readQuery({ query: GET_SELECTED_CATEGORIES });
      const diff = intersection(selectedCategories, saveSelectedCategories);

      if (diff && diff.length > 0) {
        await innerCache.writeData(
          {
            data: {
              saveSelectedCategories: without(diff, saveSelectedCategories),
            },
          },
        );
      } else {
        await innerCache.writeData(
          {
            data: {
              saveSelectedCategories: saveSelectedCategories.concat(selectedCategories),
            },
          },
        );
      }
      return null;
    },
  },
};

const stateLink = withClientState({ cache, defaults, resolvers, typeDefs });

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
