//  @flow
import React, { Component, Fragment } from 'react';
import { StatusBar } from 'react-native';

import R from 'ramda';
import { graphql } from 'react-apollo';
import SplashScreen from 'react-native-splash-screen';

import {
  setNavigatior,
  AuthNavigator,
  RootNavigator,
} from '~/global/navigations';
import { GET_USER_AUTH_CLIENT } from '~/graphql/auth/queries';

const navRef = R.curry(setNavigatior)('HOME_NAVIGATOR');
const authNavRef = R.curry(setNavigatior)('AUTH_NAVIGATOR');

type Props = { data: Object };
class AppNavigator extends Component<Props> {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    const {
      data: { isAuthed },
    } = this.props;
    return (
      <Fragment>
        <StatusBar barStyle={isAuthed ? 'dark-content' : 'light-content'} />
        {isAuthed ? (// $FlowFixMe
          <RootNavigator ref={navRef} />
        ) : (// $FlowFixMe
          <AuthNavigator ref={authNavRef} />
        )}
      </Fragment>
    );
  }
}
export default graphql(GET_USER_AUTH_CLIENT)(AppNavigator);
