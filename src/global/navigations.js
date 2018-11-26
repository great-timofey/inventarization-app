import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import HomeScene from '../scene/Home';
import AuthScene from '../scenes/Auth';
import { HomeSceneName, AuthSceneName } from '../navigation/scenes';

const rootStack = {
  [HomeSceneName]: {
    screen: HomeScene,
  },
};

const authStack = {
  [AuthSceneName]: {
    screen: AuthScene,
  },
};

const authConfig = {
  mode: 'modal',
  headerMode: 'none',
  cardStyle: {
    backgroundColor: 'white',
  },
  navigationOptions: { gesturesEnabled: false },
};

let navigators = {};

export function setNavigatior(routeName, navigator) {
  if (navigator) {
    const { subs } = navigator;
    if (subs) {
      subs.remove();
    }
    navigators[routeName] = navigator;
  }
}

const generateStack = (RouteConfigs, StackNavigatorConfig) =>
  createStackNavigator(RouteConfigs, StackNavigatorConfig);
const generateAppContainer = navigator => createAppContainer(navigator);

const rootNavigator = generateStack(rootStack, {
  navigationOptions: { gesturesEnabled: false },
});

const authNavigator = generateStack(authStack, authConfig);

export const RootNavigator = generateAppContainer(rootNavigator);
export const AuthNavigator = generateAppContainer(authNavigator);
