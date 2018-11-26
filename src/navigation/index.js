import React from 'react';
import R from 'ramda';

import {
  AppContainer,
  setNavigatior,
  AuthNavigator,
  RootNavigator,
} from '../global/navigations';

const navRef = R.curry(setNavigatior)('HOME_NAVIGATOR');
const authNavRef = R.curry(setNavigatior)('AUTH_NAVIGATOR');

export const AppNavigator = ({ isAuth }) => isAuth ? <RootNavigator ref={navRef} /> : <AuthNavigator ref={authNavRef} />;


