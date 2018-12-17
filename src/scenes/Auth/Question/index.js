// @flow

import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';

import Logo from '~/components/Logo';
import Button from '~/components/Button/index';
import HeaderBackbutton from '~/components/HeaderBackButton';

import Styles from '~/global/styles';
import constants from '~/global/constants';

import styles from './styles';
import type { Props } from './types';

class Question extends PureComponent<Props, {}> {
  static navigationOptions = ({ navigation }: Props) => ({
    headerStyle: Styles.authHeaderStyleBig,
    headerLeft: HeaderBackbutton({
      onPress: () => navigation.goBack(),
    }),
  });

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Logo isSmall />
          <Text style={styles.text}>{constants.text.question}</Text>
        </View>
        <Button
          title={constants.buttonTitles.create}
          onPress={() => {}}
          customStyle={{ marginBottom: 15 }}
        />
        <Button
          isGreen
          onPress={() => {}}
          title={constants.buttonTitles.enter}
        />
      </View>
    );
  }
}

export default Question;
