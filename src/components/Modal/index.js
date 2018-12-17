//  @flow
import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import Modal from 'react-native-modal';

import SortButton from 'components/SortButton';

import colors from 'global/colors';
import { normalize } from 'global/utils';
import constants from 'global/constants';

import type { Props } from './types';
import styles from './styles';

class SortModal extends PureComponent<Props, {}> {
  render() {
    const { isModalVisible, onPress } = this.props;

    return (
      <Modal isVisible={isModalVisible} style={styles.modal}>
        <View style={styles.container}>
          <Text style={styles.text}>{constants.sort.name}</Text>
          <SortButton
            size={50}
            onPress={() => onPress()}
            iconName="button-sort-name"
            iconColor={colors.whiteOpacity}
            customStyle={{ paddingLeft: normalize(3) }}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.text}>{constants.sort.price}</Text>
          <SortButton
            size={70}
            onPress={() => onPress()}
            iconName="button-sort-price"
            iconColor={colors.whiteOpacity}
            customPosition={{ top: normalize(-4), left: normalize(-6) }}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.text}>{constants.sort.close}</Text>
          <SortButton
            size={30}
            iconName="close"
            onPress={() => onPress()}
            iconColor={colors.button.close}
            customStyle={{ backgroundColor: colors.white }}
          />
        </View>
      </Modal>
    );
  }
}

export default SortModal;
