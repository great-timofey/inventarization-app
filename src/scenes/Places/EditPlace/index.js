//  @flow
import React, { PureComponent } from 'react';
import { View, ActivityIndicator, Keyboard, SafeAreaView } from 'react-native';

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
    address: '',
    warnings: [],
    latitude: 0.0,
    longitude: 0.0,
    loading: false,
    isNewPlaceScene: true,
  };

  onSubmitEditing = () => Keyboard.dismiss();

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
        console.log('correct');
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

  componentDidMount() {
    this.setState({ loading: true });
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => this.setState({ latitude, longitude, loading: false }),
      error => console.log(error),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });
  }

  render() {
    const { place, address, warnings, loading, latitude, longitude, isNewPlaceScene } = this.state;
    return loading ? <ActivityIndicator /> : (
      <SafeAreaView style={styles.container}>
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
            onChangeText={text => this.onChangeField('address', text)}
          />
        </View>
        <Map region={{ latitude, longitude }} customStyles={styles.map} />
        <Button
          onPress={this.onSubmitForm}
          customStyle={styles.submitButton}
          title={isNewPlaceScene ? constants.buttonTitles.createPlace : constants.buttonTitles.saveChanges}
        />
      </SafeAreaView>
    );
  }
}

export default EditPlaceScene;
