// @flow
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import Picker from 'react-native-modal-datetime-picker';

import constants from '~/global/constants';
import styles from './styles';
import type { Props } from './types';

const CustomCancelDateTimePickerButton = ({ onPress }: { onPress: Function }) => (
  <TouchableOpacity
    activeOpacity={1}
    onPress={onPress}
    style={styles.customCancelDateTimePickerButton}
  >
    <Text style={styles.customCancelDateTimePickerText}>{constants.buttonTitles.cancel}</Text>
  </TouchableOpacity>
);

const DateTimePicker = ({ onConfirm, isVisible, onCancel, ...rest }: Props) => (
  <Picker
    {...rest}
    onCancel={onCancel}
    onConfirm={onConfirm}
    isVisible={isVisible}
    titleIOS={constants.headers.pickDate}
    confirmTextIOS={constants.buttonTitles.ready}
    confirmTextStyle={styles.dateTimePickerConfirmText}
    customCancelButtonIOS={
      <CustomCancelDateTimePickerButton onPress={onCancel} />
    }
  />
);

export default DateTimePicker;
