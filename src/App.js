//  @flow
import React, { Component } from 'react';

import AppNavigator from '~/navigation';
import { ApolloProvider } from 'react-apollo';
import getApolloClient from '~/services/apolloClient';

import Loader from '~/components/Loader';

type Props = {};
type State = { client: ?Object, loading: boolean };

class App extends Component<Props, State> {
  constructor() {
    super();

    this.state = {
      client: null,
      loading: true,
    };
  }

  async componentWillMount() {
    const client = await getApolloClient();
    this.setState({ client, loading: false });
  }

  render() {
    const { loading, client } = this.state;
    if (loading) return <Loader />;
    return (
      <ApolloProvider client={client}>
        <AppNavigator />
      </ApolloProvider>
    );
  }
}

export default App;
