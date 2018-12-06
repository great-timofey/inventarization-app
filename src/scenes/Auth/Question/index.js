// @flow

import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';

import Logo from 'components/Logo';
import Button from 'components/Button/index';
import HeaderBackbutton from 'components/HeaderBackButton';

import Styles from 'global/styles';
import constants from 'global/constants';

import styles from './styles';

class Question extends PureComponent<{}, {}> {
  static navigationOptions = () => ({
    headerStyle: Styles.authHeaderStyle,
    headerLeft: HeaderBackbutton({
      onPress: () => {},
    }),
  });

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Logo isSmall />
          <Text style={styles.text}>{constants.text.question}</Text>
        </View>
        <Button title={constants.buttonTitles.create} onPress={() => {}} />
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
