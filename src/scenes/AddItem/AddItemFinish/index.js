//  @flow

import React, { PureComponent } from 'react';
import { Text, StatusBar, SafeAreaView, View, Image, TouchableOpacity } from 'react-native';

import { graphql } from 'react-apollo';
// $FlowFixMe
import { RNCamera } from 'react-native-camera';

import assets from '~/global/assets';
import constants from '~/global/constants';
import * as SCENE_NAMES from '~/navigation/scenes';
import { GET_CREATED_ASSETS_COUNT_CLIENT } from '~/graphql/assets/queries';
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
          navigation.popToTop({});
          navigation.navigate(SCENE_NAMES.ItemsSceneName);
        }}
      />
    ),
  });

  navListener: any;

  componentDidMount() {
    const { navigation } = this.props;
    this.navListener = navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content');
    });
  }

  handleGoToItemForm = async () => {
    const { navigation } = this.props;
    const photos = navigation.getParam('photos', []);
    const location = navigation.getParam('location', '');
    const codeData = navigation.getParam('codeData', null);
    const creationId = navigation.getParam('creationId', '');
    const inventoryId = navigation.getParam('inventoryId', '');
    const defectPhotos = navigation.getParam('defectPhotos', []);
    navigation.navigate(SCENE_NAMES.ItemFormSceneName, {
      photos,
      location,
      codeData,
      creationId,
      inventoryId,
      defectPhotos,
      showName: false,
    });
  };

  handleAddMoreItems = () => {
    const { navigation } = this.props;
    navigation.popToTop({});
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

export default graphql(GET_CREATED_ASSETS_COUNT_CLIENT)(AddItemFinish);
