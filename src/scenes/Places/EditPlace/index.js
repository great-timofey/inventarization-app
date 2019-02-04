//  @flow
import React, { PureComponent } from 'react';
import {
  Text,
  View,
  Keyboard,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

//  $FlowFixMe
import { includes } from 'ramda';
import { Query, compose, graphql } from 'react-apollo';

import Map from '~/components/Map';
import Button from '~/components/Button';
import Input from '~/components/Input';
import HeaderTitle from '~/components/HeaderTitle';
import DropDownMenu from '~/components/DropDownMenu';
import HeaderBackButton from '~/components/HeaderBackButton';

import * as AUTH_QUERIES from '~/graphql/auth/queries';

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
      title: constants.headers.addPlaces,
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
    selectedEmployeeId: null,
    isEmployeeSelectActive: false,
  };

  onSubmitEditing = () => Keyboard.dismiss();

  onChangeField = (field: string, value: string) => {
    this.setState({
      [field]: value,
    });
  };

  onToggleSelectEmployee = () => {
    this.setState({
      isEmployeeSelectActive: true,
    });
  }

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
            warnings: [constants.warnings.placeAlreadyExists],
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
      //  eslint-disable-next-line max-len
      ({ coords: { latitude, longitude } }) => this.setState({ latitude, longitude, loading: false }),
      error => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  selectEmployee = (id) => {
    this.setState({
      selectedEmployeeId: id,
    });
  }

  render() {
    const {
      props: {
        // $FlowFixMe
        userCompany: {
          role: userRole,
          company: {
            id: companyId,
          },
        },
      },
      state: {
        place,
        address,
        warnings,
        loading,
        latitude,
        longitude,
        isNewPlaceScene,
        isEmployeeSelectActive,
      },
    } = this;

    const isUserAdmin = userRole === constants.roles.admin;

    return (
      <Query
        query={AUTH_QUERIES.GET_COMPANY_USERS_BY_ROLE}
        variables={{ companyId, role: 'employee' }}
      >
        {({ data, error }) => {
          if (error) {
            return (
              <View style={styles.errorContainer}>
                <Text style={styles.errorMessage}>{error.message}</Text>
              </View>
            );
          }
          // $FlowFixMe
          const employeeList = data.users;

          return loading ? (
            <ActivityIndicator />
          ) : (
            <SafeAreaView style={styles.container}>
              <View style={[styles.inputView, isEmployeeSelectActive && styles.selectActive]}>
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
                {isUserAdmin && (
                  <TouchableOpacity onPress={this.onToggleSelectEmployee}>
                    <Text style={[styles.button, isEmployeeSelectActive && styles.hideButton]}>
                      {constants.buttonTitles.setEmployee}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              {isEmployeeSelectActive && (
                <DropDownMenu
                  data={employeeList}
                  callBackSelectEmployee={this.selectEmployee}
                />
              )}
              <View style={[
                styles.inputView,
                styles.addressInputView,
                isEmployeeSelectActive && styles.addressInputViewActive]}
              >
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
                  onChangeText={text => this.onChangeField('address', text)}
                />
              </View>
              <Map region={{ latitude, longitude }} />
              <Button
                onPress={this.onSubmitForm}
                customStyle={styles.submitButton}
                title={isNewPlaceScene
                  ? constants.buttonTitles.createPlace
                  : constants.buttonTitles.saveChanges}
              />
            </SafeAreaView>
          );
        }}
      </Query>
    );
  }
}

export default compose(
  graphql(AUTH_QUERIES.GET_CURRENT_USER_COMPANY_CLIENT, {
    // $FlowFixMe
    props: ({ data: { userCompany } }) => ({ userCompany }),
  }),
)(EditPlaceScene);
