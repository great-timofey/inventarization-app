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
import Input from '~/components/Input';
import Button from '~/components/Button';
import HeaderTitle from '~/components/HeaderTitle';
import DropDownMenu from '~/components/DropDownMenu';
import QuestionModal from '~/components/QuestionModal';
import HeaderBackButton from '~/components/HeaderBackButton';

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

    this.state = {
      warnings: {},
      loading: false,
      place: name || '',
      isModalVisible: false,
      address: address || '',
      latitude: lat || 0.0,
      longitude: lon || 0.0,
      selectedManagerId: (manager && manager.id) || null,
      isManagerSelectActive: !!(manager && manager.fullName && manager.id),
      isNewPlaceScene: !(gps || name || address || manager),
    };
  }

  onSubmitEditing = () => Keyboard.dismiss();

  onChangeField = (field: string, value: string) => {
    this.setState({
      [field]: value,
    });
  };

  onToggleSelectManager = (isEmptyManagerList) => {
    if (isEmptyManagerList) {
      this.toggleModalVisible();
    } else {
      this.setState({
        isManagerSelectActive: true,
      });
    }
  }

  toggleModalVisible = () => {
    const { isModalVisible } = this.state;

    this.setState({
      isModalVisible: !isModalVisible,
    });
  }

  onSubmitForm = async () => {
    const { navigation } = this.props;

    const id = navigation.state.params && navigation.state.params.id;

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
        createPlace,
        updatePlace,
        userCompany: {
          company: { id: companyId },
        },
      },
    } = this;

    const isFormInvalid = await Promise.resolve()
      .then(() => this.checkFields())
      .then(() => this.checkForErrors());

    if (!isFormInvalid && isNewPlaceScene) {
      try {
        await createPlace({
          variables: {
            companyId,
            gps: {
              lat: latitude,
              lon: longitude,
            },
            name: place.trim(),
            address: address.trim(),
            managerId: selectedManagerId,
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

  componentDidMount() {
    this.setState({ loading: true });
    navigator.geolocation.getCurrentPosition(
      //  eslint-disable-next-line max-len
      ({ coords: { latitude, longitude } }) => this.setState({ latitude, longitude, loading: false }),
      error => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  selectManager = (id) => {
    this.setState({
      selectedManagerId: id,
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
        isModalVisible,
        isNewPlaceScene,
        selectedManagerId,
        isManagerSelectActive,
      },
    } = this;

    const isUserAdmin = userRole === constants.roles.admin;

    return (
      <Query
        query={AUTH_QUERIES.GET_COMPANY_USERS_BY_ROLE}
        variables={{ companyId, role: 'manager' }}
      >
        {({ data, error }) => {
          if (error) {
            return (
              <View style={styles.errorContainer}>
                <Text style={styles.errorMessage}>{error.message}</Text>
              </View>
            );
          }

          let managerList;
          let isEmptyManagerList;

          // $FlowFixMe
          if (data.users) {
            managerList = data.users;
            isEmptyManagerList = managerList.length === 0;
          }

          return loading ? (
            <ActivityIndicator />
          ) : (
            <SafeAreaView style={styles.container}>
              <View style={[styles.inputView, isManagerSelectActive && styles.selectActive]}>
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
                  <TouchableOpacity
                    onPress={() => this.onToggleSelectManager(isEmptyManagerList)}
                  >
                    <Text style={[styles.button, isManagerSelectActive && styles.hideButton]}>
                      {constants.buttonTitles.setManager}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              {isManagerSelectActive && (
                <DropDownMenu
                  data={managerList}
                  selectedManagerId={selectedManagerId}
                  callBackSelectManager={this.selectManager}
                />
              )}
              <View style={[
                styles.inputView,
                styles.addressInputView,
                isManagerSelectActive && styles.addressInputViewActive]}
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
              <QuestionModal
                rightAction={() => {}}
                isModalVisible={isModalVisible}
                leftAction={this.toggleModalVisible}
                data={constants.modalQuestion.userNotFound}
              />
            </SafeAreaView>
          );
        }}
      </Query>
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
