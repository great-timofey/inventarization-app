//  @flow
import React, { PureComponent, Fragment } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

// import { isEmpty } from 'ramda';

import { compose, graphql, Query } from 'react-apollo';
import InventoryIcon from '~/assets/InventoryIcon';
import Icon from 'react-native-vector-icons/Feather';

import Map from '~/components/Map';
import Search from '~/components/Search';
import Input from '~/components/Input/index';
import SearchHeader from '~/components/SearchHeader';
import HeaderBackButton from '~/components/HeaderBackButton';

// import Button from '~/components/Button';
// import SwipeableList from '~/components/Swipe';
// import AndroidActionsModal from '~/components/AndroidActionsModal';

import * as AUTH_QUERIES from '~/graphql/auth/queries';
// import * as PLACES_QUERIES from '~/graphql/places/queries';
import * as ASSETS_QUERIES from '~/graphql/assets/queries';

// import assets from '~/global/assets';
import colors from '~/global/colors';
import { normalize } from '~/global/utils';
import constants from '~/global/constants';


import styles from './styles';
import type { Props, State } from './types';

const MainHeader = ({
  name,
  goBack,
  toggleSearch,
  isTitleVisible,
  isSearchActive,
  isListViewStyle,
  toggleViewStyle,
}) => (
  <View style={styles.header}>
    <HeaderBackButton
      onPress={() => goBack()}
      customStyle={{ paddingLeft: normalize(10) }}
    />
    <Text style={styles.headerTitle}>
      {isTitleVisible && name}
    </Text>
    <View style={styles.headerButtonsWrapper}>
      <Icon.Button
        activeOpacity={0.5}
        size={normalize(25)}
        color={colors.accent}
        onPress={toggleViewStyle}
        underlayColor={colors.transparent}
        backgroundColor={colors.transparent}
        name={isListViewStyle ? 'list' : 'grid'}
      />
      <InventoryIcon.Button
        activeOpacity={0.5}
        size={normalize(25)}
        color={colors.accent}
        onPress={toggleSearch}
        underlayColor={colors.transparent}
        backgroundColor={colors.transparent}
        name={isSearchActive ? 'close' : 'search'}
      />
    </View>

  </View>
);

class PlacesItems extends PureComponent<Props, State> {
static navigationOptions = ({ navigation }: Props) => {
  const { state } = navigation;

  const name = state.params && state.params.name;
  const searchValue = state.params && state.params.searchValue;
  const toggleSearch = state.params && state.params.toggleSearch;
  const isTitleVisible = state.params && state.params.isTitleVisible;
  const isSearchActive = state.params && state.params.isSearchActive;
  const isListViewStyle = state.params && state.params.isListViewStyle;
  const toggleViewStyle = state.params && state.params.toggleViewStyle;
  const onChangeSearchField = state.params && state.params.onChangeSearchField;

  return {
    header: isSearchActive ? (
      <SearchHeader
        searchValue={searchValue}
        toggleSearch={toggleSearch}
        onChangeSearchField={onChangeSearchField}
      />
    ) : (
      <MainHeader
        name={name}
        goBack={navigation.goBack}
        toggleSearch={toggleSearch}
        isSearchActive={isSearchActive}
        isTitleVisible={isTitleVisible}
        toggleViewStyle={toggleViewStyle}
        isListViewStyle={isListViewStyle}
      />
    ),
  };
}

constructor(props: Props) {
  super(props);
  const { navigation } = this.props;

  const id = navigation.state.params && navigation.state.params.id;
  const gps = navigation.state.params && navigation.state.params.gps;
  const name = navigation.state.params && navigation.state.params.name;
  const address = navigation.state.params && navigation.state.params.address;

  this.state = {
    id,
    gps,
    name,
    address,
    searchValue: '',
    isSearchActive: false,
    isListViewStyle: false,
    currentSelectItem: null,
  };

  navigation.setParams({
    searchValue: '',
    isSearchActive: false,
    isTitleVisible: false,
    isListViewStyle: false,
    toggleSearch: this.toggleSearch,
    toggleViewStyle: this.toggleViewStyle,
    onChangeSearchField: this.onChangeSearchField,
  });
}

toggleViewStyle = () => {
  const { navigation } = this.props;
  const { isListViewStyle } = this.state;

  this.setState({
    currentSelectItem: null,
    isListViewStyle: !isListViewStyle,
  });

  navigation.setParams({
    isListViewStyle: !isListViewStyle,
  });
};

handleScroll = (event: Object) => {
  const { navigation } = this.props;
  if (event.nativeEvent.contentOffset.y >= 30) {
    navigation.setParams({
      isTitleVisible: true,
    });
  } else {
    navigation.setParams({
      isTitleVisible: false,
    });
  }
};

toggleSearch = () => {
  const { navigation } = this.props;
  const { isSearchActive } = this.state;

  this.setState({
    currentSelectItem: null,
    isSearchActive: !isSearchActive,
  });

  navigation.setParams({
    isSearchActive: !isSearchActive,
  });
};

onChangeSearchField = (value: string) => {
  const { navigation } = this.props;
  navigation.setParams({
    searchValue: value,
  });
  this.setState({
    searchValue: value.toLowerCase().trim(),
  });
};

scrollViewRef: any;

render() {
  const {
    props: {
      userCompany: {
        company: {
          id: companyId,
        },
      },
    },
    state: {
      gps,
      name,
      address,
      searchValue,
      isSearchActive,
    },
  } = this;


  return (
    <Query query={ASSETS_QUERIES.GET_COMPANY_ASSETS} variables={{ companyId }}>
      {({ data, loading, error }) => {
        if (loading) { return <ActivityIndicator />; }
        if (error) {
          return (
            <View>
              <Text>{error.message}</Text>
            </View>
          );
        }

        let assetsList = [];
        if (data && data.assets) {
          assetsList = data.assets;
        }

        return (
          <Fragment>
            <ScrollView
              scrollEventThrottle={16}
              onScroll={this.handleScroll}
              ref={(ref) => { this.scrollViewRef = ref; }}
            >
              <Text style={styles.placeName}>{name}</Text>
              <View style={styles.address}>
                <Text style={styles.topText}>{constants.inputTypes.address.label}</Text>
                <Text style={styles.botText}>{address}</Text>
              </View>
              <Map
                customStyles={styles.map}
                region={{
                  latitude: gps.lat,
                  longitude: gps.lon,
                }}
              />
            </ScrollView>
            {isSearchActive && (
            <Search
              items={assetsList}
              searchValue={searchValue}
              toggleSearch={this.toggleSearch}
            />
            )}
          </Fragment>
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
)(PlacesItems);
