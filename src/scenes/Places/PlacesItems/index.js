//  @flow
import React, { PureComponent, Fragment } from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';

import { findIndex, remove } from 'ramda';

import { compose, graphql } from 'react-apollo';
import InventoryIcon from '~/assets/InventoryIcon';
import Icon from 'react-native-vector-icons/Feather';

import Map from '~/components/Map';
import Search from '~/components/Search';
import ItemsList from '~/components/ItemsList';
import SortModal from '~/components/SortModal';
import IconButton from '~/components/IconButton';
import SearchHeader from '~/components/SearchHeader';
import QuestionModal from '~/components/QuestionModal';
import HeaderBackButton from '~/components/HeaderBackButton';

import * as AUTH_QUERIES from '~/graphql/auth/queries';
import * as ASSETS_QUERIES from '~/graphql/assets/queries';
import * as ASSETS_MUTATIONS from '~/graphql/assets/mutations';

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

  const gps = navigation.getParam('gps', null);

  console.log(!gps)

  const defaultGps = { lat: 55.018803, lon: -82.933952 };

  const id = navigation.getParam('id', 'ID');
  const name = navigation.getParam('name', '');
  const address = navigation.getParam('address', '');

  this.state = {
    id,
    name,
    searchValue: '',
    isSortByName: false,
    isSearchActive: false,
    showSortButton: false,
    gps: gps || defaultGps,
    isListViewStyle: false,
    currentSelectItem: null,
    isSortModalVisible: false,
    isDeleteModalVisible: false,
    isAndroidActionsModalVisible: false,
    address: address || constants.hints.placeAddressEmpty,
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

toggleActionsModal = () => {
  const { isAndroidActionsModalVisible } = this.state;
  this.setState({
    isAndroidActionsModalVisible: !isAndroidActionsModalVisible,
  });
}

onChangeSearchField = (value: string) => {
  const { navigation } = this.props;
  navigation.setParams({
    searchValue: value,
  });
  this.setState({
    searchValue: value.toLowerCase().trim(),
  });
};

toggleDelModalVisible = () => {
  const { isDeleteModalVisible } = this.state;
  this.setState({
    isDeleteModalVisible: !isDeleteModalVisible,
  });
};

toggleSortModalVisible = () => {
  const { isSortModalVisible } = this.state;
  this.setState({
    isSortModalVisible: !isSortModalVisible,
  });
};

toggleSortMethod = () => {
  const { isSortByName } = this.state;
  this.setState(
    {
      isSortByName: !isSortByName,
    },
    this.toggleSortModalVisible,
  );
};

handleShowSortButton = (value: boolean) => this.setState({
  showSortButton: value,
});

selectItem = (id: number | string) => {
  this.setState({
    currentSelectItem: id,
  });
};

handleDeleteItem = async (id: number | string, android: boolean) => {
  const { destroyAsset } = this.props;
  await destroyAsset({ variables: { id }, update: this.updateDestroyAsset });
  if (android) {
    this.setState({ isAndroidActionsModalVisible: false });
  } else {
    this.toggleDelModalVisible();
    this.setState({ currentSelectItem: null });
  }
};

updateDestroyAsset = (cache: Object) => {
  const {
    props: {
      // $FlowFixMe
      userCompany: {
        company: {
          id: companyId,
        },
      },
    },
    state: {
      currentSelectItem,
    },
  } = this;

  const data = cache.readQuery({
    query: ASSETS_QUERIES.GET_COMPANY_ASSETS,
    variables: { companyId },
  });
  const deleteIndex = findIndex(asset => asset.id === currentSelectItem, data.assets);
  data.assets = remove(deleteIndex, 1, data.assets);
  cache.writeQuery({ query: ASSETS_QUERIES.GET_COMPANY_ASSETS, variables: { companyId }, data });
};

scrollViewRef: any;

render() {
  const {
    props: {
      navigation,
      // $FlowFixMe
      userCompany: {
        role: userRole,
        company: {
          id: companyId,
        },
      },
    },
    state: {
      id,
      gps,
      name,
      address,
      searchValue,
      isSortByName,
      showSortButton,
      isSearchActive,
      isListViewStyle,
      currentSelectItem,
      isSortModalVisible,
      isDeleteModalVisible,
      isAndroidActionsModalVisible,
    },
  } = this;

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
          latitude={gps.lat}
          longitude={gps.lon}
          latitudeDelta={0.1}
          longitudeDelta={0.1}
          customStyles={styles.map}
        />
        <ItemsList
          placeId={id}
          userRole={userRole}
          companyId={companyId}
          navigation={navigation}
          swipeable={isListViewStyle}
          selectItem={this.selectItem}
          currentSelectItem={currentSelectItem}
          isDeleteModalVisible={isDeleteModalVisible}
          handleShowSortButton={this.handleShowSortButton}
          toggleDelModalVisible={this.toggleDelModalVisible}
          isAndroidActionsModalVisible={isAndroidActionsModalVisible}
        />
      </ScrollView>
      <QuestionModal
        isModalVisible={isDeleteModalVisible}
        leftAction={this.toggleDelModalVisible}
        data={constants.modalQuestion.itemDel}
          //  $FlowFixMe
        rightAction={() => this.handleDeleteItem(currentSelectItem, false)}
      />
      {showSortButton
        && !isSearchActive
        && !isSortModalVisible
        && !isAndroidActionsModalVisible
        && (
          <IconButton
            isCustomIcon
            size={isSortByName ? 50 : 70}
            onPress={this.toggleSortModalVisible}
            customPosition={{ position: 'absolute', right: 30, bottom: 30 }}
            iconName={isSortByName ? 'button-sort-name' : 'button-sort-price'}
            customIconStyle={!isSortByName ? { top: normalize(-4), left: normalize(-6) } : {}}
          />
        )}
      <SortModal
        isSortByName={isSortByName}
        isModalVisible={isSortModalVisible}
        toggleSortMethod={this.toggleSortMethod}
        toggleModalVisible={this.toggleSortModalVisible}
      />
      {isSearchActive && (
        <Search
          items={[]}
          searchValue={searchValue}
          toggleSearch={this.toggleSearch}
        />
      )}
    </Fragment>
  );
}
}

export default compose(
  graphql(AUTH_QUERIES.GET_CURRENT_USER_COMPANY_CLIENT, {
    // $FlowFixMe
    props: ({ data: { userCompany } }) => ({ userCompany }),
  }),
  graphql(ASSETS_MUTATIONS.DESTROY_ASSET, { name: 'destroyAsset' }),

)(PlacesItems);
