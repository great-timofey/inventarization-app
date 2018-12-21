//  @flow

import React, { PureComponent, Fragment } from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  StatusBar,
  TextInput,
  SectionList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import { isEmpty, and, includes, assoc, remove } from 'ramda';
import dayjs from 'dayjs';
import RNFS from 'react-native-fs';
import Modal from 'react-native-modal';
import Swiper from 'react-native-swiper';
import IonIcon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import FeatherIcon from 'react-native-vector-icons/Feather';
import DateTimePicker from 'react-native-modal-datetime-picker';

import { isSmallDevice } from '~/global/utils';
import InventoryIcon from '~/assets/InventoryIcon';
import ScrollViewContainer from '~/components/ScrollViewContainer';
import colors from '~/global/colors';
import assets from '~/global/assets';
import Input from '~/components/Input';
import constants from '~/global/constants';
import * as SCENE_NAMES from '~/navigation/scenes';
import type { Props, State, PhotosProps } from './types';
import styles from './styles';

const dateFields = [
  constants.itemForm.purchaseDate,
  constants.itemForm.estimateDate,
  constants.itemForm.warrantyPeriod,
];

const modalFields = [
  constants.itemForm.location,
  constants.itemForm.responsible,
  constants.itemForm.category,
];

const iconProps = {
  activeOpacity: 0.5,
  iconStyle: { marginRight: 0 },
  underlayColor: colors.transparent,
  backgroundColor: colors.transparent,
};

const CustomCancelDateTimePickerButton = ({ onCancel }: { onCancel: Function }) => (
  <TouchableOpacity
    activeOpacity={1}
    style={styles.customCancelDateTimePickerButton}
    onPress={onCancel}
  >
    <Text style={styles.customCancelDateTimePickerText}>{constants.buttonTitles.cancel}</Text>
  </TouchableOpacity>
);

const PreviewModeButton = ({
  isActive,
  title,
  onPress,
}: {
  isActive: boolean,
  title: string,
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

const NoItems = ({ additional, onPress } : { additional? : boolean, onPress: Function }) => (
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
    sections: [
      { title: constants.headers.mainInfo, data: constants.itemFormFields.slice(0, 4), index: 0 },
      { title: constants.headers.price, data: constants.itemFormFields.slice(4, 9), index: 1 },
      { title: constants.headers.storage, data: constants.itemFormFields.slice(9), index: 2 },
    ],
    photos: [],
    defects: [],
    location: null,
    category: null,
    coordinates: '',
    showPhotos: true,
    responsible: null,
    purchaseDate: null,
    estimateDate: null,
    warrantyPeriod: null,
    isModalOpened: false,
    activePreviewIndex: 0,
    currentlyEditableDate: null,
    isDateTimePickerOpened: false,
  };

  swiper: any;
  navListener: any;

  componentDidMount() {
    const { navigation } = this.props;
    this.navListener = navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
    });
    // this.swiper.scrollBy(0);
    const photos = navigation.getParam('photos', []);
    const defects = navigation.getParam('defectPhotos', []);
    const firstPhotoForCoords = photos.length ? photos[0] : defects[0];
    const coordinates = `${firstPhotoForCoords.location.lat}, ${firstPhotoForCoords.location.lon}`;
    this.setState({ photos, defects, coordinates });
  }

  componentWillUnmount() {
    this.navListener.remove();
  }

  componentDidUpdate(prevProps) {
    const { navigation } = this.props;
    const { activePreviewIndex, showPhotos, photos, defects } = this.state;
    if (prevProps.navigation.state.params.additionalPhotos !== navigation.state.params.additionalPhotos) {
      // this.swiper.scrollBy((showPhotos ? photos : defects).length - activePreviewIndex, 0);
      this.setState(({ photos }) => ({ photos: photos.concat(navigation.state.params.additionalPhotos), activePreviewIndex: 0 }));
    }
    if (prevProps.navigation.state.params.additionalDefects !== navigation.state.params.additionalDefects) {
      // this.swiper.scrollBy((showPhotos ? photos : defects).length - activePreviewIndex, 0);
      this.setState(({ defects }) => ({ defects: defects.concat(navigation.state.params.additionalDefects), activePreviewIndex: 0 }));
    }
  }

  renderFormField = ({ item: { key, description } }: { key: string, description: string }) => {
    let callback;
    const isLocationField = description === constants.itemForm.location;
    const isCoordinatesField = description === constants.itemForm.coordinates;
    if (includes(description, modalFields)) callback = this.handleToggleModal;
    if (includes(description, dateFields)) callback = this.handleToggleDateTimePicker;

    return (
      <Input
        isWhite
        customKey={key}
        blurOnSubmit={false}
        value={this.state[key]}
        containerCallback={callback}
        disabled={isCoordinatesField}
        type={{ label: description }}
        placeholder={isLocationField ? constants.placeHolders.place : null}
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

  renderPreviewPhotoBarItem = ({ item: { base64 }, index }: PhotosProps) => (
    base64 === '' ? (
      <TouchableOpacity style={styles.addPhotoBarButton} onPress={this.handleAddPhoto}>
        <IonIcon
          size={26}
          {...iconProps}
          name="ios-add-circle"
          color={colors.border}
        />
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
        <TouchableOpacity style={styles.photoImageContainer} onPress={() => this.handleSetIndexPreview(index)}>
          <Image style={styles.photoImage} source={{ uri: `data:image/jpeg;base64,${base64}` }} />
        </TouchableOpacity>
      </View>
    )
  );

  handleAddPhoto = () => {
    const { navigation } = this.props;
    const { showPhotos } = this.state;
    navigation.push(showPhotos ? SCENE_NAMES.AddItemPhotosSceneName : SCENE_NAMES.AddItemDefectsSceneName, { from: SCENE_NAMES.AddItemPhotosSceneName });
  }

  handleRemovePreviewPhotoBarItem = async (index: number) => {
    const { navigation } = this.props;
    const { showPhotos } = this.state;
    const currentlyActive = showPhotos ? 'photos' : 'defects';
    const { uri } = this.state[currentlyActive][index];

    try {
      RNFS.unlink(uri);
    } catch (error) {
      Alert.alert(error.message);
    }

    this.setState(
      state => assoc(currentlyActive, remove(index, 1, state[currentlyActive]), state),
      () => navigation.setParams({ [currentlyActive]: this.state[currentlyActive] }),
    );
  };

  handleToggleDateTimePicker = (key: string) => this.setState(
    ({ isDateTimePickerOpened }) => ({
      isDateTimePickerOpened: !isDateTimePickerOpened,
      currentlyEditableDate: key,
    }),
  );

  handleToggleModal = () => this.setState(({ isModalOpened }) => ({ isModalOpened: !isModalOpened }));

  handleChooseDate = (date: Date) => this.setState(({ currentlyEditableDate }) => ({
    currentlyEditableDate: null,
    isDateTimePickerOpened: false,
    [currentlyEditableDate]: `${currentlyEditableDate === 'warrantyPeriod' ? 'До ' : ''}${dayjs(
      new Date(date),
    ).format(constants.formats.newItemDates)}`,
  }));

  handleSwipePreview = (index: number) => this.setState({ activePreviewIndex: index });

  handleSetIndexPreview = (newIndex: number) => {
    const { activePreviewIndex } = this.state;
    this.handleSwipePreview(newIndex);
    this.swiper.scrollBy(newIndex - activePreviewIndex, false);
  }

  showPhotos = () => this.setState({ showPhotos: true, activePreviewIndex: 0 });

  showDefects = () => this.setState({ showPhotos: false, activePreviewIndex: 0 });

  renderModalItem = ({ item }) => (
    <TouchableOpacity style={styles.modalItem}>
      <Text style={styles.modalItemText}>{item}</Text>
    </TouchableOpacity>
  );

  renderModalSeparator = () => <View style={styles.modalSeparator} />;

  render() {
    const {
      photos,
      defects,
      sections,
      showPhotos,
      isModalOpened,
      activePreviewIndex,
      isDateTimePickerOpened,
    } = this.state;
    const currentTypeIsEmpty = (showPhotos && isEmpty(photos)) || (!showPhotos && isEmpty(defects));
    return (
      <SafeAreaView style={styles.container}>
        <ScrollViewContainer
          bottomOffset={0}
          extraHeight={215}
          style={styles.container}
        >
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
              {currentTypeIsEmpty ? <NoItems additional onPress={this.handleAddPhoto} /> : (
                <Swiper
                  ref={ref => {
                    this.swiper = ref;
                  }}
                  loop={false}
                  showsPagination={false}
                  index={activePreviewIndex}
                  onIndexChanged={this.handleSwipePreview}
                >
                  {(showPhotos ? photos : defects).map((photo, index) => (
                    <Image
                      key={photo.base64}
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
                />
                <Text style={styles.previewInfoText}>
                  {currentTypeIsEmpty
                    ? '0/0'
                    : `${activePreviewIndex + 1} / ${showPhotos ? photos.length : defects.length}`}
                </Text>
              </View>
            </Fragment>
          </View>
          <FlatList
            horizontal
            style={styles.photosOuter}
            data={showPhotos ? photos.concat({base64: ''}) : defects.concat({ base64:'' })}
            showsHorizontalScrollIndicator={false}
            renderItem={this.renderPreviewPhotoBarItem}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={[styles.photosInner, styles.previewPhotoBar, isEmpty(showPhotos ? photos : defects) && styles.hide]}
          />
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
            confirmTextIOS={constants.buttonTitles.ready}
            confirmTextStyle={styles.dateTimePickerConfirmText}
            customCancelButtonIOS={
              <CustomCancelDateTimePickerButton onCancel={this.handleToggleDateTimePicker} />
            }
          />
          <Modal
            isVisible={isModalOpened}
            style={styles.modalOverlay}
            onBackButtonPress={this.handleToggleModal}
          >
            <View style={styles.modalContainer}>
              <FlatList
                data={['adf', 'adf', 'adf', 'adf', 'adf', 'adf', 'adf', 'adf', 'adf', 'adf']}
                renderItem={this.renderModalItem}
                ItemSeparatorComponent={this.renderModalSeparator}
              />
            </View>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.modalCancel}
              onPress={this.handleToggleModal}
            >
              <Text style={styles.modalCancelText}>{constants.buttonTitles.cancel}</Text>
            </TouchableOpacity>
          </Modal>
        </ScrollViewContainer>
      </SafeAreaView>
    );
  }
}

export default ItemForm;
