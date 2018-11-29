//  @flow
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { inventoryApiUrl, githubApiUrl, githubToken } from 'global/constants';

const httpLink = {
  uri: githubApiUrl,
  headers: {
    authorization: `bearer ${githubToken}`,
  },
};

const apolloClient = new ApolloClient({
  link: new HttpLink(httpLink),
  cache: new InMemoryCache(),
});

export default apolloClient;
