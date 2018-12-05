//  @flow
import React, { Component, Fragment } from 'react';
import { StatusBar } from 'react-native';

import R from 'ramda';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import {
  setNavigatior,
  AuthNavigator,
  RootNavigator,
} from 'global/navigations';

const navRef = R.curry(setNavigatior)('HOME_NAVIGATOR');
const authNavRef = R.curry(setNavigatior)('AUTH_NAVIGATOR');

type Props = { data: Object };
class AppNavigator extends Component<Props> {
  render() {
    const {
      data: { isAuthed },
    } = this.props;
    return (
      <Fragment>
        <StatusBar barStyle={isAuthed ? 'dark-content' : 'light-content'} />
        {isAuthed ? (
          <RootNavigator ref={navRef} />
        ) : (
          <AuthNavigator ref={authNavRef} />
        )}
      </Fragment>
    );
  }
}
export default graphql(
  gql`
    {
      isAuthed @client
    }
  `
)(AppNavigator);
