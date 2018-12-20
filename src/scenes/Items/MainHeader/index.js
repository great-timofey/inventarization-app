//  @flow

import React from 'react';
import { Text, View } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import InventoryIcon from '~/assets/InventoryIcon';

import colors from '~/global/colors';
import { normalize } from '~/global/utils';
import constants from '~/global/constants';
import globalStyles from '~/global/styles';

import styles from './styles';
import type { Props } from './types';

const iconProps = {
  borderRadius: 0,
  activeOpacity: 0.5,
  size: normalize(25),
  iconStyle: globalStyles.iconStyle,
  underlayColor: colors.transparent,
  backgroundColor: colors.transparent,
};

const MainHeader = ({
  toggleSearch,
  isTitleVisible,
  isListViewStyle,
  toggleViewStyle,
} : Props) => (
  <View style={styles.headerContainer}>
    <Icon.Button
      {...iconProps}
      color={colors.accent}
      onPress={toggleViewStyle}
      backgroundColor={colors.transparent}
      name={isListViewStyle ? 'list' : 'grid'}
    />
    <Text
      style={[styles.headerTitle, isTitleVisible && { color: 'black' }]}
    >
      {constants.headers.items}
    </Text>
    <View style={styles.headerRightButtonsContainer}>
      <InventoryIcon.Button
        {...iconProps}
        name="dashboard"
        color={colors.accent}
        backgroundColor={colors.transparent}
      />
      <InventoryIcon.Button
        {...iconProps}
        name="search"
        color={colors.accent}
        onPress={toggleSearch}
        backgroundColor={colors.transparent}
      />
    </View>
  </View>
);

export default MainHeader;
