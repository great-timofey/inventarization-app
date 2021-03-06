// @flow
import React, { Fragment, PureComponent } from 'react';
import { Text, StatusBar, View, Image, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';

// $FlowFixMe
import { keys, includes, find, prop, propEq, filter, head, length } from 'ramda';
import { withApollo } from 'react-apollo';
import Modal from 'react-native-modal';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { isAndroid } from '~/global/device';
import { capitalize, normalize, getPrefix } from '~/global/utils';
import CustomIcon from '~/assets/InventoryIcon';
import colors from '~/global/colors';
import assets from '~/global/assets';
import constants from '~/global/constants';
import * as AUTH_QUERIES from '~/graphql/auth/queries';
import * as PLACES_QUERIES from '~/graphql/places/queries';
import * as CATEGORIES_QUERIES from '~/graphql/categories/queries';

import styles from './styles';
import type { Props, State } from './types';

const variables = {
  placeId: {
    companyId: '',
  },
  category: {
    companyId: '',
  },
  responsibleId: {
    companyId: '',
    role: constants.roles.admin,
  },
};

const queries = {
  placeId: PLACES_QUERIES.GET_COMPANY_PLACES,
  responsibleId: AUTH_QUERIES.GET_COMPANY_USERS_BY_ROLE,
  category: CATEGORIES_QUERIES.GET_COMPANY_CATEGORIES_BY_ID,
};

const valuesToDisplay = {
  responsibleId: 'fullName',
  placeId: 'name',
  category: 'name',
};

const modalsWithoutApolloLogic = {
  onTheBalanceSheet: [constants.words.yes, constants.words.no],
};

const initialState = {
  data: [],
  error: null,
  loading: false,
  categories: [],
  isDrilledDown: false,
  currentlyActiveCategoryId: null,
};

class ChooseModal extends PureComponent<Props, State> {
  state = {
    ...initialState,
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
          const firstKey = head(keys(data));
          let dataToShow = data[firstKey];
          const isCategoryModal = type === 'category';
          if (isCategoryModal) {
            const { categories } = data;
            dataToShow = this.getTopCategories(categories);
          }
          this.setState({
            loading: false,
            data: dataToShow,
            categories: isCategoryModal ? data[firstKey] : [],
          });
        })
        .catch(error => this.setState({ loading: false, error }));
    }
  };

  clearData = () => this.setState({ ...initialState });

  /*  categories-specific stuff */

  getTopCategories = (data: Array<Object>) => {
    const hasNoParent = propEq('parent', null);
    return filter(hasNoParent, data);
  };

  riseUp = () => {
    const { categories } = this.state;
    const data = this.getTopCategories(categories);
    this.setState({ data, isDrilledDown: false, currentlyActiveCategoryId: null });
  };

  getDown = (index: number) => {
    const { categories } = this.state;
    const { name, id, childs } = categories[index];
    const toShow = [{ name }, { name: `${getPrefix(name)} ${name}` }, ...childs];
    this.setState({ data: toShow, isDrilledDown: true, currentlyActiveCategoryId: id });
  };

  renderCategoryModalItem = ({ item, index }) => {
    const { icon, name } = item;
    const { onConfirm } = this.props;
    const { categories, isDrilledDown, currentlyActiveCategoryId } = this.state;

    const getChildren = prop('childs');
    const haveChildren = length(getChildren(categories[index])) > 0;

    let onPress = () => onConfirm(item);
    if (isDrilledDown) {
      if (index === 0) {
        onPress = this.riseUp;
      } else if (index === 1) {
        const pred = propEq('id', currentlyActiveCategoryId);
        const categoryToSelect = find(pred, categories);
        onPress = () => onConfirm(categoryToSelect);
      }
    } else if (haveChildren) {
      onPress = () => this.getDown(index);
    }

    return (
      <TouchableOpacity style={styles.modalItem} onPress={onPress}>
        {isDrilledDown && !index && (
          <FeatherIcon
            name="chevron-left"
            size={normalize(25)}
            color={colors.black}
            style={styles.categoryIcon}
            backgroundColor={colors.transparent}
          />
        )}
        {icon && (
          <CustomIcon
            name={icon}
            size={normalize(25)}
            color={colors.black}
            style={styles.categoryIcon}
            backgroundColor={colors.transparent}
          />
        )}
        <Text
          style={[
            styles.modalItemText,
            //  $FlowFixMe
            isDrilledDown && index && styles.drilledDownText,
            isDrilledDown && index === 1 && styles.allCategoryText,
          ]}
        >
          {name}
        </Text>
        {haveChildren && !isDrilledDown && (
          <FeatherIcon
            name="chevron-right"
            size={normalize(25)}
            color={colors.black}
            style={styles.getDownIcon}
            backgroundColor={colors.transparent}
          />
        )}
      </TouchableOpacity>
    );
  };

  render() {
    const { data, loading } = this.state;
    const { isVisible, onCancel, type } = this.props;
    const isCategoryModal = type === 'category';
    return (
      <Modal
        isVisible={isVisible}
        style={styles.modalOverlay}
        onModalHide={this.clearData}
        onModalShow={this.initFields}
      >
        {isAndroid && <StatusBar backgroundColor={colors.androidModalStatusBarOverlay} barStyle="light-content" />}
        <View style={[styles.modalContainer, !data.length && styles.modalContainerWithoutData]}>
          {loading && <ActivityIndicator size="large" color={colors.accent} />}
          {data.length ? (
            <FlatList
              data={data}
              keyExtractor={this.keyExtractor}
              ItemSeparatorComponent={this.renderModalSeparator}
              renderItem={isCategoryModal ? this.renderCategoryModalItem : this.renderModalItem}
            />
          ) : (
            <Fragment>
              {!isCategoryModal && (
                <Image
                  style={styles.noItemsImage}
                  source={type && assets[`no${capitalize(type)}`]}
                />
              )}
              <Text style={styles.noItemsText}>
                {type && constants.hints[`no${capitalize(type)}`]}
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
