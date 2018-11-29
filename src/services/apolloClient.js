//  @flow
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import inventoryApiUrl from 'global/constants';

const httpLink = {
  uri: inventoryApiUrl,
  /*
  headers: {
    authorization: ???
  }
  */
};

const apolloClient = new ApolloClient({
  link: new HttpLink(httpLink),
  cache: new InMemoryCache(),
});

export default apolloClient;
