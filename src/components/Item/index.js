import React, { PureComponent } from 'react';
import { Text, View, Alert } from 'react-native';

import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Button from 'components/Button';

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

type Props = {
  name: string,
  repoId: string,
  addStar: () => void,
  description: string,
  languageName: string,
  removeStar: () => void,
};

class Item extends PureComponent<Props> {
  addStar = async () => {
    const { repoId, addStar } = this.props;
    await addStar({ variables: { repoId } });
    Alert.alert('Star has been successfully added');
  };

  removeStar = async () => {
    const { repoId, removeStar } = this.props;
    await removeStar({ variables: { repoId } });
    Alert.alert('Star has been successfully removed');
  };

  render() {
    const { name, description, languageName } = this.props;
    return (
      <View
        style={{
          marginBottom: 5,
          borderBottomColor: 'black',
          borderBottomWidth: 1,
        }}
      >
        <Text>
          {name} : {description} : {languageName}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Button title="Add Star" onPress={this.addStar} />
          <Button title="Remove Star" onPress={this.removeStar} />
        </View>
      </View>
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
)(Item);
