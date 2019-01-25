// @flow
import React, { Fragment, PureComponent } from 'react';
import { Text, View, Image, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';

// $FlowFixMe
import { keys, includes } from 'ramda';
import { withApollo } from 'react-apollo';
import Modal from 'react-native-modal';

import assets from '~/global/assets';
import constants from '~/global/constants';
import { GET_COMPANY_PLACES, GET_COMPANY_USERS_BY_ROLE } from '~/graphql/auth/queries';
import { GET_COMPANY_CATEGORIES_BY_ID } from '~/graphql/categories/queries';

import styles from './styles';
import type { Props, State } from './types';

const variables = {
  responsibleId: {
    companyId: '',
    role: constants.roles.admin,
  },
  placeId: {
    companyId: '',
  },
  category: {
    companyId: '',
  },
};

const queries = {
  placeId: GET_COMPANY_PLACES,
  category: GET_COMPANY_CATEGORIES_BY_ID,
  responsibleId: GET_COMPANY_USERS_BY_ROLE,
};

const valuesToDisplay = {
  responsibleId: 'fullName',
  placeId: 'name',
  category: 'name',
};

const modalsWithoutApolloLogic = {
  onTheBalanceSheet: ['Да', 'Нет'],
};

class ChooseModal extends PureComponent<Props, State> {
  state = {
    data: [],
    error: null,
    loading: false,
  };

  renderModalItem = ({ item, index }: { item: Object, index: number }) => {
    const { onConfirm, type } = this.props;
    let toDisplay;
    if (valuesToDisplay[type]) {
      toDisplay = valuesToDisplay[type];
    } else {
      toDisplay = modalsWithoutApolloLogic[type][index];
    }

    return (
      <TouchableOpacity style={styles.modalItem} onPress={() => onConfirm(item)}>
        <Text style={styles.modalItemText}>{item[toDisplay] || toDisplay}</Text>
      </TouchableOpacity>
    );
  };

  renderModalSeparator = () => <View style={styles.modalSeparator} />;

  keyExtractor = ({ id }, index) => id || index.toString();

  initFields = () => {
    const { client, type, companyId } = this.props;
    if (includes(type, keys(modalsWithoutApolloLogic))) {
      this.setState({ data: modalsWithoutApolloLogic[type] });
    } else {
      this.setState({ loading: true });
      client
        .query({ query: queries[type], variables: { ...variables[type], companyId } })
        .then(({ data }) => {
          console.log(data)
        this.setState({
          loading: false,
          data: data[keys(data)[0]],
        })
        })
        .catch(error => this.setState({ loading: false, error }));
    }
  };

  render() {
    const { data, loading } = this.state;
    const { isVisible, onCancel, type } = this.props;
    return (
      <Modal isVisible={isVisible} style={styles.modalOverlay} onModalShow={this.initFields}>
        <View style={[styles.modalContainer, !data.length && styles.modalContainerWithoutData]}>
          {loading && <ActivityIndicator />}
          {data.length ? (
            <FlatList
              data={data}
              keyExtractor={this.keyExtractor}
              renderItem={this.renderModalItem}
              ItemSeparatorComponent={this.renderModalSeparator}
            />
          ) : (
            <Fragment>
              {type !== 'category' && (
                <Image
                  style={styles.noItemsImage}
                  source={type && assets[`no${type[0].toUpperCase().concat(type.slice(1))}`]}
                />
              )}
              <Text style={styles.noItemsText}>
                {type && constants.hints[`no${type[0].toUpperCase().concat(type.slice(1))}`]}
              </Text>
            </Fragment>
          )}
        </View>
        <TouchableOpacity activeOpacity={1} onPress={onCancel} style={styles.modalCancel}>
          <Text style={styles.modalCancelText}>{constants.buttonTitles.cancel}</Text>
        </TouchableOpacity>
      </Modal>
    );
  }
}

export default withApollo(ChooseModal);
