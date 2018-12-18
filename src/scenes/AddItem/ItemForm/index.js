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
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
// $FlowFixMe
import Permissions from 'react-native-permissions';
import IonIcon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';

import colors from '~/global/colors';
import assets from '~/global/assets';
import globalStyles from '~/global/styles';
import constants from '~/global/constants';
import { isSmallDevice } from '~/global/utils';
import * as SCENE_NAMES from '~/navigation/scenes';
import type { Props, State, PhotosProps } from './types';
import styles from './styles';

const iconProps = {
  activeOpacity: 0.5,
  underlayColor: colors.transparent,
  backgroundColor: colors.transparent,
  iconStyle: { marginRight: 0 },
};

const PreviewModeButton = ({ isActive, title, onPress }) => (
  <TouchableOpacity
    style={isActive ? styles.previewModeButtonActive : styles.previewModeButton}
    onPress={onPress}
  >
    <Text style={isActive ? styles.previewModeTextActive : styles.previewModeText}>{title}</Text>
  </TouchableOpacity>
);

const HeaderTrashButton = ({ onPress }: { onPress: Function }) => (
  <FeatherIcon.Button
    size={24}
    name="trash-2"
    {...iconProps}
    onPress={onPress}
    color={colors.red}
    style={{ marginRight: -10 }}
  />
);

const HeaderBackButton = ({ onPress }: { onPress: Function }) => (
  <TouchableOpacity onPress={onPress}>
    <Image source={assets.headerBackArrow} style={styles.backButton} />
  </TouchableOpacity>
);

class ItemForm extends PureComponent<Props, State> {
  static navigationOptions = ({ navigation }: Props) => ({
    headerStyle: styles.header,
    title: constants.headers.addingItem,
    headerTitleStyle: styles.headerTitleStyle,
    headerLeft: <HeaderBackButton onPress={() => navigation.goBack()} />,
    headerRight: <HeaderTrashButton onPress={() => navigation.goBack()} />,
  });

  state = {
    showPhotos: true,
  };

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

  showPhotos = () => this.setState({ showPhotos: true });

  showDefects = () => this.setState({ showPhotos: false });

  renderPhoto = ({ item }: PhotosProps) => <View style={styles.photoContainer} />;

  render() {
    const { showPhotos } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.preview}>
          <View style={styles.previewModeButtons}>
            <PreviewModeButton
              isActive={showPhotos}
              onPress={this.showPhotos}
              title={constants.buttonTitles.photos}
            />
            <PreviewModeButton
              isActive={!showPhotos}
              onPress={this.showDefects}
              title={constants.buttonTitles.defects}
            />
          </View>
          <IonIcon.Button
            size={64}
            {...iconProps}
            name="ios-add-circle"
            color={colors.border}
            onPress={() => alert('hi')}
          />
          <Text style={styles.previewText}>{constants.hints.addPhoto}</Text>
        </View>
      </SafeAreaView>
    );
  }
}

export default ItemForm;
