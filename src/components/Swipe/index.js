// @flow

import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
//  $FlowFixMe
import { pluck, includes } from 'ramda';
import { graphql } from 'react-apollo';
import Swipeout from 'react-native-swipeout';

//  $FlowFixMe
import IconButton from '~/components/IconButton';

import colors from '~/global/colors';
import { normalize } from '~/global/utils';
import type { Item } from '~/global/types';
import constants from '~/global/constants';
import { GET_CURRENT_USER_PLACES } from '~/graphql/auth/queries';

import styles from './styles';
import type { Props } from './types';

class SwipeableList extends PureComponent<Props, {}> {
  renderSwipeRow = (item: Item, activeRowId: any) => {
    const { userId, currentUser, toggleDelModal, selectItem, userRole, openItem } = this.props;
    let enableLeftSwipe = false;
    let showRemoveButton = false;

    const isUserEmployee = userRole === constants.roles.employee;
    const isUserManager = userRole === constants.roles.manager;
    const isUserAdmin = userRole === constants.roles.admin;
    const isUserCreator = item && item.creator && item.creator.id === userId;
    const isItemInProcessing = item.status === 'on_processing';

    if (isUserAdmin) {
      enableLeftSwipe = true;
      showRemoveButton = true;
    } else if (isUserEmployee) {
      if (isUserCreator && isItemInProcessing) {
        showRemoveButton = true;
        enableLeftSwipe = true;
      }
    } else if (isUserManager) {
      //  $FlowFixMe
      const { createdPlaces = [], responsiblePlaces = [] } = currentUser;
      const userPlaces = [...createdPlaces, ...responsiblePlaces];
      const placesIds = pluck('id', userPlaces);
      const isItemInResponsiblePlaces = includes(item.place && item.place.id, placesIds);
      const isUserResponsible = item && item.responsible && item.responsible.id === userId;

      enableLeftSwipe = isItemInResponsiblePlaces || isUserResponsible;
      showRemoveButton = enableLeftSwipe;
    }

    const swipeoutBtns = [
      {
        component: (
          <IconButton
            size={25}
            isCustomIcon
            iconName="pencil"
            onPress={() => openItem(item, true)}
            customContStyle={styles.leftSwipeButton}
          />
        ),
      },
    ];

    if (showRemoveButton) {
      swipeoutBtns.push({
        component: (
          <IconButton
            size={50}
            iconName="ios-close"
            onPress={toggleDelModal}
            iconColor={colors.white}
            customIconStyle={{ top: normalize(3) }}
            customContStyle={styles.rightSwipeButton}
          />
        ),
      });
    }

    return (
      <Swipeout
        autoClose
        right={swipeoutBtns}
        disabled={!enableLeftSwipe}
        close={item.id !== activeRowId}
        //  eslint-disable-next-line
        onOpen={(sectionID, rowId, direction: string) => direction !== undefined ? selectItem(item.id) : null
        }
      >
        <TouchableOpacity activeOpacity={1} onPress={() => openItem(item)}>
          <View style={styles.rowItem}>
            <Image style={styles.image} />
            <View style={styles.description}>
              <View>
                <Text style={styles.topText}>{item.name}</Text>
                <Text style={styles.botText}>
                  {`${(item.photos && item.photos.length) || 0} Фото`}
                </Text>
              </View>
              <View style={styles.count}>
                <Text style={styles.countText}>{item.purchasePrice}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Swipeout>
    );
  };

  keyExtractor = (el: any, index: number) => `${el.id || index}`;

  render() {
    const { extraData, data } = this.props;

    return (
      <FlatList
        data={data}
        scrollEnabled={false}
        extraData={{ extraData }}
        keyExtractor={this.keyExtractor}
        renderItem={({ item }) => this.renderSwipeRow(item, extraData.currentSelectItem)}
      />
    );
  }
}

/*  eslint-disable */
export default graphql(GET_CURRENT_USER_PLACES, {
  //  $FlowFixMe
  props: ({ data: { current } }) => ({ currentUser: current }),
})(SwipeableList);
/*  eslint-enable */
