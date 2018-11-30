// @flow

import React, { PureComponent } from 'react';
import { Text, TouchableWithoutFeedback, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import Button from 'components/Button';
import type { ButtonProps } from './types';

const ADD_STAR_MUTATION = gql`
  mutation addStar($repoId: ID!) {
    addStar(input: { starrableId: $repoId }) {
      starrable {
        id
      }
    }
  }
`;

const REMOVE_STAR_MUTATION = gql`
  mutation removeStar($repoId: ID!) {
    removeStar(input: { starrableId: $repoId }) {
      starrable {
        id
      }
    }
  }
`;

class RateButton extends PureComponent<ButtonProps> {
  processStar = async () => {
    const { forAdding, repoId, addStar, removeStar } = this.props;
    const promise = forAdding
      ? addStar({ variables: { repoId } })
      : removeStar({ variables: { repoId } });
    await promise;
    Alert.alert('Star has been successfully processed');
  };

  render() {
    const { forAdding } = this.props;
    return (
      <Button
        title={forAdding ? 'Add Star' : 'Remove Star'}
        onPress={this.processStar}
      />
    );
  }
}

export default compose(
  graphql(ADD_STAR_MUTATION, {
    name: 'addStar',
  }),
  graphql(REMOVE_STAR_MUTATION, {
    name: 'removeStar',
  })
)(RateButton);
