//  @flow
import React, { Component } from 'react';
import { StatusBar } from 'react-native';

import gql from 'graphql-tag';
import { ApolloProvider } from 'react-apollo';

import AppNavigator from 'navigation';
import apolloClient from 'services/apolloClient';

type Props = {};
type State = { isAuthed: boolean };

class App extends Component<Props, State> {
  constructor() {
    super();
    this.client = apolloClient;
    state = { isAuthed: false };
  }

  async componentDidUpdate() {
    const {
      data: { isAuthed },
    } = await this.client.query({
      query: gql`
        {
          isAuthed @client
        }
      `,
    });
    this.setState({ isAuthed });
  }

  render() {
    const { isAuthed } = this.state;
    return (
      <ApolloProvider client={apolloClient}>
        <StatusBar barStyle={isAuthed ? 'dark-content' : 'light-content'} />
        <AppNavigator isAuthed={isAuthed} />
      </ApolloProvider>
    );
  }
}

export default App;
