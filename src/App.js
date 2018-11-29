//  @flow
import React from 'react';
import AppNavigator from 'navigation';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  uri: 'https://api.staging.inventoryapp.info/graphql',
});

type Props = {};

const App = (): Props => (
  <ApolloProvider client={client}>
    <AppNavigator isAuth />
  </ApolloProvider>
);

export default App;
