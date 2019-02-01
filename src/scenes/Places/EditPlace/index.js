//  @flow
import React, { PureComponent, Fragment } from 'react';
import { Alert, View, ActivityIndicator, Keyboard, SafeAreaView } from 'react-native';

//  $FlowFixMe
import { includes } from 'ramda';

import Map from '~/components/Map';
import Button from '~/components/Button';
import Input from '~/components/Input';
import HeaderTitle from '~/components/HeaderTitle';
import HeaderBackButton from '~/components/HeaderBackButton';

import { getCoordsByAddress, getAddressByCoords, debounce } from '~/global/utils';
import colors from '~/global/colors';
import constants from '~/global/constants';
import globalStyles from '~/global/styles';

import styles from './styles';
import type { Props, State } from './types';

const deltas = {
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

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
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
    warnings: [],
    loading: true,
    isNewPlaceScene: true,
  };

  componentDidMount() {
    this.setInitialLocation();
  }

  setInitialLocation = () => {
    navigator.geolocation.getCurrentPosition(
      //  eslint-disable-next-line  max-len
      ({ coords: { latitude, longitude } }) => this.setState({ latitude, longitude, loading: false }),
      //  eslint-disable-next-line max-len
      error => console.log(error) || this.setState({ loading: false }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  };

  onSubmitEditing = () => Keyboard.dismiss();

  getCoordsByAddressFromAPI = debounce(async () => {
    const { address } = this.state;
    const response = await getCoordsByAddress(address);
    console.log(response)
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
      this.setState({ address: 'Ошибка определения адреса' });
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
    const isFormInvalid = await Promise.resolve()
      .then(() => this.checkFields())
      .then(() => this.checkForErrors());

    if (!isFormInvalid) {
      this.setState({ loading: true });
      try {
      } catch (error) {
        if (error.message === constants.graphqlErrors.placeAlreadyExists) {
          this.setState({
            warnings: [
              constants.warnings.placeAlreadyExists,
            ],
          });
        }
      } finally {
        this.setState({ loading: false });
      }
    }
  };

  checkForErrors = () => {
    const { warnings } = this.state;
    return !!warnings.length;
  };

  checkFields = () => {
    const { address, place } = this.state;
    const warnings = [];

    if (!place.trim()) {
      warnings.push('place');
    }
    if (!address.trim()) {
      warnings.push('address');
    }

    this.setState({ warnings });
  };

  render() {
    const { loading, latitude, longitude, latitudeDelta, longitudeDelta, place, address, warnings, isNewPlaceScene } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        {loading ? <ActivityIndicator /> : (
          <Fragment>
            <View style={styles.inputView}>
              <Input
                isWhite
                value={place}
                style={styles.input}
                blurOnSubmit={false}
                returnKeyType="done"
                customStyles={styles.input}
                type={constants.inputTypes.place}
                onSubmitEditing={this.onSubmitEditing}
                isWarning={includes('place', warnings)}
                placeholder={constants.placeholders.place}
                onChangeText={text => this.onChangeField('place', text)}
              />
            </View>
            <View style={[styles.inputView, styles.addressInputView]}>
              <Input
                isWhite
                value={address}
                style={styles.input}
                blurOnSubmit={false}
                returnKeyType="done"
                customStyles={styles.input}
                type={constants.inputTypes.address}
                onSubmitEditing={this.onSubmitEditing}
                isWarning={includes('address', warnings)}
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

export default EditPlaceScene;
