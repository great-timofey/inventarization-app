//  @flow
import React, { PureComponent } from 'react';
import {
  View,
  Alert,
  Keyboard,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';

//  $FlowFixMe
import { includes, keys } from 'ramda';
import { compose, graphql } from 'react-apollo';

import Map from '~/components/Map';
import Input from '~/components/Input';
import Button from '~/components/Button';
import HeaderTitle from '~/components/HeaderTitle';
import DropDownMenu from '~/components/DropDownMenu';
import QuestionModal from '~/components/QuestionModal';
import HeaderBackButton from '~/components/HeaderBackButton';

import {
  debounce,
  getCoordsByAddress,
  getAddressByCoords,
  getCurrentLocation,
} from '~/global/utils';
import * as AUTH_QUERIES from '~/graphql/auth/queries';
import * as PLACES_QUERIES from '~/graphql/places/queries';
import * as PLACES_MUTATIONS from '~/graphql/places/mutations';

import colors from '~/global/colors';
import { mainNavigation } from '~/global';
import constants from '~/global/constants';
import globalStyles from '~/global/styles';

import styles from './styles';
import type { Props, State } from './types';

class EditPlaceScene extends PureComponent<Props, State> {
  static navigationOptions = ({ navigation }: Props) => {
    const id = navigation.state.params && navigation.state.params.id;

    return {
      headerStyle: [globalStyles.authHeaderStyleBig, styles.placesHeaderStyle],
      headerTitle: HeaderTitle({
        color: colors.header.createCompany,
        title: id ? constants.headers.editPlace : constants.headers.addPlaces,
      }),
      headerTitleStyle: globalStyles.headerTitleStyle,
      headerLeft: HeaderBackButton({
        onPress: () => navigation.goBack(),
      }),
      headerRight: <View />,
    };
  }

  constructor(props: Props) {
    super(props);
    const { navigation } = this.props;

    const gps = navigation.state.params && navigation.state.params.gps;
    const name = navigation.state.params && navigation.state.params.name;
    const address = navigation.state.params && navigation.state.params.address;
    const manager = navigation.state.params && navigation.state.params.manager;

    const lat = gps && gps.lat;
    const lon = gps && gps.lon;

    const isNewPlaceScene = !(gps || name || address || manager);

    this.state = {
      warnings: {},
      isNewPlaceScene,
      place: name || '',
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
      latitude: lat || 0.0,
      isModalVisible: false,
      longitude: lon || 0.0,
      address: address || '',
      loading: isNewPlaceScene,
      selectedManagerId: (manager && manager.id) || null,
    };
  }

  componentDidMount() {
    const { isNewPlaceScene } = this.state;
    if (isNewPlaceScene) {
      this.setInitialLocation();
    }
  }

  setInitialLocation = () => {
    // eslint-disable-next-line max-len
    getCurrentLocation().then(({ lat, lon }) => this.setState({ latitude: lat, longitude: lon, loading: false }));
  };

  onSubmitEditing = () => Keyboard.dismiss();

  getCoordsByAddressFromAPI = debounce(async () => {
    const { address } = this.state;
    const response = await getCoordsByAddress(address);
    if (response) {
      const { latitude, longitude } = response;
      this.setState({ latitude, longitude });
    } else {
      Alert.alert(constants.errors.geocoding);
      this.setInitialLocation();
    }
  }, 1000);

  getAddressByCoordsFromAPI = debounce(async () => {
    const { latitude, longitude } = this.state;
    const address = await getAddressByCoords(latitude, longitude);
    if (address) {
      this.setState({ address });
    } else {
      this.setState({ address: constants.errors.address });
    }
  }, 3000);

  handleChangeRegion = (region: Object) => {
    this.setState({ ...region }, this.getAddressByCoordsFromAPI);
  };

  handleChangeAddress = (address: string) => {
    this.setState({ address }, this.getCoordsByAddressFromAPI);
  };

  onChangeField = (field: string, value: string) => {
    this.setState({
      [field]: value,
    });
  };

  toggleModalVisible = () => {
    const { isModalVisible } = this.state;
    this.setState({
      isModalVisible: !isModalVisible,
    });
  }

  onSubmitForm = async () => {
    const {
      state: {
        place,
        address,
        latitude,
        longitude,
        isNewPlaceScene,
        selectedManagerId,
      },
      props: {
        navigation,
        createPlace,
        updatePlace,
        userCompany: {
          company: { id: companyId },
        },
      },
    } = this;

    const id = navigation.state.params && navigation.state.params.id;

    const isFormInvalid = await Promise.resolve()
      .then(() => this.checkFields())
      .then(() => this.checkForErrors());

    if (!isFormInvalid && isNewPlaceScene) {
      this.setState({ loading: true });
      const gps = { lat: latitude, lon: longitude };
      try {
        await createPlace({
          variables: {
            gps,
            companyId,
            name: place.trim(),
            managerId: selectedManagerId,
            address: address !== constants.errors.address ? address.trim() : null,
          },
          update: this.updateCreatePlace,
        });
        mainNavigation.goBack();
      } catch (error) {
        if (error.message === constants.graphqlErrors.placeAlreadyExists) {
          this.setState({
            warnings: {
              count: 1,
              place: constants.warnings.placeAlreadyExists,
            },
          });
        } else {
          console.log(error.message);
        }
      }
    }

    if (!isFormInvalid && !isNewPlaceScene) {
      try {
        await updatePlace({
          variables: {
            id,
            companyId,
            gps: {
              lat: latitude,
              lon: longitude,
            },
            name: place.trim(),
            address: address.trim(),
            managerId: selectedManagerId,
          },
        });
        mainNavigation.goBack();
      } catch (error) {
        if (error.message === constants.graphqlErrors.placeAlreadyExists) {
          this.setState({
            warnings: {
              count: 1,
              place: constants.warnings.placeAlreadyExists,
            },
          });
        } else {
          console.log(error.message);
        }
      }
    }
  };

  updateCreatePlace = (cache: Object, payload: Object) => {
    const { props: { userCompany: { company: { id: companyId } } } } = this;
    const data = cache.readQuery({
      query: PLACES_QUERIES.GET_COMPANY_PLACES,
      variables: { companyId },
    });
    data.places = [...data.places, payload.data.createPlace];
    cache.writeQuery({ query: PLACES_QUERIES.GET_COMPANY_PLACES, variables: { companyId }, data });
  }

  checkForErrors = () => {
    const {
      warnings: { count },
    } = this.state;
    return count > 0;
  };

  checkFields = () => {
    const { place } = this.state;
    const warnings = {
      count: 0,
      place: '',
    };

    if (!place.trim()) {
      warnings.place = constants.warnings.emptyPlace;
      warnings.count += 1;
    }

    this.setState({ warnings });
  };

  selectManager = (id: string) => {
    this.setState({
      selectedManagerId: id,
    });
  };

  render() {
    const {
      props: {
        userCompany: {
          role: userRole,
        },
      },
      state: {
        place,
        address,
        loading,
        latitude,
        warnings,
        longitude,
        latitudeDelta,
        longitudeDelta,
        isModalVisible,
        isNewPlaceScene,
        selectedManagerId,
      },
    } = this;

    const isUserAdmin = userRole === constants.roles.admin;

    return loading ? (
      <ActivityIndicator />
    ) : (
      <SafeAreaView style={styles.container}>
        <View style={[styles.inputView,
          isUserAdmin && styles.selectActive,
          selectedManagerId && styles.selectManager]}
        >
          <Input
            isWhite
            value={place}
            showWarningInTitle
            style={styles.input}
            blurOnSubmit={false}
            returnKeyType="done"
            customStyles={styles.input}
            customWarning={warnings.place}
            onSubmitEditing={this.onSubmitEditing}
            placeholder={constants.placeholders.place}
            isWarning={includes('place', keys(warnings))}
            onChangeText={text => this.onChangeField('place', text)}
            type={{ label: constants.inputTypes.place.label, warning: warnings.place }}
          />
        </View>
        <DropDownMenu
          role={userRole}
          selectedManagerId={selectedManagerId}
          callBackSelectManager={this.selectManager}
          toggleModalVisible={this.toggleModalVisible}
          query={AUTH_QUERIES.GET_COMPANY_USERS_BY_ROLE}
        />
        <View style={[styles.inputView,
          styles.addressInputView,
          selectedManagerId && styles.addressInputViewActive]}
        >
          <Input
            isWhite
            value={address}
            style={styles.input}
            blurOnSubmit={false}
            returnKeyType="done"
            type={constants.inputTypes.address}
            onSubmitEditing={this.onSubmitEditing}
            onChangeText={this.handleChangeAddress}
            placeholder={constants.placeholders.address}
          />
        </View>
        <Map
          showMarker
          latitude={latitude}
          longitude={longitude}
          customStyles={styles.map}
          latitudeDelta={latitudeDelta}
          longitudeDelta={longitudeDelta}
          changeRegionCallback={this.handleChangeRegion}
        />
        <Button
          onPress={this.onSubmitForm}
          customStyle={styles.submitButton}
          title={isNewPlaceScene
            ? constants.buttonTitles.createPlace
            : constants.buttonTitles.saveChanges
          }
        />
        <QuestionModal
          rightAction={() => {}}
          isModalVisible={isModalVisible}
          leftAction={this.toggleModalVisible}
          data={constants.modalQuestion.userNotFound}
        />
      </SafeAreaView>
    );
  }
}

export default compose(
  graphql(PLACES_MUTATIONS.CREATE_PLACE, { name: 'createPlace' }),
  graphql(PLACES_MUTATIONS.UPDATE_PLACE, { name: 'updatePlace' }),
  graphql(AUTH_QUERIES.GET_CURRENT_USER_COMPANY_CLIENT, {
    //  $FlowFixMe
    props: ({ data: { userCompany } }) => ({ userCompany }),
  }),
)(EditPlaceScene);
