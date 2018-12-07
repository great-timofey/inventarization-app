// @flow

import React from 'react';

import IonIcon from 'react-native-vector-icons/Ionicons';

import colors from 'global/colors';
import type { Props } from './types';

const AddButton = (props: Props) => (
  <IonIcon.Button
    {...props}
    size={34}
    name="ios-add-circle"
    color={colors.green}
    activeOpacity={0.5}
    underlayColor={colors.transparent}
    backgroundColor={colors.transparent}
  />
);

export default AddButton;
