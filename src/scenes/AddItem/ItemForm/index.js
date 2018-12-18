//  @flow

import React, { PureComponent, Fragment } from 'react';
import {
  Text,
  View,
  Alert,
  Image,
  FlatList,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import RNFS from 'react-native-fs';
import { RNCamera } from 'react-native-camera';
import { all, assoc, remove, concat, values, equals } from 'ramda';
// $FlowFixMe
import Permissions from 'react-native-permissions';

import assets from '~/global/assets';
import constants from '~/global/constants';
import { isSmallDevice } from '~/global/utils';
import * as SCENE_NAMES from '~/navigation/scenes';
import type { Props, State, PhotosProps } from './types';
import styles from './styles';

const HeaderSkipButton = ({ onPress }: { onPress: Function }) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={styles.skipButtonText}>{constants.buttonTitles.ready}</Text>
  </TouchableOpacity>
);

const HeaderBackButton = ({ onPress }: { onPress: Function }) => (
  <TouchableOpacity onPress={onPress}>
    <Image source={assets.headerBackArrow} style={styles.backButton} />
  </TouchableOpacity>
);

class ItemForm extends PureComponent<Props, State> {
  static navigationOptions = ({ navigation }: Props) => ({
    headerStyle: styles.header,
    title: constants.headers.defects,
    headerTitleStyle: styles.headerTitleStyle,
    headerLeft: <HeaderBackButton onPress={() => navigation.goBack()} />,
    headerRight: <HeaderBackButton onPress={() => navigation.goBack()} />,
  });

  state = {};

  navListener: any;

  componentDidMount() {
    const { navigation } = this.props;
    this.navListener = navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
    });
  }

  componentWillUnmount() {
    this.navListener.remove();
  }

  renderPhoto = ({ item }: PhotosProps) => <View style={styles.photoContainer} />;

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text>hi</Text>
      </SafeAreaView>
    );
  }
}

export default ItemForm;
