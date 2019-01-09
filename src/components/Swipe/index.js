// @flow

import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';

import Swipeout from 'react-native-swipeout';

import IconButton from '~/components/IconButton';

import colors from '~/global/colors';
import { normalize } from '~/global/utils';
import type { Item } from '~/global/types';
import constants from '~/global/constants';

import styles from './styles';
import type { Props } from './types';

class SwipeableList extends PureComponent<Props, {}> {
  renderSwipeRow = (item: Item, activeRowId: any) => {
    const { userId, toggleDelModal, selectItem, userRole, openItem } = this.props;
    const disableLeftSwipe = userRole === constants.roles.observer;
    let showRemoveButton;

    if (userRole === constants.roles.manager || userRole === constants.roles.employee) {
      if (item && item.creator && item.creator.id === userId && item.status === 'on_processing') {
        showRemoveButton = true;
      } else {
        showRemoveButton = false;
      }
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
        disabled={disableLeftSwipe}
        close={item.id !== activeRowId}
        //  eslint-disable-next-line
        onOpen={(sectionID, rowId, direction: string) => direction !== undefined ? selectItem(item.id) : null
        }
      >
        <View>
          <View style={styles.rowItem}>
            <TouchableOpacity onPress={() => openItem(item)}>
              <Image style={styles.image} />
            </TouchableOpacity>
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
        </View>
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

export default SwipeableList;
