//  @flow
import React, { Fragment } from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from 'navigation';

type Props = {};
const isAuth = true;

const App = (): Props => (
  <Fragment>
    <StatusBar barStyle={isAuth ? 'dark-content' : 'light-content'} />
    <AppNavigator isAuth={isAuth} />
  </Fragment>
);
export default App;
