//  @flow
import React, { PureComponent, Fragment } from 'react';
import { View, Keyboard, SafeAreaView, ActivityIndicator } from 'react-native';

import { includes } from 'ramda';

import Map from '~/components/Map';
import Button from '~/components/Button';
import Input from '~/components/Input';
import HeaderTitle from '~/components/HeaderTitle';
import HeaderBackButton from '~/components/HeaderBackButton';

import colors from '~/global/colors';
import constants from '~/global/constants';
import globalStyles from '~/global/styles';

import styles from './styles';
type Props = {};

const deltas = {
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

class EditPlaceScene extends PureComponent<Props> {
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
    region: {},
    address: '',
    warnings: [],
    loading: true,
    isNewPlaceScene: true,
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => this.setState({ region: { latitude, longitude, ...deltas }, loading: false }),
      error => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  handleChangeRegion = (region: Object) => {
    //  temp workaround, here will be implemented geocoding / reverse geocoding
    this.setState({ region, address: region.latitude.toString() });
  };

  onSubmitEditing = () => Keyboard.dismiss();

  onChangeAddress = (address) => {
    //  temp workaround, here will be implemented geocoding / reverse geocoding
    this.setState({ address }, () => this.setState({ region: { ...this.state.region, latitude: parseFloat(address) } }), 2000);
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
      try {
        const { place, address } = this.state;
      } catch (error) {
        if (error.message === constants.graphqlErrors.placeAlreadyExists) {
          this.setState({
            warnings: [
              constants.warnings.placeAlreadyExists,
            ],
          });
        }
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
    const { loading, place, region, address, warnings, isNewPlaceScene } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        {loading ? <ActivityIndicator /> : (
          <Fragment>
            <View style={styles.inputView}>
              <Input
                isWhite
                value={place}
                needsNoPaddingBottom
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
                needsNoPaddingBottom
                blurOnSubmit={false}
                returnKeyType="done"
                customStyles={styles.input}
                type={constants.inputTypes.address}
                onSubmitEditing={this.onSubmitEditing}
                isWarning={includes('address', warnings)}
                placeholder={constants.placeholders.address}
                onChangeText={text => this.onChangeAddress(text)}
              />
            </View>
            <Map changeRegionCallback={this.handleChangeRegion} region={region} />
            <Button
              onPress={this.onSubmitForm}
              customStyle={styles.submitButton}
              title={isNewPlaceScene ? constants.buttonTitles.createPlace : constants.buttonTitles.saveChanges}
            />
          </Fragment>
        )}
      </SafeAreaView>
    );
  }
}

export default EditPlaceScene;
