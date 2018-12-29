//  @flow

import React, { PureComponent } from 'react';
import { View, Image, Animated } from 'react-native';
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import SideMenu from 'react-native-side-menu';

import Camera from '~/scenes/Camera';
import QRScene from '~/scenes/QRScan';
import Login from '~/scenes/Auth/Login';
import ItemsScene from '~/scenes/Items';
import PlacesScene from '~/scenes/Places';
import PeopleScene from '~/scenes/People';
import ProfileScene from '~/scenes/Profile';
import Question from '~/scenes/Auth/Question';
import Unorganized from '~/scenes/Unorganized';
import ItemForm from '~/scenes/AddItem/ItemForm';
import CreateCompany from '~/scenes/CreateCompany';
import CategoryList from '~/scenes/Category/CategoryList';
import CategoryEdit from '~/scenes/Category/CategoryEdit';
import ForgotPassword from '~/scenes/Auth/ForgotPassword';
import AddItemPhotos from '~/scenes/AddItem/AddItemPhotos';
import AddItemFinish from '~/scenes/AddItem/AddItemFinish';
import AddItemDefects from '~/scenes/AddItem/AddItemDefects';

import { CategoryMenu } from '~/components/CategoryMenu';

import * as SCENE_NAMES from '~/navigation/scenes';

import {
  sideMenuRef,
} from '~/global';
import colors from '~/global/colors';
import { deviceWidth } from '~/global/device';

import styles, { containerOffset, stylesObject } from './styles';
import assets from './assets';

type iconType = {
  focused: Boolean,
};

const generateStack = (RouteConfigs, StackNavigatorConfig) => createStackNavigator(
  RouteConfigs,
  StackNavigatorConfig,
);

const generateBottomTabNav = (RouteConfigs, StackNavigatorConfig) => createBottomTabNavigator(
  RouteConfigs,
  StackNavigatorConfig,
);

const generateAppContainer = navigator => createAppContainer(navigator);

const itemsStack = generateStack({
  [SCENE_NAMES.ItemsSceneName]: ItemsScene,
});
const categoryStack = generateStack({
  [SCENE_NAMES.CategoryList]: CategoryList,
  [SCENE_NAMES.CategoryEdit]: CategoryEdit,
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
  [SCENE_NAMES.AddItemFinishSceneName]: AddItemFinish,
  [SCENE_NAMES.AddItemDefectsSceneName]: AddItemDefects,
  [SCENE_NAMES.ItemFormSceneName]: ItemForm,
});

const rootTabs = {
  [SCENE_NAMES.ItemsSceneName]: {
    screen: itemsStack,
    navigationOptions: {
      tabBarIcon: ({ focused }: iconType) => (
        <Image style={!focused && { opacity: 0.5 }} source={assets.chair} />
      ),
      style: {
        backgroundColor: 'red',
      },
    },
  },
  [SCENE_NAMES.CategoryList]: {
    screen: categoryStack,
    navigationOptions: {
      // tabBarButtonComponent: () => <View />,
      tabBarVisible: false,
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
      tabBarVisible: false,
      tabBarIcon: () => <Image style={styles.logo} source={assets.logo} />,
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

export const RootContainer = createAppContainer(rootNavigator);

const openMenuOffset = 300;
const targetScale = 0.9;
const targetContainerTranslateX = (
  openMenuOffset - (((deviceWidth) * (1 - targetScale)) / 2)
);

export class RootNavigator extends PureComponent<{}> {
  getAnimationStyle = (value: Animated.Value) => ({
    ...stylesObject.container,
    transform: [
      {
        translateX: value.interpolate({
          inputRange: [0, openMenuOffset],
          outputRange: [0, targetContainerTranslateX + containerOffset],
        }),
      },
      {
        scale: value.interpolate({
          inputRange: [0, openMenuOffset],
          outputRange: [1, targetScale],
        }),
      },
    ],
  });

  render() {
    return (
      <View style={styles.background}>
        <SideMenu
          menu={<CategoryMenu />}
          animationStyle={this.getAnimationStyle}
          openMenuOffset={openMenuOffset}
          ref={sideMenuRef}
        >
          <View style={styles.container}>
            <View style={styles.wrapper}>
              <RootContainer />
            </View>
          </View>
        </SideMenu>
      </View>
    );
  }
}

export const AuthNavigator = generateAppContainer(authNavigator);
