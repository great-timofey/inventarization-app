// @flow

import React, { PureComponent } from 'react';
import { View, Text, StatusBar } from 'react-native';

import { compose, graphql, withApollo } from 'react-apollo';

import Logo from '~/components/Logo';
import Styles from '~/global/styles';
import Button from '~/components/Button';
import constants from '~/global/constants';
import * as QUERIES from '~/graphql/auth/queries';
import * as SCENES_NAMES from '~/navigation/scenes';
import * as MUTATIONS from '~/graphql/auth/mutations';
import HeaderBackbutton from '~/components/HeaderBackButton';

import styles from './styles';
import type { Props } from './types';

class Question extends PureComponent<Props, {}> {
  static navigationOptions = ({ navigation }: Props) => ({
    headerStyle: Styles.authHeaderStyleBig,
    headerLeft: HeaderBackbutton({
      onPress: () => navigation.goBack(),
    }),
  });

  navListener: any;

  componentDidMount() {
    const { navigation } = this.props;
    this.navListener = navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content');
    });
  }

  setupUser = async () => {
    const { client, setUserIdMutationClient, setUserCompanyMutationClient } = this.props;

    const {
      data: {
        current: { id, userCompanies },
      },
    } = await client.query({
      fetchPolicy: 'network-only',
      query: QUERIES.GET_CURRENT_USER_COMPANIES,
    });

    const userHaveCompany = userCompanies.length > 0;

    if (userHaveCompany) {
      const [firstCompany] = userCompanies;
      await setUserCompanyMutationClient({ variables: { userCompany: firstCompany } });
    }
    await setUserIdMutationClient({ variables: { id } });

    return userHaveCompany;
  };

  handleCreateCompany = async () => {
    const { navigation } = this.props;
    navigation.navigate(SCENES_NAMES.CreateCompanySceneName);
  };

  handleEnterAsUser = async () => {
    const { navigation, setAuthMutationClient } = this.props;
    const userHaveCompany = await this.setupUser();
    if (userHaveCompany) {
      await setAuthMutationClient({ variables: { isAuthed: true } });
    } else {
      navigation.navigate(SCENES_NAMES.UnorganizedSceneName);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Logo isSmall />
          <Text style={styles.text}>{constants.text.question}</Text>
        </View>
        <Button
          onPress={this.handleCreateCompany}
          title={constants.buttonTitles.create}
          customStyle={styles.customButtonStyle}
        />
        <Button isGreen onPress={this.handleEnterAsUser} title={constants.buttonTitles.enter} />
      </View>
    );
  }
}

export default compose(
  withApollo,
  graphql(MUTATIONS.SET_AUTH_MUTATION_CLIENT, {
    name: 'setAuthMutationClient',
  }),
  graphql(MUTATIONS.SET_USER_COMPANY_MUTATION_CLIENT, {
    name: 'setUserCompanyMutationClient',
  }),
  graphql(MUTATIONS.SET_USER_ID_MUTATION_CLIENT, {
    name: 'setUserIdMutationClient',
  }),
)(Question);
