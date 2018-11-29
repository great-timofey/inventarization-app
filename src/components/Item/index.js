import React, { PureComponent } from 'react'
import { Text, View } from 'react-native'

import { ApolloConsumer } from 'react-apollo';

export default class Items extends PureComponent {
  state = {
    loading: true,
    data: null
  }

  onDataFetched = (data) => {
    this.setState({ loading: false, data });
  }

  render() {
    Apollo
    return (

    )
  }
}
