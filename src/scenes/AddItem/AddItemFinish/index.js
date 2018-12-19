//  @flow

import React, { PureComponent } from 'react';
import { Text, CameraRoll, SafeAreaView, View, Image, TouchableOpacity } from 'react-native';

import { RNCamera } from 'react-native-camera';
import { StackActions } from 'react-navigation';

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
      <HeaderExitButton
        onPress={() => {
          const resetAction = StackActions.popToTop();
          navigation.dispatch(resetAction);
          navigation.navigate(SCENE_NAMES.ItemsSceneName);
        }}
      />
    ),
  });

  handleGoToItemForm = async () => {
    const { navigation } = this.props;
    const photos = navigation.getParam('photos', []);
    const defectPhotos = navigation.getParam('defectPhotos', []);
    const photosToSave = [...photos, ...defectPhotos];
    // photosToSave.forEach((photo) => console.log(photo))
    // console.log(photosToSave)
    try {
      const promises = photosToSave.map(photo => CameraRoll.saveToCameraRoll(photo.uri.replace('file://', '')));
      await Promise.all(promises);
      const data = await CameraRoll.getPhotos({
        first: 10,
        assetType: 'All',
      });
      console.log(data);
    } catch (err) {
      console.log(err)
    }
    // navigation.navigate(SCENE_NAMES.ItemFormSceneName);
  };

  handleAddMoreItems = () => {
    const { navigation } = this.props;
    navigation.dispatch(StackActions.popToTop());
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
        <View style={styles.buttonContainer}>
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
        </View>
      </SafeAreaView>
    );
  }
}

export default AddItemFinish;
