// @flow

import React, { PureComponent } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

import Button from 'components/Button';
import HeaderTitle from 'components/HeaderTitle';

import assets from 'global/assets';
import Styles from 'global/styles';
import constants from 'global/constants';

import styles from './styles';
import type { State, Props } from './types';

class Organisation extends PureComponent<Props, State> {
  static navigationOptions = ({ navigation }: Props) => ({
    headerStyle: Styles.authHeaderStyle,
    headerTitle: HeaderTitle(),
    headerLeft: (
      <TouchableOpacity
        style={styles.headerLeft}
        onPress={() => navigation.goBack()}
      >
        <Image source={assets.headerBackArrow} />
      </TouchableOpacity>
    ),
  });

  render() {
    return (
      <View style={styles.container}>
        <Button />
      </View>
    );
  }
}

export default Organisation;
