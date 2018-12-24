// @flow
import React from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import Modal from 'react-native-modal';

import constants from '~/global/constants';
import styles from './styles';
import type { Props } from './types';

const renderModalItem = ({ item }: { item: string }) => (
  <TouchableOpacity style={styles.modalItem}>
    <Text style={styles.modalItemText}>{item}</Text>
  </TouchableOpacity>
);

const renderModalSeparator = () => <View style={styles.modalSeparator} />;

const ChooseModal = ({ isVisible, onCancel, data, ...rest }: Props) => (
  <Modal
    isVisible={isVisible}
    style={styles.modalOverlay}
  >
    <View style={styles.modalContainer}>
      <FlatList
        data={data}
        renderItem={renderModalItem}
        ItemSeparatorComponent={renderModalSeparator}
      />
    </View>
    <TouchableOpacity
      activeOpacity={1}
      onPress={onCancel}
      style={styles.modalCancel}
    >
      <Text style={styles.modalCancelText}>{constants.buttonTitles.cancel}</Text>
    </TouchableOpacity>
  </Modal>
);

export default ChooseModal;
