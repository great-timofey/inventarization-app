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

import { compose, graphql, withApollo } from 'react-apollo';
// $FlowFixMe
import { keys, find, propEq, drop, isEmpty, pluck, pick, includes, remove, findIndex } from 'ramda';
import dayjs from 'dayjs';
import RNFS from 'react-native-fs';
import IonIcon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { isIphoneX } from '~/global/device';
import { isSmallDevice, convertToApolloUpload, normalize } from '~/global/utils';
import colors from '~/global/colors';
import assets from '~/global/assets';
import Input from '~/components/Input';
import constants from '~/global/constants';
import Carousel from '~/components/Carousel';
import DelModal from '~/components/QuestionModal';
import * as SCENE_NAMES from '~/navigation/scenes';
import * as AUTH_QUERIES from '~/graphql/auth/queries';
import * as ASSETS_QUERIES from '~/graphql/assets/queries';
import * as ASSETS_MUTATIONS from '~/graphql/assets/mutations';
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
    const userCanDelete = navigation.state.params && navigation.state.params.userCanDelete;
    const userCanEdit = navigation.state.params && navigation.state.params.userCanEdit;
    const headerText = navigation.state.params && navigation.state.params.headerText;
    const toggleEditMode = navigation.state.params && navigation.state.params.toggleEditMode;
    const toggleDelModal = navigation.state.params && navigation.state.params.toggleDelModal;
    const handleGoBack = navigation.state.params && navigation.state.params.handleGoBack;
    const inEditMode = navigation.state.params && navigation.state.params.inEditMode;

    return {
      headerStyle: styles.header,
      title: inEditMode
        ? constants.headers.modifyingItem
        : headerText || constants.headers.addingItem,
      headerTitleStyle: styles.headerTitleStyle,
      headerLeft: (
        <HeaderBackButton onPress={handleGoBack} />
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
          {userCanDelete && <HeaderTrashButton onPress={toggleDelModal} />}
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
    warnings: {},
    creator: null,
    placeId: null,
    codeData: null,
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
    isDelModalOpened: false,
    onTheBalanceSheet: 'Нет',
    currentlyEditableField: null,
    isDateTimePickerOpened: false,
    sections: constants.itemFormSections,
    status: constants.placeholders.status.onProcessing,
  };

  carousel: any;
  navListener: any;
  keyboardRef: any;

  componentDidMount() {
    const {
      navigation,
      currentUser,
      currentUserId,
      userCompany: { role: userRole },
    } = this.props;

    this.navListener = navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
    });

    navigation.setParams({
      handleGoBack: this.handleGoBack,
      toggleEditMode: this.toggleEditMode,
      toggleDelModal: this.handleToggleDelModal,
    });

    const item = navigation.getParam('item', null);

    if (item) {
      // console.log(item);
      const itemCopy = { ...item };
      const {
        gps,
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

      const isUserAdmin = userRole === constants.roles.admin;
      const isUserManager = userRole === constants.roles.manager;
      const isUserCreator = creator && creator.id === currentUserId;
      const isItemInProcessing = status === 'on_processing';

      if ((isUserCreator && isItemInProcessing && !isUserManager) || isUserAdmin) {
        navigation.setParams({ userCanDelete: true, userCanEdit: true });
      } else if (isUserManager) {
        //  $FlowFixMe
        const { createdPlaces = [], responsiblePlaces = [] } = currentUser;
        const userPlaces = [...createdPlaces, ...responsiblePlaces];
        const placesIds = pluck('id', userPlaces);
        const isItemInResponsiblePlaces = includes(item.place && item.place.id, placesIds);
        const isUserResponsible = item && item.responsible && item.responsible.id === currentUserId;

        const userCanDelete = isItemInResponsiblePlaces || isUserResponsible;
        const userCanEdit = userCanDelete;

        navigation.setParams({ userCanDelete, userCanEdit });
      }

      itemCopy.placeId = place;
      itemCopy.photos = (photos && photos.map(url => ({ uri: url }))) || [];
      //  eslint-disable-next-line
      itemCopy.photosOfDamages =
        (photosOfDamages && photosOfDamages.map(url => ({ uri: url }))) || [];
      itemCopy.responsibleId = responsible;
      itemCopy.gps = { lat: gps.lat, lon: gps.lon };
      itemCopy.status = status === 'on_processing'
        ? constants.placeholders.status.onProcessing
        : constants.placeholders.status.accepted;
      itemCopy.onTheBalanceSheet = onTheBalanceSheet ? 'Да' : 'Нет';

      this.setState(state => ({ ...state, ...itemCopy, isNewItem: false }));
      // console.log(itemCopy);
    } else {
      navigation.setParams({ userCanDelete: true, headerText: constants.headers.addingItem });

      const showName = navigation.getParam('showName', true);
      const id = navigation.getParam('creationId', '');
      const inventoryId = navigation.getParam('inventoryId', '');

      const { createdAssetsCount } = this.props;
      const name = showName ? `Предмет ${createdAssetsCount}` : '';
      const photos = navigation.getParam('photos', []);
      const codeData = navigation.getParam('codeData', '');
      const photosOfDamages = navigation.getParam('defectPhotos', []);
      const firstPhotoForCoords = photos.length ? photos[0] : photosOfDamages[0];
      const gps = { lat: firstPhotoForCoords.location.lat, lon: firstPhotoForCoords.location.lon };

      this.setState({
        id,
        gps,
        name,
        photos,
        codeData,
        inventoryId,
        photosOfDamages,
        showSaveButton: true,
        formIsEditable: true,
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
    const {
      props: {
        client,
        userCompany: {
          company: { id: companyId },
        },
      },
      state: { name, inventoryId, id },
    } = this;

    const warnings = {};

    // $FlowFixMe
    if (!name.trim()) {
      warnings.name = 1;
    }

    // $FlowFixMe
    if (!inventoryId.trim()) {
      warnings.inventoryId = 'empty';
    }

    const data = client.cache.readQuery({ query: ASSETS_QUERIES.GET_COMPANY_ASSETS, variables: { companyId } });
    const match = data.assets.find(asset => asset.id !== id && inventoryId === asset.inventoryId);

    if (match) {
      warnings.inventoryId = 'inUse';
    }

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

    const {
      props: { updateAsset, navigation },
      state: { photos, photosOfDamages, id: assetId },
    } = this;

    const isFormInvalid = await Promise.resolve()
      .then(() => this.checkFields())
      .then(() => this.checkForErrors());

    if (isFormInvalid) {
      this.keyboardRef.scrollTo({ x: 0, y: normalize(390), animated: true });
    } else {
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
        await updateAsset({ variables });
        navigation.navigate(SCENE_NAMES.ItemsSceneName);
      } catch (error) {
        Alert.alert(error.message);
      }
    }
  };

  handleGoBack = () => {
    const { props: { navigation }, state: { name } } = this;
    const isNewItem = navigation.getParam('item', null);
    if (!name.trim() && !isNewItem) {
      Alert.alert('Пожалуйста, введите название предмета');
    } else if (isNewItem) {
      navigation.pop();
    } else {
      navigation.popToTop({});
      navigation.navigate(SCENE_NAMES.ItemsSceneName);
    }
  };

  updateDestroyAsset = (cache: Object) => {
    const {
      props: {
        userCompany: {
          company: { id: companyId },
        },
      },
      state: { id },
    } = this;
    const data = cache.readQuery({ query: ASSETS_QUERIES.GET_COMPANY_ASSETS, variables: { companyId } });
    const deleteIndex = findIndex(asset => asset.id === id, data.assets);
    data.assets = remove(deleteIndex, 1, data.assets);
    cache.writeQuery({ query: ASSETS_QUERIES.GET_COMPANY_ASSETS, variables: { companyId }, data });
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

    const isUserAdmin = userRole === constants.roles.admin;
    const isUserManager = userRole === constants.roles.manager;
    const isUserEmployee = userRole === constants.roles.employee;
    const isUserCreator = creator
      && creator.id === currentUserId
      && status === constants.placeholders.status.onProcessing;

    let showRemoveButton = false;
    let showAddPhotoButton = false;

    if (isUserAdmin) {
      if (!uri) {
        showAddPhotoButton = true;
      } else {
        showRemoveButton = true;
      }
    } else if (isUserEmployee) {
      if (isNewItem || isUserCreator) {
        if (!uri) {
          showAddPhotoButton = true;
        } else {
          showRemoveButton = true;
        }
      }
    } else if (isUserManager) {
      const { placeId, responsibleId } = this.state;
      const { currentUser } = this.props;
      //  $FlowFixMe
      const { createdPlaces = [], responsiblePlaces = [] } = currentUser;
      const userPlaces = [...createdPlaces, ...responsiblePlaces];
      const placesIds = pluck('id', userPlaces);
      //  $FlowFixMe
      const isItemInResponsiblePlaces = includes(placeId && placeId.id, placesIds);
      const isUserResponsible = responsibleId && responsibleId.id === currentUserId;
      if (!uri) {
        showAddPhotoButton = isNewItem ? true : isItemInResponsiblePlaces || isUserResponsible;
      } else {
        showRemoveButton = isNewItem ? true : isItemInResponsiblePlaces || isUserResponsible;
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

  handleDeleteItem = async () => {
    const {
      state: { id },
      props: { destroyAsset, navigation },
    } = this;
    const navigateFromItemsScene = navigation.getParam('item', null);

    try {
      await destroyAsset({ variables: { id }, update: this.updateDestroyAsset });
      this.handleToggleDelModal();
      if (navigateFromItemsScene) {
        navigation.navigate(SCENE_NAMES.ItemsSceneName);
      } else {
        navigation.pop();
      }
    } catch (error) {
      Alert.alert(error.message);
      this.handleToggleDelModal();
    }
  };

  // eslint-disable-next-line
  handleToggleDelModal = () => this.setState(({ isDelModalOpened }) => ({ isDelModalOpened: !isDelModalOpened }));

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
      navigation,
    } = this.props;

    const {
      name,
      photos,
      warnings,
      sections,
      isNewItem,
      showPhotos,
      isModalOpened,
      formIsEditable,
      showSaveButton,
      photosOfDamages,
      isDelModalOpened,
      activePreviewIndex,
      currentlyEditableField,
      isDateTimePickerOpened,
    } = this.state;

    // eslint-disable-next-line
    const currentTypeIsEmpty =
      (showPhotos && isEmpty(photos)) || (!showPhotos && isEmpty(photosOfDamages));

    const userCanDelete = navigation.getParam('userCanDelete', false);

    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior="padding"
          style={styles.container}
          keyboardVerticalOffset={isIphoneX ? 85 : 60}
        >
          <ScrollView
            ref={(ref) => {
              this.keyboardRef = ref;
            }}
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
                {currentTypeIsEmpty ? (
                  <NoItems
                    additional={
                      isNewItem || userCanDelete || userRole === constants.roles.admin
                      //  $FlowFixMe
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
            <DelModal
              //  $FlowFixMe
              isModalVisible={isDelModalOpened}
              data={constants.modalQuestion.itemDel}
              //  $FlowFixMe
              rightAction={this.handleDeleteItem}
              leftAction={this.handleToggleDelModal}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
export default compose(
  graphql(AUTH_QUERIES.GET_CURRENT_USER_COMPANY_CLIENT, {
    // $FlowFixMe
    props: ({ data: { userCompany } }) => ({ userCompany }),
  }),
  graphql(AUTH_QUERIES.GET_USER_ID_CLIENT, {
    // $FlowFixMe
    props: ({ data: { id } }) => ({ currentUserId: id }),
  }),
  graphql(ASSETS_MUTATIONS.CREATE_ASSET, { name: 'createAsset' }),
  graphql(ASSETS_MUTATIONS.UPDATE_ASSET, { name: 'updateAsset' }),
  graphql(ASSETS_MUTATIONS.DESTROY_ASSET, { name: 'destroyAsset' }),
  graphql(ASSETS_QUERIES.GET_CREATED_ASSETS_COUNT_CLIENT, {
    // $FlowFixMe
    props: ({ data: { createdAssetsCount } }) => ({ createdAssetsCount }),
  }),
  graphql(AUTH_QUERIES.GET_CURRENT_USER_PLACES, {
    // $FlowFixMe
    props: ({ data: { current } }) => ({ currentUser: current }),
  }),
  withApollo,
)(ItemForm);
