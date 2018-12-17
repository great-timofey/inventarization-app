//  @flow
import React from 'react';
import { Image } from 'react-native';
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import Camera from 'scenes/Camera';
import QRScene from 'scenes/QRScan';
import Login from 'scenes/Auth/Login';
import ItemsScene from 'scenes/Items';
import PlacesScene from 'scenes/Places';
import PeopleScene from 'scenes/People';
import ProfileScene from 'scenes/Profile';
// import AddItemScene from 'scenes/AddItem';
import Question from 'scenes/Auth/Question';
import Unorganized from 'scenes/Unorganized';
import CreateCompany from 'scenes/CreateCompany';
import AddItemPhotos from 'scenes/AddItemPhotos';
import AddItemDefects from 'scenes/AddItemDefects';
import ForgotPassword from 'scenes/Auth/ForgotPassword';

import * as SCENE_NAMES from 'navigation/scenes';

import colors from 'global/colors';
import styles from './styles';
import assets from './assets';

type iconType = {
  focused: Boolean,
};

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
  [SCENE_NAMES.QRScanSceneName]: QRScene,
  [SCENE_NAMES.AddItemPhotosSceneName]: AddItemPhotos,
  [SCENE_NAMES.AddItemDefectsSceneName]: AddItemDefects,
});

const rootTabs = {
  [SCENE_NAMES.ItemsSceneName]: {
    screen: itemsStack,
    navigationOptions: {
      tabBarIcon: ({ focused }: iconType) => (
        <Image style={!focused && { opacity: 0.5 }} source={assets.chair} />
      ),
    },
  },
  [SCENE_NAMES.PlacesSceneName]: {
    screen: placesStack,
    navigationOptions: {
      tabBarIcon: ({ focused }: iconType) => (
        <Image style={!focused && { opacity: 0.5 }} source={assets.location} />
      ),
    },
  },
  [SCENE_NAMES.AddItemSceneName]: {
    screen: addItemStack,
    navigationOptions: {
      tabBarIcon: () => <Image style={styles.logo} source={assets.logo} />,
      tabBarVisible: false,
    },
  },
  [SCENE_NAMES.PeopleSceneName]: {
    screen: peopleStack,
    navigationOptions: {
      tabBarIcon: ({ focused }: iconType) => (
        <Image style={!focused && { opacity: 0.5 }} source={assets.people} />
      ),
    },
  },
  [SCENE_NAMES.ProfileSceneName]: {
    screen: profileStack,
    navigationOptions: {
      tabBarIcon: ({ focused }: iconType) => (
        <Image style={!focused && { opacity: 0.5 }} source={assets.user} />
      ),
    },
  },
};

const authStack = {
  [SCENE_NAMES.LoginSceneName]: {
    screen: Login,
  },
  [SCENE_NAMES.CreateCompanySceneName]: {
    screen: CreateCompany,
  },
  [SCENE_NAMES.UnorganizedSceneName]: {
    screen: Unorganized,
  },
  [SCENE_NAMES.QuestionSceneName]: {
    screen: Question,
  },
  [SCENE_NAMES.ForgotPasswordSceneName]: {
    screen: ForgotPassword,
  },
  [SCENE_NAMES.CameraSceneName]: {
    screen: Camera,
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
  cardStyle: {
    backgroundColor: colors.backGroundBlack,
  },
  navigationOptions: { gesturesEnabled: false },
};

const navigators = {};

export function setNavigatior(routeName: string, navigator: Object) {
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
