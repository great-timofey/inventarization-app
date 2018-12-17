//  @flow

import React, { PureComponent } from 'react';
import { Text, SafeAreaView, View, Image, TouchableOpacity } from 'react-native';

import { RNCamera } from 'react-native-camera';

import assets from '~/global/assets';
import constants from '~/global/constants';
import * as SCENE_NAMES from '~/navigation/scenes';
import type { Props, State } from './types';
import styles from './styles';

const HeaderExitButton = ({ onPress }: { onPress: Function }) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={styles.skipButtonText}>{constants.buttonTitles.exit}</Text>
  </TouchableOpacity>
);

const HeaderBackButton = ({ onPress }: { onPress: Function }) => (
  <TouchableOpacity onPress={onPress}>
    <Image source={assets.headerBackArrow} style={styles.backButton} />
  </TouchableOpacity>
);

class AddItemFinish extends PureComponent<Props, State> {
  static navigationOptions = ({ navigation }: Props) => ({
    headerStyle: styles.header,
    title: constants.headers.itemReady,
    headerTitleStyle: styles.headerTitleStyle,
    headerLeft: <HeaderBackButton onPress={() => navigation.goBack()} />,
    headerRight: (
      <HeaderExitButton onPress={() => navigation.navigate(SCENE_NAMES.ItemsSceneName)} />
    ),
  });

  handleGoToItemForm = () => console.log('navigate to item form');

  handleAddMoreItems = () => {
    const { navigation } = this.props;
    navigation.navigate(SCENE_NAMES.QRScanSceneName);
  };

  camera: ?RNCamera;

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.hint}>
          <Image source={assets.checkCircled} style={styles.checkImage} />
        </View>
        <RNCamera
          ref={(ref) => {
            this.camera = ref;
          }}
          style={styles.preview}
        />
        <TouchableOpacity
          onPress={this.handleGoToItemForm}
          style={[styles.button, styles.topButton]}
        >
          <Text style={styles.buttonText}>{constants.buttonTitles.fillItemForm}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.handleAddMoreItems}
          style={[styles.button, styles.bottomButton]}
        >
          <Image source={assets.plus} style={styles.plus} />
          <Text style={styles.buttonText}>{constants.buttonTitles.addAnotherYetItem}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

export default AddItemFinish;
