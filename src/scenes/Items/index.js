//  @flow
import React, { PureComponent } from 'react';
import { Text, View, ScrollView } from 'react-native';

import gql from 'graphql-tag';
import Icon from 'react-native-vector-icons/Feather';
import { withApollo, Mutation } from 'react-apollo';

import InventoryIcon from 'assets/InventoryIcon';
import colors from 'global/colors';
import constants from 'global/constants';
import globalStyles from 'global/styles';
import styles from './styles';

const GET_REPOS_QUERY = gql`
  query myQuery($login: String!) {
    user(login: $login) {
      id
      url
      login
      repositories(first: 3) {
        edges {
          node {
            id
            name
            description
            primaryLanguage {
              name
            }
          }
        }
      }
    }
  }
`;

const SIGN_IN_MUTATION = gql`
  mutation SignInUser(input: {$email: String!, $password:String!}) {
    signInUser(input: {email: $email, password: $password}) {
      message
      token
    }
  }
`;

const iconProps = {
  size: 25,
  borderRadius: 0,
  iconStyle: globalStyles.iconStyle,
  backgroundColor: colors.transparent,
};

type Props = { client: Object };
type State = { data: ?Object, loading: boolean };
class ItemsScene extends PureComponent<Props, State> {
  static navigationOptions = () => ({
    header: () => (
      <View style={styles.headerContainer}>
        <Icon.Button
          {...iconProps}
          name="grid"
          color={colors.accent}
          backgroundColor={colors.transparent}
        />
        <View style={styles.headerRightButtonsContainer}>
          <InventoryIcon.Button
            {...iconProps}
            name="dashboard"
            color={colors.accent}
            backgroundColor={colors.transparent}
          />
          <InventoryIcon.Button
            {...iconProps}
            name="search"
            color={colors.accent}
            backgroundColor={colors.transparent}
          />
        </View>
      </View>
    ),
  });

  state = {
    data: null,
    loading: false,
  };

  signIn = () => {
    const user = {
      email: 'ttverdokhlebov@some.team',
      password: '11112222',
    };

    return <Mutation mutation={SIGN_IN_MUTATION}>{}</Mutation>;
  };

  /*
  getItems = async () => {
    this.setState({ loading: true });
    const { client } = this.props;
    const { data } = await client.query({
      query: GET_REPOS_QUERY,
      variables: { login: 'great-timofey' },
    });
    this.setState({ data, loading: false });
  };

  renderItem = ({
    item: {
      node: {
        id,
        name,
        description,
        primaryLanguage: { name: languageName },
      },
    },
  }) => (
    <Item
      repoId={id}
      name={name}
      description={description}
      languageName={languageName}
    />
  );
  */

  render() {
    const { loading, data } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.header}>{constants.headers.items}</Text>
        </ScrollView>
      </View>
    );
  }
}
/*
  {loading && <ActivityIndicator />}
  {data ? (
    <FlatList
      keyExtractor={item => item.node.id}
      data={data.user.repositories.edges}
      renderItem={this.renderItem}
    />
  ) : (
    !loading && (
      <TouchableOpacity onPress={this.getItems}>
        <Text>Get Info from Github API</Text>
      </TouchableOpacity>
    )
  )}
*/

export default withApollo(ItemsScene);
