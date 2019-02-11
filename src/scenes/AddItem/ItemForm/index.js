//  @flow

import React, { Component, Fragment } from 'react';
import {
  Text,
  View,
  Image,
  Alert,
  FlatList,
  Keyboard,
  StatusBar,
  TextInput,
  SectionList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import { compose, graphql, withApollo } from 'react-apollo';
import {
  nth,
  prop,
  keys,
  drop,
  pick,
  pluck,
  concat,
  remove,
  without,
  isEmpty,
  findIndex,
  // $FlowFixMe
  includes,
} from 'ramda';
import dayjs from 'dayjs';
import RNFS from 'react-native-fs';
import IonIcon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { isSmallDevice, normalize, convertToApolloUpload } from '~/global/utils';
import colors from '~/global/colors';
import assets from '~/global/assets';
import Input from '~/components/Input';
import constants from '~/global/constants';
import Carousel from '~/components/Carousel';
import { isIphoneX } from '~/global/device';
import * as SCENE_NAMES from '~/navigation/scenes';
import * as AUTH_QUERIES from '~/graphql/auth/queries';
import * as ASSETS_QUERIES from '~/graphql/assets/queries';
import * as PLACES_QUERIES from '~/graphql/places/queries';
import * as ASSETS_MUTATIONS from '~/graphql/assets/mutations';
import DelModal from '~/components/QuestionModal';
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
      headerLeft: <HeaderBackButton onPress={handleGoBack} customStyle={styles.backButton} />,
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
    warnings: {},
    creator: null,
    placeId: null,
    codeData: null,
    location: null,
    category: null,
    // $FlowFixMe
    photosUrls: [],
    // $FlowFixMe
    photosToAdd: [],
    inventoryId: '',
    isNewItem: true,
    showPhotos: true,
    manufacture: null,
    assessedDate: null,
    assessedValue: null,
    purchasePrice: null,
    responsibleId: null,
    // $FlowFixMe
    dateOfPurchase: null,
    isModalOpened: false,
    formIsEditable: false,
    showSaveButton: false,
    // $FlowFixMe
    photosIdsToRemove: [],
    // $FlowFixMe
    photosOfDamagesToAdd: [],
    activePreviewIndex: 0,
    guaranteeExpires: null,
    isDelModalOpened: false,
    // $FlowFixMe
    photosOfDamagesUrls: [],
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
      StatusBar.setBackgroundColor(colors.white);
    });

    navigation.setParams({
      handleGoBack: this.handleGoBack,
      toggleEditMode: this.toggleEditMode,
      toggleDelModal: this.handleToggleDelModal,
    });

    const item = navigation.getParam('item', null);

    if (item) {
      const itemCopy = { ...item };
      const { gps, name, place, status, creator, responsible, onTheBalanceSheet } = item;
      navigation.setParams({ headerText: name });
      const inEditMode = navigation.getParam('inEditMode', false);

      if (inEditMode) {
        this.toggleEditMode();
      }

      const isUserAdmin = userRole === constants.roles.admin;
      const isUserManager = userRole === constants.roles.manager;
      const isUserCreator = creator && creator.id === currentUserId;
      const isItemInProcessing = status === constants.assetStatuses.onProcessing;

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
      itemCopy.responsibleId = responsible;
      itemCopy.gps = { lat: gps.lat, lon: gps.lon };
      itemCopy.status = status === constants.assetStatuses.onProcessing
        ? constants.placeholders.status.onProcessing
        : constants.placeholders.status.accepted;
      itemCopy.onTheBalanceSheet = onTheBalanceSheet ? constants.words.yes : constants.words.no;

      this.setState(state => ({ ...state, ...itemCopy, isNewItem: false }));
    } else {
      navigation.setParams({ userCanDelete: true, headerText: constants.headers.addingItem });

      const id = navigation.getParam('creationId', '');
      const showName = navigation.getParam('showName', true);
      const inventoryId = navigation.getParam('inventoryId', '');

      const { createdAssetsCount } = this.props;
      const name = showName ? `Предмет ${createdAssetsCount}` : '';
      const location = navigation.getParam('location', '');
      const photosUrls = navigation.getParam('photos', []);
      const codeData = navigation.getParam('codeData', '');
      const gps = { lat: location.lat, lon: location.lon };
      const photosOfDamagesUrls = navigation.getParam('defectPhotos', []);

      this.setState({
        id,
        gps,
        name,
        codeData,
        photosUrls,
        inventoryId,
        photosOfDamagesUrls,
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
      this.setState(({ photosUrls, photosToAdd }) => ({
        showSaveButton: true,
        activePreviewIndex: 0,
        photosUrls: photosUrls.concat(navigation.state.params.additionalPhotos),
        photosToAdd: photosToAdd.concat(navigation.state.params.additionalPhotos),
      }));
    } else if (
      prevProps.navigation.state.params.additionalDefects
      !== navigation.state.params.additionalDefects
    ) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState(({ photosOfDamagesUrls, photosOfDamagesToAdd }) => ({
        showSaveButton: true,
        activePreviewIndex: 0,
        photosOfDamagesUrls: photosOfDamagesUrls.concat(navigation.state.params.additionalDefects),
        photosOfDamagesToAdd: photosOfDamagesToAdd.concat(
          navigation.state.params.additionalDefects,
        ),
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
      state: { name, inventoryId, id, isNewItem },
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

    if (!isNewItem) {
      //  check for existing inventoryId
      const data = client.cache.readQuery({
        query: ASSETS_QUERIES.GET_COMPANY_ASSETS,
        variables: { companyId },
      });
      const match = data.assets.find(asset => asset.id !== id && inventoryId === asset.inventoryId);

      if (match) {
        warnings.inventoryId = 'inUse';
      }
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
      state,
      state: { id: assetId },
      props: { updateAsset, removeAssetPhotos, addPhotosToAsset },
    } = this;

    const isFormInvalid = await Promise.resolve()
      .then(() => this.checkFields())
      .then(() => this.checkForErrors());

    if (isFormInvalid) {
      Keyboard.dismiss();
      this.keyboardRef.scrollToPosition(0, normalize(390), true);
    } else {
      const {
        userCompany: {
          company: { id: companyId },
        },
      } = this.props;

      // $FlowFixMe
      const variables = pick(constants.updateAssetProperties, state);

      variables.companyId = companyId;
      // $FlowFixMe
      variables.name = variables.name.trim();
      variables.onTheBalanceSheet = variables.onTheBalanceSheet === constants.words.yes;

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
          ? constants.assetStatuses.accepted
          : constants.assetStatuses.onProcessing;
      }
      //  TODO: fix choose category bug: after selection it doesnt changing
      if (variables.category) {
        //  $FlowFixMe
        variables.categoryId = variables.category.id;
      }

      //  $FlowFixMe
      if (variables.photosIdsToRemove.length) {
        try {
          await removeAssetPhotos({
            variables: {
              assetId,
              photoIds: variables.photosIdsToRemove,
            },
            update: this.updateRemoveAssetPhoto,
          });
        } catch (error) {
          console.log(error.message);
        }
      }
      delete variables.photosIdsToRemove;

      //  $FlowFixMe
      if (variables.photosToAdd.length + variables.photosOfDamagesToAdd.length) {
        let photos = [];
        let photosOfDamages = [];
        //  $FlowFixMe
        if (variables.photosToAdd.length) {
          try {
            //  $FlowFixMe
            const photosObjs = variables.photosToAdd.map(uri => ({ uri }));
            if (photosObjs.length > 1) {
              photos = await convertToApolloUpload(photosObjs, '.');
            } else {
              const [oneAndOnlyUploadPhoto] = await convertToApolloUpload(photosObjs, '.');
              photos.push(oneAndOnlyUploadPhoto);
            }
          } catch (error) {
            console.log(error.message);
          }
        }

        //  $FlowFixMe
        if (variables.photosOfDamagesToAdd.length) {
          try {
            //  $FlowFixMe
            const photosOfDamagesObjs = variables.photosOfDamagesToAdd.map(uri => ({ uri }));
            if (photosOfDamagesObjs.length > 1) {
              photosOfDamages = await convertToApolloUpload(photosOfDamagesObjs, '.');
            } else {
              const [oneAndOnlyUploadPhoto] = await convertToApolloUpload(photosOfDamagesObjs, '.');
              photosOfDamages.push(oneAndOnlyUploadPhoto);
            }
          } catch (error) {
            console.log(error.message);
          }
        }

        await addPhotosToAsset({ variables: { assetId, photos, photosOfDamages } });
      }

      delete variables.photosToAdd;
      delete variables.photosOfDamagesToAdd;

      try {
        await updateAsset({ variables });
        if (variables.placeId) {
          this.updatePlaceCount(variables.placeId);
        }
        this.handleGoBack();
      } catch (error) {
        Alert.alert(error.message);
      }
    }
  };

  handleGoBack = (afterDeletion: ?boolean) => {
    const {
      props: { navigation },
      state: { name, isNewItem },
    } = this;
    const fromItemsScene = navigation.getParam('item', null);

    if (afterDeletion || isNewItem) {
      navigation.popToTop({});
      navigation.navigate(SCENE_NAMES.ItemsSceneName);
    //  $FlowFixMe
    } else if (!name.trim() && !fromItemsScene) {
      Alert.alert(constants.errors.createItem.name);
    } else if (fromItemsScene) {
      navigation.pop();
      navigation.navigate(SCENE_NAMES.ItemsSceneName);
    }
  };

  updatePlaceCount = (placeId) => {
    const {
      client: {
        cache,
      },
      userCompany: {
        company: {
          id: companyId,
        },
      },
    } = this.props;

    const data = cache.readQuery({
      query: PLACES_QUERIES.GET_COMPANY_PLACES,
      variables: { companyId },
    });

    const placeIndex = findIndex(place => place.id === placeId, data.places);
    data.places[placeIndex].assetsCount += 1;
    cache.writeQuery({ query: PLACES_QUERIES.GET_COMPANY_PLACES, variables: { companyId }, data });
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
    const data = cache.readQuery({
      query: ASSETS_QUERIES.GET_COMPANY_ASSETS,
      variables: { companyId },
    });
    const deleteIndex = findIndex(asset => asset.id === id, data.assets);
    data.assets = remove(deleteIndex, 1, data.assets);
    cache.writeQuery({ query: ASSETS_QUERIES.GET_COMPANY_ASSETS, variables: { companyId }, data });
  };

  updateRemoveAssetPhoto = (cache: Object) => {
    const {
      props: {
        userCompany: {
          company: { id: companyId },
        },
      },
      state: { id, photosIdsToRemove },
    } = this;
    const data = cache.readQuery({
      query: ASSETS_QUERIES.GET_COMPANY_ASSETS,
      variables: { companyId },
    });
    const assetIndex = findIndex(asset => asset.id === id, data.assets);
    //  eslint-disable-next-line
    const photosToRemove = data.assets[assetIndex].photos.nodes.filter(node => includes(node.id, photosIdsToRemove),);
    const urlsToRemove = pluck('photo', photosToRemove);
    data.assets[assetIndex].photosUrls = without(urlsToRemove, data.assets[assetIndex].photosUrls);
    data.assets[assetIndex].photos.nodes = without(
      photosToRemove,
      data.assets[assetIndex].photos.nodes,
    );
    cache.writeQuery({ query: ASSETS_QUERIES.GET_COMPANY_ASSETS, variables: { companyId }, data });
  };

  renderFormField = ({ item: { key, description, placeholder, ...rest } }: PreviewProps) => {
    const {
      props: { userCompany },
      state: {
        warnings: stateWarnings,
        responsibleId,
        formIsEditable,
        isNewItem,
        placeId,
        category,
      },
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
      customValue = state[key] ? placeId.name : null;
    } else if (description === constants.itemForm.category) {
      // $FlowFixMe
      customValue = state[key] ? category.name : null;
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
        start={index === 0 ? { x: 1.0, y: 0.0 } : undefined}
        end={index === 0 ? { x: 0.0, y: 0.0 } : undefined}
        style={styles.formSectionHeader}
        colors={colors.itemFormHeaders[index]}
      >
        <Text style={styles.formSectionHeaderText}>{title}</Text>
      </LinearGradient>
    </View>
  );

  renderPreviewPhotoBarItem = ({ item: uri, index }: PhotosProps) => {
    const {
      state: { isNewItem, creator, status },
      props: {
        currentUserId,
        userCompany: { role: userRole },
      },
    } = this;

    const isPreview = uri === 'preview';
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
      if (isPreview) {
        showAddPhotoButton = true;
      } else {
        showRemoveButton = true;
      }
    } else if (isUserEmployee) {
      if (isNewItem || isUserCreator) {
        if (isPreview) {
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
      if (isPreview) {
        showAddPhotoButton = isNewItem ? true : isItemInResponsiblePlaces || isUserResponsible;
      } else {
        showRemoveButton = isNewItem ? true : isItemInResponsiblePlaces || isUserResponsible;
      }
    }

    return showAddPhotoButton ? (
      <View style={styles.addPhotoBarButtonWrapper}>
        <TouchableOpacity style={styles.addPhotoBarButton} onPress={this.handleAddPhoto}>
          <IonIcon size={26} {...iconProps} name="ios-add-circle" color={colors.border} />
        </TouchableOpacity>
      </View>
    ) : (
      <View style={styles.photoContainer}>
        <TouchableOpacity
          style={styles.photoImageContainer}
          onPress={() => this.handleSetIndexPreview(index)}
        >
          {!isPreview && <Image style={styles.photoImage} source={{ uri }} />}
        </TouchableOpacity>
        {showRemoveButton && (
          <TouchableOpacity
            activeOpacity={0.5}
            style={[styles.removePhotoIcon, isSmallDevice && styles.smallerIcon]}
            onPress={() => this.handleRemovePreviewPhotoBarItem(uri, index, isLocalFile)}
          >
            <Image source={assets.deletePhoto} />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  handleDeleteItem = async () => {
    const {
      state: { id },
      props: { destroyAsset },
    } = this;

    try {
      await destroyAsset({ variables: { id }, update: this.updateDestroyAsset });
      this.handleToggleDelModal();
      this.handleGoBack(true);
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

  handleRemovePreviewPhotoBarItem = async (
    uri: string,
    removedIndex: number,
    isLocalFile: boolean,
  ) => {
    const {
      showPhotos, activePreviewIndex,
    } = this.state;
    const toShow = showPhotos ? 'photosUrls' : 'photosOfDamagesUrls';

    if (isLocalFile) {
      try {
        RNFS.unlink(uri);

        this.setState(currentState => ({
          showSaveButton: true,
          photosToAdd: without([uri], currentState.photosToAdd),
          [toShow]: without([uri], currentState[toShow]),
          activePreviewIndex:
            removedIndex <= activePreviewIndex && activePreviewIndex > 0
              ? currentState.activePreviewIndex - 1
              : currentState.activePreviewIndex,
        }));
      } catch (error) {
        Alert.alert(error.message);
      }
    } else {
      const { photosUrls, photosOfDamagesUrls } = this.state;

      const match = (showPhotos ? photosUrls : photosOfDamagesUrls).find(
        photo => photo === uri,
      );

      const urlsParts = match.split('/');
      const id = nth(-2, urlsParts);

      this.setState(currentState => ({
        showSaveButton: true,
        [toShow]: without([uri], currentState[toShow]),
        photosIdsToRemove: concat([id], currentState.photosIdsToRemove),
        activePreviewIndex:
          removedIndex <= activePreviewIndex && activePreviewIndex > 0
            ? currentState.activePreviewIndex - 1
            : currentState.activePreviewIndex,
      }));
    }
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

  handleConfirmModal = (option: Object) => {
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

  keyExtractor = (uri: string) => uri;

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
      warnings,
      sections,
      isNewItem,
      showPhotos,
      photosUrls,
      isModalOpened,
      formIsEditable,
      showSaveButton,
      isDelModalOpened,
      activePreviewIndex,
      photosOfDamagesUrls,
      currentlyEditableField,
      isDateTimePickerOpened,
    } = this.state;

    // eslint-disable-next-line
    const currentTypeIsEmpty =
      (showPhotos && isEmpty(photosUrls)) || (!showPhotos && isEmpty(photosOfDamagesUrls));

    const userCanDelete = navigation.getParam('userCanDelete', false);

    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView
          enableOnAndroid
          extraScrollHeight={isIphoneX ? 20 : 0}
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
                  additional={isNewItem || userCanDelete || userRole === constants.roles.admin}
                  onPress={this.handleAddPhoto}
                />
              ) : (
                <Carousel
                  innerRef={(ref) => {
                    this.carousel = ref;
                  }}
                  index={activePreviewIndex}
                  // $FlowFixMe
                  data={showPhotos ? photosUrls : photosOfDamagesUrls}
                  onIndexChanged={this.handleSwipePreview}
                  //  use custom key for correct rerendering of carousel component
                  key={
                    (showPhotos ? photosUrls : photosOfDamagesUrls).length
                    + (showPhotos ? 'p' : 'd')
                  }
                />
              )}
              <View style={styles.previewInfo}>
                <InventoryIcon size={16} name="photo" {...iconProps} color={colors.black} />
                <Text style={styles.previewInfoText}>
                  {currentTypeIsEmpty
                    ? '0/0'
                    : `${activePreviewIndex + 1} / ${
                      showPhotos ? photosUrls.length : photosOfDamagesUrls.length
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
              isEmpty(showPhotos ? photosUrls : photosOfDamagesUrls) && styles.hide,
            ]}
            data={showPhotos ? photosUrls.concat('preview') : photosOfDamagesUrls.concat('preview')}
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
            isModalVisible={isDelModalOpened}
            data={constants.modalQuestion.itemDel}
            //  $FlowFixMe
            rightAction={this.handleDeleteItem}
            leftAction={this.handleToggleDelModal}
          />
        </KeyboardAwareScrollView>
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
  graphql(ASSETS_MUTATIONS.ADD_PHOTOS_TO_ASSET, { name: 'addPhotosToAsset' }),
  graphql(ASSETS_MUTATIONS.REMOVE_ASSET_PHOTOS, { name: 'removeAssetPhotos' }),
  graphql(ASSETS_QUERIES.GET_CREATED_ASSETS_COUNT_CLIENT, {
    // $FlowFixMe
    props: ({ data: { createdAssetsCount } }) => ({ createdAssetsCount }),
  }),
  graphql(PLACES_QUERIES.GET_CURRENT_USER_PLACES, {
    // $FlowFixMe
    props: ({ data: { current } }) => ({ currentUser: current }),
  }),
  withApollo,
)(ItemForm);
