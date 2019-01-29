//  @flow
import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';

import { includes } from 'ramda';

import colors from '~/global/colors';
import constants from '~/global/constants';
import Map from '~/components/Map';
import Input from '~/components/Input';
import HeaderTitle from '~/components/HeaderTitle';
import HeaderBackButton from '~/components/HeaderBackButton';
import globalStyles from '~/global/styles';

import styles from './styles';
type Props = {};

class PlacesScene extends PureComponent<Props> {
  static navigationOptions = ({ navigation }: Props) => ({
    headerStyle: [globalStyles.authHeaderStyleBig, styles.placesHeaderStyle],
    headerTitle: HeaderTitle({
      color: colors.header.createCompany,
      title: constants.headers.createNewCompany,
    }),
    headerTitleStyle: globalStyles.headerTitleStyle,
    headerLeft: HeaderBackButton({
      onPress: () => navigation.goBack(),
    }),
    headerRight: <View />,
  });

  state = {
    place: 'My place',
    warnings: [],
  };

  render() {
    const { place, warnings } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.inputView}>
          <Input
            isWhite
            value={place}
            style={styles.input}
            blurOnSubmit={false}
            customStyles={styles.input}
            type={constants.inputTypes.place}
            placeholder={constants.placeholders.place}
            isWarning={includes('companyName', warnings)}
            onSubmitEditing={() => this.focusField(this.emailRef)}
            onChangeText={text => this.onChangeField('companyName', text)}
          />
        </View>
        <Map customStyles={styles.map} />
      </View>
    );
  }
}

export default PlacesScene;
