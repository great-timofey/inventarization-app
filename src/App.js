//  @flow
import React from 'react';
import { ApolloProvider } from 'react-apollo';

import AppNavigator from 'navigation';
import apolloClient from 'services/apolloClient';

type Props = {};

const App = (): Props => (
  <ApolloProvider client={apolloClient}>
    <AppNavigator isAuth />
  </ApolloProvider>
);

export default App;
