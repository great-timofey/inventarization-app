import React from 'react';
import { Alert, View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import HomeScene from '../scenes/Home'
import { HomeSceneName } from '../navigation/scenes';

const rootStack = {
  [HomeSceneName]: {
    screen: HomeScene,
  },
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

const generateStack = (RouteConfigs, StackNavigatorConfig) => createStackNavigator(RouteConfigs, StackNavigatorConfig);
const generateAppContainer = navigator => createAppContainer(navigator);

const rootNavigator = generateStack(rootStack, {
  navigationOptions: { gesturesEnabled: false },
});

export const RootNavigator = generateAppContainer(rootNavigator);
