//  @flow
import React, { Fragment } from 'react';
import { StatusBar } from 'react-native';
import { ApolloProvider } from 'react-apollo';

import AppNavigator from 'navigation';
import apolloClient from 'services/apolloClient';

type Props = {};
const isAuth = false;

const App = (): Props => (
  <Fragment>
    <StatusBar barStyle={isAuth ? 'dark-content' : 'light-content'} />
    <ApolloProvider client={apolloClient}>
      <AppNavigator isAuth={isAuth} />
    </ApolloProvider>
  </Fragment>
);

export default App;
