import React from 'react';
import { Image } from 'react-native';
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import AuthScene from 'scenes/Auth';
import ItemsScene from 'scenes/Items';
import PeopleScene from 'scenes/People';
import PlacesScene from 'scenes/Places';
import ProfileScene from 'scenes/Profile';
import AddItemScene from 'scenes/AddItem';
import * as SCENE_NAMES from 'navigation/scenes';

const generateStack = (RouteConfigs, StackNavigatorConfig) =>
  createStackNavigator(RouteConfigs, StackNavigatorConfig);

const generateBottomTabNav = (RouteConfigs, StackNavigatorConfig) =>
  createBottomTabNavigator(RouteConfigs, StackNavigatorConfig);

const generateAppContainer = navigator => createAppContainer(navigator);

const itemsStack = generateStack({
  [SCENE_NAMES.ItemsSceneName]: ItemsScene,
});
const peopleStack = generateStack({
  [SCENE_NAMES.PeopleSceneName]: PeopleScene,
});
const placesStack = generateStack({
  [SCENE_NAMES.PlacesSceneName]: PlacesScene,
});
const profileStack = generateStack({
  [SCENE_NAMES.ProfileSceneName]: ProfileScene,
});
const addItemStack = generateStack({
  [SCENE_NAMES.AddItemSceneName]: AddItemScene,
});

const rootTabs = {
  [SCENE_NAMES.ItemsSceneName]: {
    screen: itemsStack,
    navigationOptions: {
      tabBarIcon: ({ focused }) => (
        <Image
          style={!focused && { opacity: 0.5 }}
          source={require('assets/chair.png')}
        />
      ),
    },
  },
  [SCENE_NAMES.PlacesSceneName]: {
    screen: placesStack,
    navigationOptions: {
      tabBarIcon: ({ focused }) => (
        <Image
          style={!focused && { opacity: 0.5 }}
          source={require('assets/location.png')}
        />
      ),
    },
  },
  [SCENE_NAMES.AddItemSceneName]: {
    screen: addItemStack,
    navigationOptions: {
      tabBarIcon: () => (
        <Image
          style={{
            height: 36,
            width: 41,
            resizeMode: 'contain',
          }}
          source={require('assets/logo.png')}
        />
      ),
    },
  },
  [SCENE_NAMES.PeopleSceneName]: {
    screen: peopleStack,
    navigationOptions: {
      tabBarIcon: ({ focused }) => (
        <Image
          style={!focused && { opacity: 0.5 }}
          source={require('assets/people.png')}
        />
      ),
    },
  },
  [SCENE_NAMES.ProfileSceneName]: {
    screen: profileStack,
    navigationOptions: {
      tabBarIcon: ({ focused }) => (
        <Image
          style={!focused && { opacity: 0.5 }}
          source={require('assets/user.png')}
        />
      ),
    },
  },
};

const authStack = {
  [SCENE_NAMES.AuthSceneName]: {
    screen: AuthScene,
  },
};

const rootConfig = {
  tabBarPosition: 'bottom',
  animationEnabled: false,
  swipeEnabled: false,
  tabBarOptions: {
    showLabel: false,
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

const navigators = {};

export function setNavigatior(routeName, navigator) {
  if (navigator) {
    const { subs } = navigator;
    if (subs) {
      subs.remove();
    }
    navigators[routeName] = navigator;
  }
}

const rootNavigator = generateBottomTabNav(rootTabs, rootConfig);
const authNavigator = generateStack(authStack, authConfig);

export const RootNavigator = generateAppContainer(rootNavigator);
export const AuthNavigator = generateAppContainer(authNavigator);
