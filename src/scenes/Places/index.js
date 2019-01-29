//  @flow
import React, { PureComponent } from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import { isEmpty } from 'ramda';

import { compose, graphql, Query } from 'react-apollo';
import InventoryIcon from '~/assets/InventoryIcon';
import Icon from 'react-native-vector-icons/Feather';

import Button from '~/components/Button';
import SwipeableList from '~/components/Swipe';

import * as AUTH_QUERIES from '~/graphql/auth/queries';
import * as PLACES_QUERIES from '~/graphql/places/queries';

import assets from '~/global/assets';
import colors from '~/global/colors';
import { normalize } from '~/global/utils';
import constants from '~/global/constants';

import styles from './styles';
import type { Props, State } from './types';

class PlacesScene extends PureComponent<Props, State> {
static navigationOptions = ({ navigation }: Props) => {
  const { state } = navigation;
  const isTitleVisible = state.params && state.params.isTitleVisible;

  return {
    headerStyle: styles.header,
    headerTitleStyle: styles.headerTitle,
    headerTitle: isTitleVisible && constants.headers.places,
    headerLeft: (<Icon.Button
      name="plus"
      size={normalize(30)}
      color={colors.accent}
      backgroundColor={colors.transparent}
    />),
    headerRight: (<InventoryIcon.Button
      name="search"
      size={normalize(22)}
      color={colors.accent}
      backgroundColor={colors.transparent}
    />),
  };
}

state = {
  currentSelectItem: null,
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
      currentSelectItem,
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
          <ScrollView scrollEventThrottle={16} onScroll={this.handleScroll}>
            <Text style={[styles.noPlacesTitle, !isNoPlaces && styles.title]}>
              {constants.headers.places}
            </Text>
            <SwipeableList
              isPlaces
              data={placesList}
              userRole={userRole}
              openItem={() => {}}
              selectItem={this.selectItem}
              extraData={{ currentSelectItem }}
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
