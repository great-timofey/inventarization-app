//  @flow
import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import Modal from 'react-native-modal';

import IconButton from '~/components/IconButton';

import colors from '~/global/colors';
import { normalize } from '~/global/utils';
import constants from '~/global/constants';

import styles from './styles';
import type { Props } from './types';

class SortModal extends PureComponent<Props, {}> {
  render() {
    const { isModalVisible, isSortByName, toggleSortMethod, toggleModalVisible } = this.props;
    return (
      <Modal isVisible={isModalVisible} style={styles.modal}>
        <View style={styles.container}>
          <Text style={styles.text}>{constants.sort.name}</Text>
          <IconButton
            size={50}
            isCustomIcon
            isDisabled={isSortByName}
            iconName="button-sort-name"
            onPress={() => toggleSortMethod()}
            iconColor={isSortByName ? colors.white : colors.whiteOpacity}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.text}>{constants.sort.price}</Text>
          <IconButton
            size={70}
            isCustomIcon
            isDisabled={!isSortByName}
            iconName="button-sort-price"
            onPress={() => toggleSortMethod()}
            customIconStyle={{ top: normalize(-4), left: normalize(-6) }}
            iconColor={!isSortByName ? colors.white : colors.whiteOpacity}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.text}>{constants.sort.close}</Text>
          <IconButton
            size={40}
            iconName="ios-close"
            iconColor={colors.button.close}
            onPress={() => toggleModalVisible()}
            customIconStyle={{ top: normalize(2) }}
            customContStyle={{ backgroundColor: colors.white }}
          />
        </View>
      </Modal>
    );
  }
}

export default SortModal;
