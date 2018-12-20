//  @flow

import React, { PureComponent, Fragment } from 'react';
import {
  Text,
  View,
  Alert,
  Image,
  FlatList,
  StatusBar,
  TextInput,
  ScrollView,
  SectionList,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

import { isEmpty, and, includes } from 'ramda';
import dayjs from 'dayjs';
import Swiper from 'react-native-swiper';
import IonIcon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import FeatherIcon from 'react-native-vector-icons/Feather';
import DateTimePicker from 'react-native-modal-datetime-picker';

import InventoryIcon from '~/assets/InventoryIcon';
import ScrollViewContainer from '~/components/ScrollViewContainer';
import colors from '~/global/colors';
import assets from '~/global/assets';
import Input from '~/components/Input';
import globalStyles from '~/global/styles';
import constants from '~/global/constants';
import { isSmallDevice } from '~/global/utils';
import * as SCENE_NAMES from '~/navigation/scenes';
import type { Props, State, PhotosProps } from './types';
import styles from './styles';

const customFields = [
  constants.itemForm.purchaseDate,
  constants.itemForm.estimateDate,
  constants.itemForm.warrantyPeriod,
];

const iconProps = {
  activeOpacity: 0.5,
  iconStyle: { marginRight: 0 },
  underlayColor: colors.transparent,
  backgroundColor: colors.transparent,
};

const PreviewModeButton = ({ isActive, title, onPress } : 
  { isActive: boolean, title: string, onPress: Function }) => (
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

const NoItems = ({ additional } : { additional? : boolean }) => (
  <Fragment>
    {additional ? (
      <Image source={assets.noPhoto} style={{ width: 100, height: 93 }} />
    )
  : (
    <IonIcon.Button
      size={64}
      {...iconProps}
      name="ios-add-circle"
      color={colors.border}
      onPress={() => alert('hi')}
    />
  )
 }
    <Text style={styles.previewText}>{additional ? constants.hints.noPhotos : constants.hints.addPhoto}</Text>
  </Fragment>
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
    sections: [
      { title: constants.headers.mainInfo, data: constants.itemFormFields.slice(0, 4), index: 0 },
      { title: constants.headers.price, data: constants.itemFormFields.slice(4, 9), index: 1 },
      { title: constants.headers.storage, data: constants.itemFormFields.slice(9), index: 2 },
    ],
    photos: [],
    defects: [],
    showPhotos: true,
    purchaseDate: null,
    estimateDate: null,
    warrantyPeriod: null,
    activePreviewIndex: 0,
    currentlyEditableDate: null,
    isDateTimePickerOpened: false,
  };

  navListener: any;

  componentDidMount() {
    const { navigation } = this.props;
    this.navListener = navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
    });
    const photos = navigation.getParam('photos', []);
    const defects = navigation.getParam('defectPhotos', []);
    this.setState({ photos, defects });
  }

  componentWillUnmount() {
    this.navListener.remove();
  }

  renderFormField = ({ item: { key, description } } : { key: string, description: string }) => {
    let isCustomField = false;
    const customProps = {};

    if (includes(description, customFields)) {
      isCustomField = true;
      customProps.value = this.state[key];
    }

    return (
      <Input
        isWhite
        customKey={key}
        {...customProps}
        blurOnSubmit={false}
        type={{ label: description }}
        containerCallback={isCustomField ? this.handleToggleDateTimePicker : null}
      />
    );
  };

  renderFormSectionHeader = ({ section: { title, index } }: { title: string, index: number }) => (
    <LinearGradient
      start={index === 0 ? { x: 1, y: 0 } : null}
      end={index === 0 ? { x: 0, y: 0 } : null}
      style={styles.formSectionHeader}
      colors={colors.itemFormHeaders[index]}
    >
      <Text style={styles.formSectionHeaderText}>{title}</Text>
    </LinearGradient>
  );

  handleToggleDateTimePicker = (key: string) => this.setState(
    ({ isDateTimePickerOpened }) => ({
      isDateTimePickerOpened: !isDateTimePickerOpened,
      currentlyEditableDate: key,
    }),
  );

  handleChooseDate = (date: Date) => this.setState(
    ({ currentlyEditableDate }) => ({
      currentlyEditableDate: null,
      isDateTimePickerOpened: false,
      [currentlyEditableDate]:
        `${currentlyEditableDate === 'warrantyPeriod' ? 'До ' : ''}${dayjs(new Date(date)).format('DD.MM.YYYY')}`,
    }),
  );

  handleSwipePreview = (index: number) => this.setState({ activePreviewIndex: index });

  showPhotos = () => this.setState({ showPhotos: true, activePreviewIndex: 0 });

  showDefects = () => this.setState({ showPhotos: false, activePreviewIndex: 0 });

  render() {
    const { showPhotos, sections, photos, defects, isDateTimePickerOpened, activePreviewIndex } = this.state;
    const currentTypeIsEmpty = (showPhotos && isEmpty(photos)) || (!showPhotos && isEmpty(defects));
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView style={{ flex: 1 }} keyboardVerticalOffset={75} behavior="padding">
          <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
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
              <Fragment>
                {and(isEmpty(photos), isEmpty(defects)) && <NoItems additional />}
                {currentTypeIsEmpty ? <NoItems /> : (
                  <Swiper showsPagination={false} onIndexChanged={this.handleSwipePreview}>
                    {(showPhotos ? photos : defects).map((photo, index) => (
                      <Image
                        key={photo.uri}
                        style={styles.photo}
                        source={{ uri: (showPhotos ? photos : defects)[index].uri }}
                      />
                    ))}
                  </Swiper>
                )}
                <View style={styles.previewInfo}>
                  <InventoryIcon
                    size={16}
                    name="photo"
                    {...iconProps}
                    color={colors.black}
                    onPress={() => alert('hi')}
                  />
                  <Text style={styles.previewInfoText}>
                    {currentTypeIsEmpty
                      ? '0/0'
                      : `${activePreviewIndex + 1} / ${showPhotos ? photos.length : defects.length}`}
                  </Text>
                </View>
              </Fragment>
            </View>
            <View style={styles.formContainer}>
              <View style={styles.formName}>
                <Text style={styles.formNameHint}>{constants.hints.name}</Text>
                <TextInput placeholder={constants.hints.enterName} style={styles.formNameInput} />
              </View>
              <SectionList
                sections={sections}
                renderItem={this.renderFormField}
                keyExtractor={(item, index) => item + index}
                renderSectionHeader={this.renderFormSectionHeader}
              />
            </View>
            <TouchableOpacity style={styles.saveItem}>
              <Text style={styles.saveItemText}>{constants.buttonTitles.saveItem}</Text>
            </TouchableOpacity>
            <DateTimePicker
              onConfirm={this.handleChooseDate}
              isVisible={isDateTimePickerOpened}
              titleIOS={constants.headers.pickDate}
              onCancel={this.handleToggleDateTimePicker}
              cancelTextIOS={constants.buttonTitles.cancel}
              cancelTextStyle={styles.dateTimePickerCancelText}
              confirmTextIOS={constants.buttonTitles.ready}
              confirmTextStyle={styles.dateTimePickerConfirmText}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

export default ItemForm;
