import React from 'react';
import R from 'ramda';

import {
    AppContainer,
    setNavigatior,
    RootNavigator,
} from '../global/navigations';

const navRef = R.curry(setNavigatior)('HOME_NAVIGATOR');

export const AppNavigator = () => <RootNavigator ref={navRef} />;


