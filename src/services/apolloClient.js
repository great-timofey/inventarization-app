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

import { GET_CATEGORY_ORDER } from '~/graphql/categories/queries';


const cache = new InMemoryCache();

const httpLink = createUploadLink({
  uri: inventoryApiUrl,
});

const defaults = {
  id: '',
  userCompany: '',
  isAuthed: false,
  categoryOrder: [],
  selectedCategories: [],
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
  categoryOrder: [String]
  selectedCategories: [String]
  userCompany: {
    id: ID
    role: Role
    company: Company
    __typename: UserCompany 
  }
}
type Mutations {
  setSelectedCategory(selectedCategory: String!): 
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
    setSelectedCategory: async (_, { selectedCategory }, { cache: innerCache }) => {
      console.log(innerCache);
      const prev = await innerCache.readQuery({ GET_CATEGORY_ORDER });
      console.log(prev, selectedCategory);
      // await innerCache.writeData({ data: { selectedCategory } });
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
