//  @flow

import React, { PureComponent, Fragment } from 'react';
import {
  Text,
  View,
  Image,
  Alert,
  FlatList,
  StatusBar,
  TextInput,
  ScrollView,
  SectionList,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

import { keys, isEmpty, includes, remove } from 'ramda';
import dayjs from 'dayjs';
import RNFS from 'react-native-fs';
import IonIcon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { isIphoneX } from '~/global/device';
import { isSmallDevice } from '~/global/utils';
import Carousel from '~/components/Carousel';
import ChooseModal from '~/components/ChooseModal';
import DateTimePicker from '~/components/DateTimePicker';
import colors from '~/global/colors';
import assets from '~/global/assets';
import Input from '~/components/Input';
import constants from '~/global/constants';
import * as SCENE_NAMES from '~/navigation/scenes';
import InventoryIcon from '~/assets/InventoryIcon';
import type { Props, State, PhotosProps, PreviewProps } from './types';
import styles from './styles';

const iconProps = {
  activeOpacity: 0.5,
  iconStyle: { marginRight: 0 },
  underlayColor: colors.transparent,
  backgroundColor: colors.transparent,
};

const PreviewModeButton = ({
  title,
  onPress,
  isActive,
}: {
  title: string,
  isActive: boolean,
  onPress: Function,
}) => (
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
    style={styles.trashIcon}
  />
);

const HeaderBackButton = ({ onPress }: { onPress: Function }) => (
  <TouchableOpacity onPress={onPress}>
    <Image source={assets.headerBackArrow} style={styles.backButton} />
  </TouchableOpacity>
);

const NoItems = ({ additional, onPress }: { additional?: boolean, onPress: Function }) => (
  <Fragment>
    {additional ? (
      <IonIcon.Button
        size={64}
        {...iconProps}
        name="ios-add-circle"
        color={colors.border}
        onPress={onPress}
      />
    ) : (
      <Image source={assets.noPhoto} style={styles.noPhoto} />
    )}
    <Text style={styles.previewText}>
      {additional ? constants.hints.addPhoto : constants.hints.noPhotos}
    </Text>
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
    name: '',
    photos: [],
    defects: [],
    warnings: {},
    location: null,
    category: null,
    coordinates: '',
    showPhotos: true,
    inventoryCode: '',
    responsible: null,
    marketPrice: '',
    purchasePrice: '',
    purchaseDate: null,
    estimateDate: null,
    warrantyPeriod: null,
    isModalOpened: false,
    activePreviewIndex: 0,
    currentlyEditableDate: null,
    isDateTimePickerOpened: false,
    sections: constants.itemFormSections,
  };

  carousel: any;
  navListener: any;

  componentDidMount() {
    const { navigation } = this.props;
    this.navListener = navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
    });
    const photos = navigation.getParam('photos', []);
    const defects = navigation.getParam('defectPhotos', []);
    const firstPhotoForCoords = photos.length ? photos[0] : defects[0];
    const coordinates = `${firstPhotoForCoords.location.lat}, ${firstPhotoForCoords.location.lon}`;
    this.setState({ photos, defects, coordinates });
  }

  componentWillUnmount() {
    this.navListener.remove();
  }

  componentDidUpdate(prevProps: Props) {
    const { navigation } = this.props;
    if (
      prevProps.navigation.state.params.additionalPhotos
      !== navigation.state.params.additionalPhotos
    ) {
      this.setState(({ photos }) => ({
        activePreviewIndex: 0,
        photos: photos.concat(navigation.state.params.additionalPhotos),
      }));
    }
    if (
      prevProps.navigation.state.params.additionalDefects
      !== navigation.state.params.additionalDefects
    ) {
      this.setState(({ defects }) => ({
        activePreviewIndex: 0,
        defects: defects.concat(navigation.state.params.additionalDefects),
      }));
    }
  }

  checkFields = () => {
    const { name, inventoryCode } = this.state;
    const warnings = {};

    if (!name.trim()) {
      warnings.name = 1;
    }

    if (!inventoryCode.trim()) {
      warnings.inventoryCode = 'empty';
    }

    /*

    if (...somethingFromBackend) {
      warnings.push(['inventoryCode', 'inventoryCodeAlreadyInUse']);
    }

    */

    this.setState({ warnings });
  };

  checkForErrors = () => !!keys(this.state.warnings).length;

  handleSubmitForm = async () => {
    /**
     * 'Promise.resolve' and 'await' below used because of async setState
     * in this.checkFields and this.checkForErrors
     */

    const isFormInvalid = await Promise.resolve()
      .then(_ => this.checkFields())
      .then(_ => this.checkForErrors());

    if (!isFormInvalid) console.log(this.state);
    else console.log('FORM IS INVALID');
  };

  renderFormField = ({
    item: { key, description, placeholder, ...rest },
  }: PreviewProps) => {
    const { warnings: stateWarnings } = this.state;
    let callback;
    let itemMask;
    let itemWarning;
    const isCoordinatesField = description === constants.itemForm.coordinates;
    const isDescriptionField = description === constants.itemForm.description;
    if (includes(description, constants.fieldTypes.modalFields)) callback = this.handleToggleModal;
    if (includes(description, constants.fieldTypes.dateFields)) callback = this.handleToggleDateTimePicker;
    if (includes(description, constants.fieldTypes.nonEditableFields)) callback = () => {};
    if (includes(description, constants.fieldTypes.currencyFields)) {
      itemMask = constants.masks.price;
    }
    if (description === constants.itemForm.inventoryCode) {
      const { warnings } = rest;
      itemWarning = warnings[stateWarnings[key]];
    }
    if (key === constants.itemForm.name) {
      const { warning } = rest;
      itemWarning = warning;
    }

    return (
      <Input
        isWhite
        customKey={key}
        mask={itemMask}
        blurOnSubmit={false}
        value={this.state[key]}
        placeholder={placeholder}
        containerCallback={callback}
        disabled={isCoordinatesField}
        isMultiline={isDescriptionField}
        maxLength={isDescriptionField ? 250 : 50}
        showWarningInTitle={key === 'inventoryCode'}
        isWarning={includes(key, keys(stateWarnings))}
        type={{ label: description, warning: itemWarning }}
        onChangeText={text => this.handleChangeField(key, text)}
      />
    );
  };

  renderFormSectionHeader = ({ section: { title, index } }: Section) => (
    <View style={styles.formSectionHeaderOverflow}>
      <LinearGradient
        start={index === 0 ? { x: 1, y: 0 } : null}
        end={index === 0 ? { x: 0, y: 0 } : null}
        style={styles.formSectionHeader}
        colors={colors.itemFormHeaders[index]}
      >
        <Text style={styles.formSectionHeaderText}>{title}</Text>
      </LinearGradient>
    </View>
  );

  renderPreviewPhotoBarItem = ({ item: { uri }, index }: PhotosProps) => (!uri ? (
    <TouchableOpacity style={styles.addPhotoBarButton} onPress={this.handleAddPhoto}>
      <IonIcon size={26} {...iconProps} name="ios-add-circle" color={colors.border} />
    </TouchableOpacity>
  ) : (
    <View style={styles.photoContainer}>
      <TouchableOpacity
        activeOpacity={0.5}
        style={[styles.removePhotoIcon, isSmallDevice && styles.smallerIcon]}
        onPress={() => this.handleRemovePreviewPhotoBarItem(index)}
      >
        <Image source={assets.deletePhoto} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.photoImageContainer}
        onPress={() => this.handleSetIndexPreview(index)}
      >
        <Image style={styles.photoImage} source={{ uri }} />
      </TouchableOpacity>
    </View>
  ));

  handleAddPhoto = () => {
    const { navigation } = this.props;
    const { showPhotos } = this.state;
    navigation.push(
      showPhotos ? SCENE_NAMES.AddItemPhotosSceneName : SCENE_NAMES.AddItemDefectsSceneName,
      { from: SCENE_NAMES.AddItemPhotosSceneName },
    );
  };

  handleRemovePreviewPhotoBarItem = async (removedIndex: number) => {
    const { showPhotos, activePreviewIndex } = this.state;
    const currentlyActive = showPhotos ? 'photos' : 'defects';
    const { uri } = this.state[currentlyActive][removedIndex];

    try {
      RNFS.unlink(uri);
    } catch (error) {
      Alert.alert(error.message);
    }

    this.setState(state => ({
      [currentlyActive]: remove(removedIndex, 1, state[currentlyActive]),
      activePreviewIndex:
        removedIndex <= activePreviewIndex && activePreviewIndex > 0
          ? state.activePreviewIndex - 1
          : state.activePreviewIndex,
    }));
  };

  handleToggleDateTimePicker = (key: string) => this.setState(({ isDateTimePickerOpened }) => ({
    isDateTimePickerOpened: !isDateTimePickerOpened,
    currentlyEditableDate: key,
  }));

  handleToggleModal = () => this.setState(({ isModalOpened }) => ({ isModalOpened: !isModalOpened }));

  handleChooseDate = (date: Date) => this.setState(({ currentlyEditableDate }) => ({
    isDateTimePickerOpened: false,
    [currentlyEditableDate]: `${currentlyEditableDate === 'warrantyPeriod' ? 'До ' : ''}${dayjs(
      new Date(date),
    ).format(constants.formats.newItemDates)}`,
    currentlyEditableDate: null,
  }));

  handleSwipePreview = (index: number) => this.setState({ activePreviewIndex: index });

  handleSetIndexPreview = (newIndex: number) => {
    const { activePreviewIndex } = this.state;
    this.carousel.scrollBy(newIndex - activePreviewIndex, false);
  };

  handleChangeField = (field: string, value: string) => {
    this.setState({
      [field]: value,
    });
  };

  showPhotos = () => {
    this.setState({ showPhotos: true, activePreviewIndex: 0 });
    if (this.carousel) {
      this.carousel.scrollBy(0, false);
    }
  };

  showDefects = () => {
    this.setState({ showPhotos: false, activePreviewIndex: 0 });
    if (this.carousel) {
      this.carousel.scrollBy(0, false);
    }
  };

  render() {
    const {
      name,
      photos,
      defects,
      warnings,
      sections,
      showPhotos,
      isModalOpened,
      activePreviewIndex,
      isDateTimePickerOpened,
    } = this.state;
    const currentTypeIsEmpty = (showPhotos && isEmpty(photos)) || (!showPhotos && isEmpty(defects));
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior="padding"
          style={styles.container}
          keyboardVerticalOffset={isIphoneX ? 85 : 60}
        >
          <ScrollView>
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
                {currentTypeIsEmpty ? (
                  <NoItems additional onPress={this.handleAddPhoto} />
                ) : (
                  <Carousel
                    innerRef={(ref) => {
                      this.carousel = ref;
                    }}
                    index={activePreviewIndex}
                    data={showPhotos ? photos : defects}
                    onIndexChanged={this.handleSwipePreview}
                    //  use custom key for correct rerendering of carousel component
                    key={(showPhotos ? photos : defects).length + (showPhotos ? 'p' : 'd')}
                  />
                )}
                <View style={styles.previewInfo}>
                  <InventoryIcon size={16} name="photo" {...iconProps} color={colors.black} />
                  <Text style={styles.previewInfoText}>
                    {currentTypeIsEmpty
                      ? '0/0'
                      : `${activePreviewIndex + 1} / ${
                        showPhotos ? photos.length : defects.length
                      }`}
                  </Text>
                </View>
              </Fragment>
            </View>
            <FlatList
              horizontal
              style={styles.photosOuter}
              showsHorizontalScrollIndicator={false}
              renderItem={this.renderPreviewPhotoBarItem}
              keyExtractor={(_, index) => index.toString()}
              contentContainerStyle={[
                styles.photosInner,
                styles.previewPhotoBar,
                isEmpty(showPhotos ? photos : defects) && styles.hide,
              ]}
              data={showPhotos ? photos.concat({ uri: '' }) : defects.concat({ uri: '' })}
            />
            <View style={styles.formContainer}>
              <View style={styles.formName}>
                <View style={styles.formNameTitleContainer}>
                  <Text style={styles.formNameHint}>{constants.hints.name}</Text>
                  <Text
                    style={[
                      styles.formNameError,
                      includes('name', keys(warnings)) && { display: 'flex' },
                    ]}
                  >
                    {constants.errors.createItem.name}
                  </Text>
                </View>
                <TextInput
                  value={name}
                  style={styles.formNameInput}
                  placeholder={constants.hints.enterName}
                  onChangeText={text => this.handleChangeField('name', text)}
                />
              </View>
              <SectionList
                sections={sections}
                renderItem={this.renderFormField}
                keyExtractor={(item, index) => item + index}
                renderSectionHeader={this.renderFormSectionHeader}
                contentContainerStyle={styles.formSectionListContainer}
              />
            </View>
            <TouchableOpacity style={styles.saveItem} onPress={this.handleSubmitForm}>
              <Text style={styles.saveItemText}>{constants.buttonTitles.saveItem}</Text>
            </TouchableOpacity>
            <DateTimePicker
              onConfirm={this.handleChooseDate}
              isVisible={isDateTimePickerOpened}
              onCancel={this.handleToggleDateTimePicker}
            />
            <ChooseModal
              isVisible={isModalOpened}
              onCancel={this.handleToggleModal}
              data={['adf', 'adf', 'adf', 'adf', 'adf', 'adf', 'adf', 'adf', 'adf', 'adf']}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

export default ItemForm;
