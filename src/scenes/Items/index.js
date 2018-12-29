//  @flow

import React, { Fragment, PureComponent } from 'react';
import { StatusBar } from 'react-native';

import { graphql } from 'react-apollo';
import Search from '~/components/Search';
import ItemsList from '~/components/ItemsList';
import SortModal from '~/components/SortModal';
import IconButton from '~/components/IconButton';
import MainHeader from '~/scenes/Items/MainHeader';
import QuestionModal from '~/components/QuestionModal';
import SearchHeader from '~/scenes/Items/SearchHeader';

import { normalize } from '~/global/utils';
import constants from '~/global/constants';
import { GET_CURRENT_USER_COMPANY_CLIENT } from '~/graphql/auth/queries';

import type { Props, State } from './types';

class ItemsScene extends PureComponent<Props, State> {
  static navigationOptions = ({ navigation }: { navigation: Object }) => {
    const { state } = navigation;
    const searchValue = state.params && state.params.searchValue;
    const toggleSearch = state.params && state.params.toggleSearch;
    const isSearchActive = state.params && state.params.isSearchActive;
    const isTitleVisible = state.params && state.params.isTitleVisible;
    const toggleViewStyle = state.params && state.params.toggleViewStyle;
    const isListViewStyle = state.params && state.params.isListViewStyle;
    const onChangeSearchField = state.params && state.params.onChangeSearchField;

    return {
      header: isSearchActive ? (
        <SearchHeader
          searchValue={searchValue}
          toggleSearch={toggleSearch}
          onChangeSearchField={onChangeSearchField}
        />
      ) : (
        <MainHeader
          toggleSearch={toggleSearch}
          isTitleVisible={isTitleVisible}
          isListViewStyle={isListViewStyle}
          toggleViewStyle={toggleViewStyle}
        />
      ),
    };
  };

  constructor(props: Props) {
    super(props);
    const { navigation } = this.props;

    this.state = {
      searchValue: '',
      isSortByName: true,
      showSortButton: false,
      isSearchActive: false,
      isListViewStyle: false,
      currentSelectItem: null,
      isSortModalVisible: false,
      isDeleteModalVisible: false,
    };

    navigation.setParams({
      searchValue: '',
      isSearchActive: false,
      isTitleVisible: false,
      isListViewStyle: false,
      toggleSearch: this.toggleSearch,
      toggleViewStyle: this.toggleViewStyle,
      onChangeSearchField: this.onChangeSearchField,
    });
  }

  toggleSortModalVisible = () => {
    const { isSortModalVisible } = this.state;
    this.setState({
      isSortModalVisible: !isSortModalVisible,
    });
  };

  toggleDelModalVisible = () => {
    const { isDeleteModalVisible } = this.state;
    this.setState({
      isDeleteModalVisible: !isDeleteModalVisible,
    });
  };


  toggleViewStyle = () => {
    const { navigation } = this.props;
    const { isListViewStyle } = this.state;

    this.setState({
      isListViewStyle: !isListViewStyle,
      currentSelectItem: null,
    });

    navigation.setParams({
      isListViewStyle: !isListViewStyle,
    });
  };

  toggleSearch = () => {
    const { navigation } = this.props;
    const { isSearchActive } = this.state;

    this.setState({
      searchValue: '',
      currentSelectItem: null,
      isSearchActive: !isSearchActive,
    });

    navigation.setParams({
      searchValue: '',
      isSearchActive: !isSearchActive,
    });
  };

  toggleSortMethod = () => {
    const { isSortByName } = this.state;
    this.setState(
      {
        isSortByName: !isSortByName,
      },
      this.toggleSortModalVisible,
    );
  };

  handleShowSortButton = (value: boolean) => this.setState({
    showSortButton: value,
  });

  handleDeleteItem = (id: number | string) => {
    console.log('removing item ', id);
    this.toggleDelModalVisible();
  }

  selectItem = (id: number | string) => {
    this.setState({
      currentSelectItem: id,
    });
  };

  onChangeSearchField = (value: string) => {
    const { navigation } = this.props;
    navigation.setParams({
      searchValue: value,
    });
    this.setState({
      searchValue: value.toLowerCase().trim(),
    });
  };

  navListener: any;

  componentDidMount() {
    const { navigation } = this.props;
    this.navListener = navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
    });
  }

  componentWillUnmount() {
    this.navListener.remove();
  }

  render() {
    const {
      searchValue,
      isSortByName,
      isSearchActive,
      showSortButton,
      isListViewStyle,
      currentSelectItem,
      isSortModalVisible,
      isDeleteModalVisible,
    } = this.state;
    const {
      // $FlowFixMe
      data: {
        userCompany: { role: userRole, company: { id: companyId } },
      },
      navigation,
    } = this.props;
    return (
      <Fragment>
        <ItemsList
          userRole={userRole}
          companyId={companyId}
          navigation={navigation}
          swipeable={isListViewStyle}
          isSortByName={isSortByName}
          selectItem={this.selectItem}
          currentSelectItem={currentSelectItem}
          isDeleteModalVisible={isDeleteModalVisible}
          handleShowSortButton={this.handleShowSortButton}
          toggleDelModalVisible={this.toggleDelModalVisible}
        />
        {isSearchActive && (
          <Search
            searchValue={searchValue}
            items={constants.data.assets}
            toggleSearch={this.toggleSearch}
          />
        )}
        {!isSortModalVisible && !isSearchActive && showSortButton && (
          <IconButton
            isCustomIcon
            size={isSortByName ? 50 : 70}
            onPress={this.toggleSortModalVisible}
            customPosition={{ position: 'absolute', right: 30, bottom: 30 }}
            iconName={isSortByName ? 'button-sort-name' : 'button-sort-price'}
            customIconStyle={!isSortByName ? { top: normalize(-4), left: normalize(-6) } : {}}
          />
        )}
        <SortModal
          isSortByName={isSortByName}
          isModalVisible={isSortModalVisible}
          toggleSortMethod={this.toggleSortMethod}
          toggleModalVisible={this.toggleSortModalVisible}
        />
        <QuestionModal
          leftAction={this.toggleDelModalVisible}
          isModalVisible={isDeleteModalVisible}
          data={constants.modalQuestion.itemDel}
          rightAction={() => this.handleDeleteItem(currentSelectItem)}
        />
      </Fragment>
    );
  }
}

export default graphql(GET_CURRENT_USER_COMPANY_CLIENT)(ItemsScene);
