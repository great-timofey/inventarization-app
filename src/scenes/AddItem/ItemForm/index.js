//  @flow

import React, { Component, Fragment } from 'react';
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

import { StackActions } from 'react-navigation';
import { compose, graphql } from 'react-apollo';
// $FlowFixMe
import { keys, drop, isEmpty, pick, includes, remove } from 'ramda';
import dayjs from 'dayjs';
import RNFS from 'react-native-fs';
import IonIcon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { isIphoneX } from '~/global/device';
import { GET_COMPANY_ASSETS } from '~/graphql/assets/queries';
import { CREATE_ASSET, UPDATE_ASSET } from '~/graphql/assets/mutations';
import { isSmallDevice, convertToApolloUpload } from '~/global/utils';
import colors from '~/global/colors';
import assets from '~/global/assets';
import Input from '~/components/Input';
import constants from '~/global/constants';
import Carousel from '~/components/Carousel';
import * as QUERIES from '~/graphql/auth/queries';
import * as SCENE_NAMES from '~/navigation/scenes';
import ChooseModal from '~/components/ChooseModal';
import InventoryIcon from '~/assets/InventoryIcon';
import DateTimePicker from '~/components/DateTimePicker';
import HeaderBackButton from '~/components/HeaderBackButton';

import type { Props, State, PhotosProps, PreviewProps, Section } from './types';
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

const HeaderPencilButton = ({ onPress }: { onPress: Function }) => (
  <InventoryIcon.Button
    size={25}
    name="pencil"
    {...iconProps}
    onPress={onPress}
    color={colors.accent}
    style={styles.pencilIcon}
  />
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

class ItemForm extends Component<Props, State> {
  static navigationOptions = ({ navigation }: Props) => {
    const item = navigation.state.params && navigation.state.params.item;
    const userCanDelete = navigation.state.params && navigation.state.params.userCanDelete;
    const userCanEdit = navigation.state.params && navigation.state.params.userCanEdit;
    const headerText = navigation.state.params && navigation.state.params.headerText;
    const toggleEditMode = navigation.state.params && navigation.state.params.toggleEditMode;
    const inEditMode = navigation.state.params && navigation.state.params.inEditMode;

    return {
      headerStyle: styles.header,
      title: inEditMode
        ? constants.headers.modifyingItem
        : headerText || constants.headers.addingItem,
      headerTitleStyle: styles.headerTitleStyle,
      headerLeft: (
        <HeaderBackButton
          onPress={
            item
              ? () => {
                const resetAction = StackActions.popToTop({});
                navigation.dispatch(resetAction);
                navigation.navigate(SCENE_NAMES.ItemsSceneName);
              }
              : () => navigation.goBack()
          }
        />
      ),
      headerRight: (
        <View style={styles.headerRightButtonsContainer}>
          {userCanEdit && !inEditMode && (
            <HeaderPencilButton
              onPress={() => {
                navigation.setParams({
                  headerText: constants.headers.modifyingItem,
                  userCanEdit: false,
                });
                toggleEditMode();
              }}
            />
          )}
          {userCanDelete && <HeaderTrashButton onPress={() => navigation.goBack()} />}
        </View>
      ),
    };
  };

  state = {
    id: null,
    name: '',
    gps: null,
    // $FlowFixMe
    photos: [],
    creator: null,
    placeId: null,
    codeData: null,
    warnings: {},
    location: null,
    category: null,
    inventoryId: '',
    isNewItem: true,
    showPhotos: true,
    manufacture: null,
    assessedDate: null,
    assessedValue: null,
    purchasePrice: null,
    responsibleId: null,
    // $FlowFixMe
    photosOfDamages: [],
    dateOfPurchase: null,
    isModalOpened: false,
    formIsEditable: false,
    showSaveButton: false,
    activePreviewIndex: 0,
    guaranteeExpires: null,
    onTheBalanceSheet: 'Нет',
    currentlyEditableField: null,
    isDateTimePickerOpened: false,
    sections: constants.itemFormSections,
    status: constants.placeholders.status.onProcessing,
  };

  carousel: any;
  navListener: any;

  componentDidMount() {
    const {
      navigation,
      currentUserId,
      userCompany: { role },
    } = this.props;

    this.navListener = navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
    });

    navigation.setParams({ toggleEditMode: this.toggleEditMode });

    const item = navigation.getParam('item', null);

    if (item) {
      // console.log(item);
      const itemCopy = { ...item };
      const {
        name,
        place,
        status,
        photos,
        creator,
        responsible,
        photosOfDamages,
        onTheBalanceSheet,
      } = item;
      navigation.setParams({ headerText: name });
      const inEditMode = navigation.getParam('inEditMode', false);

      if (inEditMode) {
        this.toggleEditMode();
      }

      if (
        (creator && creator.id === currentUserId && status === 'on_processing')
        || role === constants.roles.admin
      ) {
        navigation.setParams({ userCanDelete: true, userCanEdit: true });
      }

      itemCopy.placeId = place && place.name;
      itemCopy.photos = photos.map(url => ({ uri: url }));
      itemCopy.photosOfDamages = photosOfDamages.map(url => ({ uri: url }));
      itemCopy.responsibleId = responsible;
      itemCopy.status = status === 'on_processing'
        ? constants.placeholders.status.onProcessing
        : constants.placeholders.status.accepted;
      itemCopy.onTheBalanceSheet = onTheBalanceSheet ? 'Да' : 'Нет';

      this.setState(state => ({ ...state, ...itemCopy, isNewItem: false }));
      // console.log(itemCopy);
    } else {
      navigation.setParams({ userCanDelete: true, headerText: constants.headers.addingItem });

      const photos = navigation.getParam('photos', []);
      const codeData = navigation.getParam('codeData', '');
      const photosOfDamages = navigation.getParam('defectPhotos', []);
      const firstPhotoForCoords = photos.length ? photos[0] : photosOfDamages[0];
      const gps = { lat: firstPhotoForCoords.location.lat, lon: firstPhotoForCoords.location.lon };
      this.setState({
        photos,
        photosOfDamages,
        gps,
        showSaveButton: true,
        formIsEditable: true,
        codeData,
      });
    }
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
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState(({ photos }) => ({
        showSaveButton: true,
        activePreviewIndex: 0,
        photos: photos.concat(navigation.state.params.additionalPhotos),
      }));
    } else if (
      prevProps.navigation.state.params.additionalDefects
      !== navigation.state.params.additionalDefects
    ) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState(({ photosOfDamages }) => ({
        showSaveButton: true,
        activePreviewIndex: 0,
        photosOfDamages: photosOfDamages.concat(navigation.state.params.additionalDefects),
      }));
    }
  }

  toggleEditMode = () => {
    this.setState({ showSaveButton: true, formIsEditable: true });
  };

  checkFields = () => {
    const { name, inventoryId } = this.state;
    const warnings = {};

    // $FlowFixMe
    if (!name.trim()) {
      warnings.name = 1;
    }

    // $FlowFixMe
    if (!inventoryId.trim()) {
      warnings.inventoryId = 'empty';
    }

    /*

    if (...somethingFromBackend) {
      warnings.push(['inventoryId', 'inventoryIdAlreadyInUse']);
    }

    */

    this.setState({ warnings });
  };

  checkForErrors = () => {
    const {
      state: { warnings },
    } = this;
    return !!keys(warnings).length;
  };

  handleSubmitForm = async () => {
    /**
     * 'Promise.resolve' and 'await' below used because of async setState
     * in this.checkFields and this.checkForErrors
     */

    const { createAsset, updateAsset } = this.props;
    const { photos, photosOfDamages, id: assetId } = this.state;

    const isFormInvalid = await Promise.resolve()
      .then(() => this.checkFields())
      .then(() => this.checkForErrors());

    if (!isFormInvalid) {
      const {
        userCompany: {
          company: { id: companyId },
        },
      } = this.props;

      let variables;

      if (assetId) {
        // $FlowFixMe
        variables = pick(constants.createAssetNecessaryProperties.concat('id'), this.state);
      } else {
        // $FlowFixMe
        variables = pick(constants.createAssetNecessaryProperties, this.state);
      }

      variables.companyId = companyId;
      // $FlowFixMe
      variables.name = variables.name.trim();
      variables.onTheBalanceSheet = variables.onTheBalanceSheet === 'Да';

      if (variables.description) {
        // $FlowFixMe
        variables.description = variables.description.trim();
      }
      if (variables.assessedValue) {
        // $FlowFixMe
        variables.assessedValue = Number.parseFloat(drop(2, variables.assessedValue));
      }
      if (variables.purchasePrice) {
        // $FlowFixMe
        variables.purchasePrice = Number.parseFloat(drop(2, variables.purchasePrice));
      }
      if (variables.responsibleId) {
        // $FlowFixMe
        variables.responsibleId = variables.responsibleId.id;
      }
      if (variables.placeId) {
        // $FlowFixMe
        variables.placeId = variables.placeId.id;
      }
      if (variables.dateOfPurchase) {
        variables.dateOfPurchase = dayjs(variables.dateOfPurchase).format(
          constants.formats.createAssetDates,
        );
      }
      if (variables.guaranteeExpires) {
        variables.guaranteeExpires = dayjs(variables.guaranteeExpires).format(
          constants.formats.createAssetDates,
        );
      }
      if (variables.assessedDate) {
        variables.assessedDate = dayjs(variables.assessedDate).format(
          constants.formats.createAssetDates,
        );
      }
      if (variables.status) {
        variables.status = variables.status === constants.placeholders.status.accepted
          ? 'accepted'
          : 'on_processing';
      }

      try {
        const photosResult = await convertToApolloUpload(photos, '.');
        variables.photos = photosResult;
      } catch (error) {
        console.log(error.message);
      }

      try {
        const defectsResult = await convertToApolloUpload(photosOfDamages, '.');
        variables.photosOfDamages = defectsResult;
      } catch (error) {
        console.log(error.message);
      }

      // console.log(variables);
      try {
        // let response;
        if (assetId) {
          // response = await updateAsset({ variables });
          await updateAsset({ variables });
        } else {
          // response = await createAsset({ variables });
          await createAsset({ variables });
        }
        // console.log(response);
      } catch (error) {
        Alert.alert(error.message);
        console.dir(error);
      }
    }
  };

  renderFormField = ({ item: { key, description, placeholder, ...rest } }: PreviewProps) => {
    const {
      props: { userCompany },
      state: { warnings: stateWarnings, responsibleId, formIsEditable, isNewItem },
      state,
    } = this;
    const { role: userRole, currentUserId } = userCompany;

    let callback;
    let itemMask;
    let itemWarning;
    let customValue;
    const isStatusField = description === constants.itemForm.status;
    const isDescriptionField = description === constants.itemForm.description;

    if (formIsEditable || isNewItem) {
      if (includes(description, constants.fieldTypes.modalFields)) {
        callback = fieldKey => this.handleOpenModal(fieldKey);
      } else if (includes(description, constants.fieldTypes.dateFields)) {
        callback = this.handleOpenDateTimePicker;
      } else if (
        includes(description, constants.fieldTypes.nonEditableFields)
        || (description === constants.itemFormFields.onTheBalanceSheet
          && userRole !== constants.roles.admin)
      ) {
        callback = () => {};
      }
    }

    if (includes(description, constants.fieldTypes.currencyFields)) {
      itemMask = constants.masks.price;
    }
    if (includes(description, constants.fieldTypes.modalFields)) {
      callback = fieldKey => this.handleOpenModal(fieldKey);
    } else if (includes(description, constants.fieldTypes.dateFields)) {
      callback = this.handleOpenDateTimePicker;
    }

    if (description === constants.itemForm.inventoryId) {
      // $FlowFixMe
      const { warnings } = rest;
      itemWarning = warnings[stateWarnings[key]];
    } else if (description === constants.itemForm.name) {
      // $FlowFixMe
      const { warning } = rest;
      itemWarning = warning;
    } else if (description === constants.itemForm.gps) {
      const { gps } = this.state;
      // $FlowFixMe
      customValue = `${gps.lat}, ${gps.lon}`;
    } else if (description === constants.itemForm.guaranteeExpires) {
      customValue = state[key]
        ? `До ${dayjs(state[key]).format(constants.formats.newItemDates)}`
        : null;
    } else if (
      description === constants.itemForm.dateOfPurchase
      || description === constants.itemForm.assessedDate
    ) {
      customValue = state[key] ? dayjs(state[key]).format(constants.formats.newItemDates) : null;
    } else if (description === constants.itemForm.company) {
      customValue = userCompany.company.name || ' ';
    } else if (description === constants.itemForm.responsibleId) {
      // $FlowFixMe
      customValue = state[key] ? responsibleId.fullName : null;
    } else if (description === constants.itemForm.placeId) {
      // $FlowFixMe
      customValue = state[key] ? state.placeId.name : null;
    }

    return (
      <Input
        isWhite
        customKey={key}
        mask={itemMask}
        blurOnSubmit={false}
        containerCallback={callback}
        isMultiline={isDescriptionField}
        value={customValue || state[key]}
        maxLength={isDescriptionField ? 250 : 50}
        showWarningInTitle={key === 'inventoryId'}
        isWarning={includes(key, keys(stateWarnings))}
        type={{ label: description, warning: itemWarning }}
        onChangeText={text => this.handleChangeField(key, text)}
        isBackgroundTransparent={
          userRole === constants.roles.observer
          || (responsibleId && responsibleId.id === currentUserId)
        }
        placeholder={isStatusField ? placeholder.onProcessing : placeholder}
      />
    );
  };

  renderFormSectionHeader = ({ section: { title, index } }: { section: Section }) => (
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

  renderPreviewPhotoBarItem = ({ item: { uri }, index }: PhotosProps) => {
    const {
      state: { isNewItem, creator, status },
      props: {
        currentUserId,
        userCompany: { role: userRole },
      },
    } = this;

    const isLocalFile = uri.startsWith('file');

    const isUserCreator = creator
      && creator.id === currentUserId
      && status === constants.placeholders.status.onProcessing;
    const showRemoveButton = isNewItem || userRole === constants.roles.admin || isUserCreator;

    let showAddPhotoButton = false;
    if (!uri && isNewItem) {
      showAddPhotoButton = true;
    } else if (!uri && userRole === constants.roles.admin) {
      showAddPhotoButton = true;
    } else if (
      !uri
      && (userRole === constants.roles.manager || userRole === constants.roles.employee)
    ) {
      if (isUserCreator) {
        showAddPhotoButton = true;
      }
    }

    return showAddPhotoButton ? (
      <TouchableOpacity style={styles.addPhotoBarButton} onPress={this.handleAddPhoto}>
        <IonIcon size={26} {...iconProps} name="ios-add-circle" color={colors.border} />
      </TouchableOpacity>
    ) : (
      <View style={styles.photoContainer}>
        {showRemoveButton && (
          <TouchableOpacity
            activeOpacity={0.5}
            style={[styles.removePhotoIcon, isSmallDevice && styles.smallerIcon]}
            onPress={() => this.handleRemovePreviewPhotoBarItem(index, isLocalFile)}
          >
            <Image source={assets.deletePhoto} />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.photoImageContainer}
          onPress={() => this.handleSetIndexPreview(index)}
        >
          {uri !== '' && <Image style={styles.photoImage} source={{ uri }} />}
        </TouchableOpacity>
      </View>
    );
  };

  handleAddPhoto = () => {
    const { navigation } = this.props;
    const { showPhotos } = this.state;
    navigation.push(
      showPhotos ? SCENE_NAMES.AddItemPhotosSceneName : SCENE_NAMES.AddItemDefectsSceneName,
      { from: SCENE_NAMES.AddItemPhotosSceneName },
    );
  };

  handleRemovePreviewPhotoBarItem = async (removedIndex: number, isLocalFile: boolean) => {
    const {
      state,
      state: { showPhotos, activePreviewIndex },
    } = this;
    const currentlyActive = showPhotos ? 'photos' : 'photosOfDamages';
    // $FlowFixMe
    const { uri } = state[currentlyActive][removedIndex];

    if (isLocalFile) {
      try {
        RNFS.unlink(uri);
      } catch (error) {
        Alert.alert(error.message);
      }
    }

    this.setState(currentState => ({
      showSaveButton: true,
      [currentlyActive]: remove(removedIndex, 1, currentState[currentlyActive]),
      activePreviewIndex:
        removedIndex <= activePreviewIndex && activePreviewIndex > 0
          ? currentState.activePreviewIndex - 1
          : currentState.activePreviewIndex,
    }));
  };

  handleOpenDateTimePicker = (key: string) => this.setState({
    isDateTimePickerOpened: true,
    currentlyEditableField: key,
  });

  handleCloseDateTimePicker = () => this.setState({
    isDateTimePickerOpened: false,
    currentlyEditableField: null,
  });

  handleOpenModal = (field: string) => this.setState({
    isModalOpened: true,
    currentlyEditableField: field,
  });

  handleCloseModal = () => this.setState({
    isModalOpened: false,
    currentlyEditableField: null,
  });

  handleConfirmModal = (option: string) => {
    this.setState(({ isModalOpened, currentlyEditableField }) => ({
      isModalOpened: !isModalOpened,
      // $FlowFixMe
      [currentlyEditableField]: option,
      currentlyEditableField: null,
    }));
  };

  handleChooseDate = (date: Date) => this.setState(({ currentlyEditableField }) => ({
    isDateTimePickerOpened: false,
    // $FlowFixMe
    [currentlyEditableField]: new Date(date),
    currentlyEditableField: null,
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

  keyExtractor = ({ uri }, index) => uri || index.toString();

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
      userCompany: {
        company: { id: companyId },
        role: userRole,
      },
      userId: currentUserId,
    } = this.props;

    const {
      name,
      photos,
      creator,
      warnings,
      sections,
      isNewItem,
      showPhotos,
      isModalOpened,
      formIsEditable,
      showSaveButton,
      photosOfDamages,
      activePreviewIndex,
      currentlyEditableField,
      isDateTimePickerOpened,
    } = this.state;

    // eslint-disable-next-line
    const currentTypeIsEmpty =
      (showPhotos && isEmpty(photos)) || (!showPhotos && isEmpty(photosOfDamages));

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
                  <NoItems
                    additional={
                      isNewItem
                      || userRole === constants.roles.admin
                      //  $FlowFixMe
                      || (creator && creator.id === currentUserId)
                    }
                    onPress={this.handleAddPhoto}
                  />
                ) : (
                  <Carousel
                    innerRef={(ref) => {
                      this.carousel = ref;
                    }}
                    index={activePreviewIndex}
                    // $FlowFixMe
                    data={showPhotos ? photos : photosOfDamages}
                    onIndexChanged={this.handleSwipePreview}
                    //  use custom key for correct rerendering of carousel component
                    key={(showPhotos ? photos : photosOfDamages).length + (showPhotos ? 'p' : 'd')}
                  />
                )}
                <View style={styles.previewInfo}>
                  <InventoryIcon size={16} name="photo" {...iconProps} color={colors.black} />
                  <Text style={styles.previewInfoText}>
                    {currentTypeIsEmpty
                      ? '0/0'
                      : `${activePreviewIndex + 1} / ${
                        showPhotos ? photos.length : photosOfDamages.length
                      }`}
                  </Text>
                </View>
              </Fragment>
            </View>
            <FlatList
              horizontal
              style={styles.photosOuter}
              keyExtractor={this.keyExtractor}
              showsHorizontalScrollIndicator={false}
              // $FlowFixMe
              renderItem={this.renderPreviewPhotoBarItem}
              contentContainerStyle={[
                styles.photosInner,
                styles.previewPhotoBar,
                isEmpty(showPhotos ? photos : photosOfDamages) && styles.hide,
              ]}
              data={showPhotos ? photos.concat({ uri: '' }) : photosOfDamages.concat({ uri: '' })}
            />
            <View
              style={styles.formContainer}
              pointerEvents={formIsEditable === false ? 'none' : undefined}
            >
              <View style={styles.formName}>
                <View style={styles.formNameTitleContainer}>
                  <Text style={styles.formNameHint}>{constants.hints.name}</Text>
                  <Text
                    style={[styles.formNameError, includes('name', keys(warnings)) && styles.show]}
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
                keyExtractor={({ key }) => key}
                renderItem={this.renderFormField}
                renderSectionHeader={this.renderFormSectionHeader}
                contentContainerStyle={styles.formSectionListContainer}
              />
            </View>
            {(showSaveButton || isNewItem) && (
              <TouchableOpacity style={styles.saveItem} onPress={this.handleSubmitForm}>
                <Text style={styles.saveItemText}>
                  {isNewItem ? constants.buttonTitles.saveItem : constants.buttonTitles.saveChanges}
                </Text>
              </TouchableOpacity>
            )}
            <DateTimePicker
              onConfirm={this.handleChooseDate}
              isVisible={isDateTimePickerOpened}
              onCancel={this.handleCloseDateTimePicker}
            />
            {/* $FlowFixMe */}
            <ChooseModal
              companyId={companyId}
              isVisible={isModalOpened}
              // $FlowFixMe
              type={currentlyEditableField}
              onCancel={this.handleCloseModal}
              onConfirm={this.handleConfirmModal}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
export default compose(
  graphql(QUERIES.GET_CURRENT_USER_COMPANY_CLIENT, {
    // $FlowFixMe
    props: ({ data: { userCompany } }) => ({ userCompany }),
  }),
  graphql(QUERIES.GET_USER_ID_CLIENT, {
    // $FlowFixMe
    props: ({ data: { id } }) => ({ currentUserId: id }),
  }),
  graphql(CREATE_ASSET, { name: 'createAsset' }),
  graphql(UPDATE_ASSET, { name: 'updateAsset', refetchQueries: [GET_COMPANY_ASSETS] }),
)(ItemForm);
