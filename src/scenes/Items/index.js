//  @flow

import React, { Fragment, PureComponent } from 'react';
import { StatusBar, UIManager } from 'react-native';

import { findIndex, remove } from 'ramda';
import { graphql, compose } from 'react-apollo';
import Search from '~/components/Search';
import ItemsList from '~/components/ItemsList';
import SortModal from '~/components/SortModal';
import IconButton from '~/components/IconButton';
import MainHeader from '~/scenes/Items/MainHeader';
import QuestionModal from '~/components/QuestionModal';
import SearchHeader from '~/scenes/Items/SearchHeader';
import AndroidActionsModal from '~/components/AndroidActionsModal';

import { normalize } from '~/global/utils';
import constants from '~/global/constants';
import { DESTROY_ASSET } from '~/graphql/assets/mutations';
import { GET_COMPANY_ASSETS } from '~/graphql/assets/queries';
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
      isAndroidActionsModalVisible: false,
      itemData: {
        x: 0,
        y: 0,
        name: '',
        purchasePrice: '',
      },
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

  handleDeleteItem = async (id: number | string) => {
    const { destroyAsset } = this.props;
    await destroyAsset({ variables: { id }, update: this.updateDestroyAsset });
    this.toggleDelModalVisible();
    this.setState({ currentSelectItem: null });
  };

  updateDestroyAsset = (cache: Object) => {
    const {
      props: {
        data: {
          //  $FlowFixMe
          userCompany: {
            company: { id: companyId },
          },
        },
      },
      state: { currentSelectItem },
    } = this;
    const data = cache.readQuery({ query: GET_COMPANY_ASSETS, variables: { companyId } });
    const deleteIndex = findIndex(asset => asset.id === currentSelectItem, data.assets);
    data.assets = remove(deleteIndex, 1, data.assets);
    cache.writeQuery({ query: GET_COMPANY_ASSETS, variables: { companyId }, data });
  };

  selectItem = (id: number | string) => {
    this.setState({
      currentSelectItem: id,
    });
  };

  toggleActionsModal = () => {
    const { isAndroidActionsModalVisible } = this.state;
    this.setState({
      isAndroidActionsModalVisible: !isAndroidActionsModalVisible,
    });
  }

  getItemPosition = (itemRef, parentScrollViewRef, item) => {
    const headerHeight = normalize(65);
    UIManager.measure(parentScrollViewRef.getInnerViewNode(), (x, y, width, height, pageX, pageY) => console.log(pageY, 'view'));
    this.setState({
      itemData: {
        x: 0,
        y: 0,
        name: '',
        purchasePrice: '',
      },
    });
    if (itemRef) {
      itemRef.measure((fx, fy, width, height, px, py) => {
        const currentItemPosition = py;
        let itemPositionDiff = 0;
        if (currentItemPosition > 0) {
          itemPositionDiff = headerHeight - currentItemPosition;
        } else {
          itemPositionDiff = Math.abs(currentItemPosition) + headerHeight;
        }

        if (py <= headerHeight) {
          UIManager.measure(parentScrollViewRef.getInnerViewNode(), (x, y, w, h, pageX, pageY) => {
            const currentViewPosition = pageY - headerHeight;
            const coordinateToScroll = currentViewPosition + itemPositionDiff;

            parentScrollViewRef.scrollTo({ x: 0, y: Math.abs(coordinateToScroll), animated: true });

            this.setState({
              itemData: {
                name: item.name,
                x: px,
                y: py + itemPositionDiff,
                purchasePrice: item.purchasePrice,
              },
            });
            setTimeout(() => {
              this.toggleActionsModal();
            }, 150);
          });
        } else {
          this.setState({
            itemData: {
              name: item.name,
              x: px,
              y: py,
              purchasePrice: item.purchasePrice,
            },
          });
          this.toggleActionsModal();
        }
      });
    }
  }

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
      itemData,
      searchValue,
      isSortByName,
      isSearchActive,
      showSortButton,
      isListViewStyle,
      currentSelectItem,
      isSortModalVisible,
      isDeleteModalVisible,
      isAndroidActionsModalVisible,
    } = this.state;

    const {
      data: {
        // $FlowFixMe
        userCompany: {
          role: userRole,
          company: { id: companyId },
        },
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
          getItemPosition={this.getItemPosition}
          isDeleteModalVisible={isDeleteModalVisible}
          handleShowSortButton={this.handleShowSortButton}
          toggleDelModalVisible={this.toggleDelModalVisible}
          isAndroidActionsModalVisible={isAndroidActionsModalVisible}
        />
        {isSearchActive && (
          <Search
            searchValue={searchValue}
            items={constants.data.assets}
            toggleSearch={this.toggleSearch}
          />
        )}
        {showSortButton
        && !isSearchActive
        && !isSortModalVisible
        && !isAndroidActionsModalVisible
        && (
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
          //  $FlowFixMe
          isModalVisible={isDeleteModalVisible}
          data={constants.modalQuestion.itemDel}
          //  $FlowFixMe
          rightAction={() => this.handleDeleteItem(currentSelectItem)}
        />
        <AndroidActionsModal
          itemData={itemData}
          isModalVisible={isAndroidActionsModalVisible}
          toggleActionsModal={this.toggleActionsModal}
        />
      </Fragment>
    );
  }
}

export default compose(
  graphql(GET_CURRENT_USER_COMPANY_CLIENT),
  graphql(DESTROY_ASSET, { name: 'destroyAsset', refetchQueries: [GET_COMPANY_ASSETS] }),
)(ItemsScene);
