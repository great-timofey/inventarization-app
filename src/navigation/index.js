//  @flow
import React, { Component, Fragment } from 'react';

import R from 'ramda';

import {
  setNavigatior,
  AuthNavigator,
  RootNavigator,
} from 'global/navigations';

const navRef = R.curry(setNavigatior)('HOME_NAVIGATOR');
const authNavRef = R.curry(setNavigatior)('AUTH_NAVIGATOR');

type Props = { isAuthed: boolean };
class AppNavigator extends Component<Props> {
  render() {
    const { isAuthed } = this.props;
    return (
      <Fragment>
        {isAuthed ? (
          <RootNavigator ref={navRef} />
        ) : (
          <AuthNavigator ref={authNavRef} />
        )}
      </Fragment>
    );
  }
}

export default AppNavigator;
