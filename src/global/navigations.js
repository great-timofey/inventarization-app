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
import * as SceneNames from 'navigation/scenes';

const generateStack = (RouteConfigs, StackNavigatorConfig) =>
  createStackNavigator(RouteConfigs, StackNavigatorConfig);

const generateBottomTabNav = (RouteConfigs, StackNavigatorConfig) =>
  createBottomTabNavigator(RouteConfigs, StackNavigatorConfig);

const generateAppContainer = navigator => createAppContainer(navigator);

const rootTabs = {
  [SceneNames.ItemsSceneName]: generateStack({
    [SceneNames.ItemsSceneName]: ItemsScene,
  }),
  [SceneNames.PeopleSceneName]: generateStack({
    [SceneNames.PeopleSceneName]: PeopleScene,
  }),
  [SceneNames.PlacesSceneName]: generateStack({
    [SceneNames.PlacesSceneName]: PlacesScene,
  }),
  [SceneNames.ProfileSceneName]: generateStack({
    [SceneNames.ProfileSceneName]: ProfileScene,
  }),
};

const authStack = {
  [SceneNames.AuthSceneName]: {
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
