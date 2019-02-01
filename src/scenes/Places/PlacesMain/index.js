//  @flow
import React, { PureComponent, Fragment } from 'react';
import {
  Text,
  View,
  Image,
  UIManager,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import { isEmpty } from 'ramda';

import { compose, graphql, Query } from 'react-apollo';
import InventoryIcon from '~/assets/InventoryIcon';
import Icon from 'react-native-vector-icons/Feather';

import Button from '~/components/Button';
import Search from '~/components/Search';
import SwipeableList from '~/components/Swipe';
import SearchHeader from '~/components/SearchHeader';
import AndroidActionsModal from '~/components/AndroidActionsModal';

import * as AUTH_QUERIES from '~/graphql/auth/queries';
import * as PLACES_QUERIES from '~/graphql/places/queries';

import assets from '~/global/assets';
import colors from '~/global/colors';
import { mainNavigation } from '~/global';
import { normalize } from '~/global/utils';
import constants from '~/global/constants';

import * as SCENE_NAMES from '~/navigation/scenes';

import styles from './styles';
import type { Props, State } from './types';

const MainHeader = ({ toggleSearch, isTitleVisible, isSearchActive, navigateToAddPlace }) => (
  <View style={styles.header}>
    <Icon.Button
      name="plus"
      activeOpacity={0.5}
      size={normalize(30)}
      color={colors.accent}
      onPress={navigateToAddPlace}
      underlayColor={colors.transparent}
      backgroundColor={colors.transparent}
    />
    <Text style={styles.headerTitle}>
      {isTitleVisible && constants.headers.places}
    </Text>
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
);

class PlacesScene extends PureComponent<Props, State> {
static navigationOptions = ({ navigation }: Props) => {
  const { state } = navigation;

  const searchValue = state.params && state.params.searchValue;
  const toggleSearch = state.params && state.params.toggleSearch;
  const isTitleVisible = state.params && state.params.isTitleVisible;
  const isSearchActive = state.params && state.params.isSearchActive;
  const navigateToAddPlace = state.params && state.params.navigateToAddPlace;
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
        toggleSearch={toggleSearch}
        isSearchActive={isSearchActive}
        isTitleVisible={isTitleVisible}
        navigateToAddPlace={navigateToAddPlace}
      />
    ),
  };
}

constructor(props: Props) {
  super(props);
  const { navigation } = this.props;

  this.state = {
    place: null,
    elementPosition: {
      x: 0,
      y: 0,
    },
    searchValue: '',
    isSearchActive: false,
    currentSelectItem: null,
    isAndroidActionsModalVisible: false,
  };

  navigation.setParams({
    searchValue: '',
    isSearchActive: false,
    isTitleVisible: false,
    toggleSearch: this.toggleSearch,
    navigateToAddPlace: this.navigateToAddPlace,
    onChangeSearchField: this.onChangeSearchField,
  });
}

selectItem = (id: number | string) => {
  this.setState({
    currentSelectItem: id,
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

getItemPosition = (itemRef, parentScrollViewRef, place) => {
  const headerPosition = normalize(65);
  const bottomPosition = normalize(480);

  this.setState({
    elementPosition: {
      x: 0,
      y: 0,
    },
    place,
  });

  if (itemRef) {
    itemRef.measure((fx, fy, width, height, px, py) => {
      const listItemHeight = normalize(78);

      if (py + listItemHeight >= bottomPosition) {
        const itemPositionDiff = (py + listItemHeight) - bottomPosition;

        UIManager.measure(parentScrollViewRef.getInnerViewNode(), (x, y, w, h, pageX, pageY) => {
          const currentViewPosition = pageY - headerPosition;
          const coordinateToScroll = currentViewPosition - itemPositionDiff;

          parentScrollViewRef.scrollTo({ x: 0, y: Math.abs(coordinateToScroll), animated: true });

          this.setState({
            elementPosition: {
              x: px,
              y: py - itemPositionDiff - normalize(20),
            },
          });
          setTimeout(() => {
            this.toggleActionsModal();
          }, 150);
        });
      } else {
        this.setState({
          elementPosition: {
            x: px,
            y: py,
          },
        });
        this.toggleActionsModal();
      }
    });
  }
}

openPlace = (id, name, address, gps) => {
  mainNavigation.navigate(SCENE_NAMES.PlacesItemsSceneName, { id, name, address, gps });
}

navigateToAddPlace = () => {
  mainNavigation.navigate(SCENE_NAMES.PlacesSceneName);
}

scrollViewRef: any;

render() {
  const {
    props: {
      userCompany: {
        userRole,
        company: {
          id: companyId,
        },
      },
    },
    state: {
      place,
      searchValue,
      isSearchActive,
      elementPosition,
      currentSelectItem,
      isAndroidActionsModalVisible,
    },
  } = this;

  return (
    <Query query={PLACES_QUERIES.GET_COMPANY_PLACES_BY_ID} variables={{ companyId }}>
      {({ data, loading, error }) => {
        if (loading) { return <ActivityIndicator />; }
        if (error) {
          return (
            <View>
              <Text>{error.message}</Text>
            </View>
          );
        }

        let placesList = [];
        if (data && data.places) {
          placesList = data.places;
        }

        const isNoPlaces = isEmpty(placesList);

        return (
          <Fragment>
            <ScrollView
              scrollEventThrottle={16}
              onScroll={this.handleScroll}
              ref={(ref) => { this.scrollViewRef = ref; }}
              scrollEnabled={!isAndroidActionsModalVisible}
            >
              <Text style={[styles.noPlacesTitle, !isNoPlaces && styles.title]}>
                {constants.headers.places}
              </Text>
              <SwipeableList
                isPlaces
                data={placesList}
                userRole={userRole}
                openPlace={this.openPlace}
                selectItem={this.selectItem}
                extraData={{ currentSelectItem }}
                getItemPosition={this.getItemPosition}
                parentScrollViewRef={this.scrollViewRef}
              />
              {isNoPlaces && (
              <View style={styles.wrapper}>
                <Image source={assets.emptyPlaces} />
                <Text style={styles.emptyPlacesText}>{constants.text.emptyPlaces}</Text>
                <Button
                  isGreen
                  onPress={() => {}}
                  customStyle={styles.button}
                  title={constants.buttonTitles.addPlace}
                />
              </View>
              )}
            </ScrollView>
            {isSearchActive && (
            <Search
              items={placesList}
              searchValue={searchValue}
              toggleSearch={this.toggleSearch}
            />
            )}
            <AndroidActionsModal
              type="places"
              item={place || {}}
              handleOpenItem={() => {}}
              handleDeleteItem={() => {}}
              elementPosition={elementPosition}
              toggleActionsModal={this.toggleActionsModal}
              isModalVisible={isAndroidActionsModalVisible}
            />
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
)(PlacesScene);
