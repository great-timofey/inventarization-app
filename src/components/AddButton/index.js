// @flow

import React from 'react';

import Icon from 'react-native-vector-icons/Ionicons';

import { normalize } from 'global/utils';
import colors from 'global/colors';
import type { Props } from './types';

const AddButton = (props: Props) => (
  <Icon.Button
    {...props}
    size={normalize(34)}
    name="ios-add-circle"
    color={colors.buttonGreen}
    activeOpacity={0.5}
    underlayColor={colors.transparent}
    backgroundColor={colors.transparent}
    iconStyle={{
      marginRight: 0,
    }}
  />
);

export default AddButton;
