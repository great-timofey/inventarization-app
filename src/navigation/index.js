//  @flow
import React from 'react';
import R from 'ramda';

import {
  setNavigatior,
  AuthNavigator,
  RootNavigator,
} from 'global/navigations';

const navRef = R.curry(setNavigatior)('HOME_NAVIGATOR');
const authNavRef = R.curry(setNavigatior)('AUTH_NAVIGATOR');

const AppNavigator = ({ isAuth }: { isAuth: boolean }) =>
  isAuth ? <RootNavigator ref={navRef} /> : <AuthNavigator ref={authNavRef} />;

export default AppNavigator;
