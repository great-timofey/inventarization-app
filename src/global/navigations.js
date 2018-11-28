import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
} from 'react-navigation';

import AuthScene from 'scenes/Auth';
import ItemsScene from 'scenes/Items';
import PeopleScene from 'scenes/People';
import PlacesScene from 'scenes/Places';
import ProfileScene from 'scenes/Profile';
import * as SCENE_NAMES from 'navigation/scenes';

const generateStack = (RouteConfigs, StackNavigatorConfig) =>
  createStackNavigator(RouteConfigs, StackNavigatorConfig);

const generateBottomTabNav = (RouteConfigs, StackNavigatorConfig) =>
  createBottomTabNavigator(RouteConfigs, StackNavigatorConfig);

const generateAppContainer = navigator => createAppContainer(navigator);

const rootTabs = {
  [SCENE_NAMES.ItemsSceneName]: generateStack({
    [SCENE_NAMES.ItemsSceneName]: ItemsScene,
  }),
  [SCENE_NAMES.PeopleSceneName]: generateStack({
    [SCENE_NAMES.PeopleSceneName]: PeopleScene,
  }),
  [SCENE_NAMES.PlacesSceneName]: generateStack({
    [SCENE_NAMES.PlacesSceneName]: PlacesScene,
  }),
  [SCENE_NAMES.ProfileSceneName]: generateStack({
    [SCENE_NAMES.ProfileSceneName]: ProfileScene,
  }),
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
