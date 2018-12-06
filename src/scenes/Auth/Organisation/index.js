// @flow

import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';

import Button from 'components/Button';
import HeaderBackbutton from 'components/HeaderBackButton';

import Styles from 'global/styles';
import constants from 'global/constants';

import type { Props } from './types';
import styles from './styles';

class Organisation extends PureComponent<Props, {}> {
  static navigationOptions = ({ navigation }: Props) => ({
    headerStyle: Styles.authHeaderStyle,
    headerLeft: HeaderBackbutton({
      onPress: () => navigation.goBack(),
    }),
  });

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Text style={styles.text}>{constants.text.organisation}</Text>
        </View>

        <Button title={constants.buttonTitles.update} onPress={() => {}} />
      </View>
    );
  }
}

export default Organisation;
