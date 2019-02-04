//  @flow
import React, { PureComponent, Fragment } from 'react';
import { Alert, View, ActivityIndicator, Keyboard, SafeAreaView } from 'react-native';

//  $FlowFixMe
import { includes, keys } from 'ramda';
import { compose, graphql } from 'react-apollo';

import Map from '~/components/Map';
import Button from '~/components/Button';
import Input from '~/components/Input';
import HeaderTitle from '~/components/HeaderTitle';
import HeaderBackButton from '~/components/HeaderBackButton';

import {
  debounce,
  getCoordsByAddress,
  getAddressByCoords,
  getCurrentLocation,
} from '~/global/utils';
import * as AUTH_QUERIES from '~/graphql/auth/queries';
import * as PLACES_MUTATIONS from '~/graphql/places/mutations';
import colors from '~/global/colors';
import constants from '~/global/constants';
import globalStyles from '~/global/styles';

import styles from './styles';
import type { Props, State } from './types';

class EditPlaceScene extends PureComponent<Props, State> {
  static navigationOptions = ({ navigation }: Props) => ({
    headerStyle: [globalStyles.authHeaderStyleBig, styles.placesHeaderStyle],
    headerTitle: HeaderTitle({
      color: colors.header.createCompany,
      title: constants.headers.places,
    }),
    headerTitleStyle: globalStyles.headerTitleStyle,
    headerLeft: HeaderBackButton({
      onPress: () => navigation.goBack(),
    }),
  });

  state = {
    place: '',
    address: '',
    warnings: {},
    loading: true,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
    isNewPlaceScene: true,
  };

  componentDidMount() {
    this.setInitialLocation();
  }

  setInitialLocation = () => {
    //  $FlowFixMe
    getCurrentLocation().then(location => this.setState({ ...location, loading: false }));
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

  //  eslint-disable-next-line max-len
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

  onSubmitForm = async () => {
    const { place } = this.state;
    const {
      createPlace,
      userCompany: {
        company: { id: companyId },
      },
    } = this.props;
    const isFormInvalid = await Promise.resolve()
      .then(() => this.checkFields())
      .then(() => this.checkForErrors());

    if (!isFormInvalid) {
      this.setState({ loading: true });
      try {
        await createPlace({ variables: { companyId, name: place.trim() } });
        Alert.alert(constants.text.placeCreated);
        this.setState({
          place: '',
          address: '',
          warnings: {},
        });
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
      } finally {
        this.setState({ loading: false });
      }
    }
  };

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

  render() {
    const {
      place,
      address,
      loading,
      latitude,
      warnings,
      longitude,
      latitudeDelta,
      longitudeDelta,
      isNewPlaceScene,
    } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Fragment>
            <View style={styles.inputView}>
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
            <View style={[styles.inputView, styles.addressInputView]}>
              <Input
                isWhite
                value={address}
                style={styles.input}
                blurOnSubmit={false}
                returnKeyType="done"
                type={constants.inputTypes.address}
                onSubmitEditing={this.onSubmitEditing}
                placeholder={constants.placeholders.address}
                onChangeText={text => this.handleChangeAddress(text)}
              />
            </View>
            <Map
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
              title={
                isNewPlaceScene
                  ? constants.buttonTitles.createPlace
                  : constants.buttonTitles.saveChanges
              }
            />
          </Fragment>
        )}
      </SafeAreaView>
    );
  }
}

export default compose(
  graphql(PLACES_MUTATIONS.CREATE_PLACE, { name: 'createPlace' }),
  graphql(AUTH_QUERIES.GET_CURRENT_USER_COMPANY_CLIENT, {
    //  $FlowFixMe
    props: ({ data: { userCompany } }) => ({ userCompany }),
  }),
)(EditPlaceScene);
