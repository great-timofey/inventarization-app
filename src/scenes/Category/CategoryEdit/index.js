import React, { PureComponent } from 'react';

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import { compose, graphql } from 'react-apollo';
import CustomIcon from '~/assets/InventoryIcon';
import Icon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Input from '~/components/Input';
import Button from '~/components/Button';
import HeaderTitle from '~/components/HeaderTitle';
import QuestionModal from '~/components/QuestionModal';
import HeaderBackButton from '~/components/HeaderBackButton';

import colors from '~/global/colors';
import globalStyles from '~/global/styles';
import { normalize } from '~/global/utils';
import constants from '~/global/constants';
import * as QUERIES from '~/graphql/auth/queries';

import {
  UPDATE_CATEGORY,
  CREATE_CATEGORY,
  DESTROY_CATEGORY,
} from '~/graphql/categories/mutations';

import styles from './styles';

const HeaderTrashButton = ({ onPress }: { onPress: Function }) => (
  <TouchableOpacity
    onPress={onPress}
    style={styles.rightHeaderButton}
    underlayColor={colors.transparent}
  >
    <FeatherIcon.Button
      size={24}
      name="trash-2"
      onPress={onPress}
      color={colors.red}
      activeOpacity={0.5}
      underlayColor={colors.transparent}
      style={styles.rightHeaderButtonIcon}
    />
  </TouchableOpacity>
);

class CategoryEdit extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    const toggleDelModal = state.params && state.params.toggleDelModal;
    return ({
      headerStyle: [
        globalStyles.authHeaderStyleBig,
        { backgroundColor: colors.white },
      ],
      headerTitle: HeaderTitle({
        color: colors.header.createCompany,
        title: constants.headers.editCategory,
      }),
      headerLeft: HeaderBackButton({
        onPress: () => navigation.goBack(),
      }),
      headerRight: <HeaderTrashButton onPress={toggleDelModal} />,
    });
  }

  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const icon = navigation.state.params && navigation.state.params.icon;
    const title = navigation.state.params && navigation.state.params.title;

    this.state = {
      subCategoryList: [],
      inputValue: title || '',
      isSubCategoryEdit: false,
      selectIconName: icon || '',
      isDeleteModalVisible: false,
    };

    navigation.setParams({
      toggleDelModal: this.toggleDelModal,
    });
  }

  toggleDelModal = () => {
    const { isDeleteModalVisible } = this.state;
    this.setState({
      isDeleteModalVisible: !isDeleteModalVisible,
    });
  };

  onChangeField = (field: string, value: string) => {
    this.setState({
      [field]: value,
    });
  };

  selectIcon = (iconName) => {
    this.setState({
      selectIconName: iconName,
    });
  }

  keyExtractor = (el: any, index: number) => `${el.id || index}`;

  addSubCategory = () => {
    this.setState({
      isSubCategoryEdit: true,
    });
  }

  changeSubcategory = () => {
    const { subCategoryList } = this.state;
    if (this.subCategoryValue
       && this.subCategoryValue._lastNativeText
       && this.subCategoryValue._lastNativeText.trim() !== ''
    ) {
      this.setState({
        isSubCategoryEdit: false,
        subCategoryList: [
          ...subCategoryList,
          { name: this.subCategoryValue._lastNativeText.trim() },
        ],
      });
    }
    this.setState({
      isSubCategoryEdit: false,
    });
  }

  onSubmitForm = async () => {
    const {
      navigation,
      userCompany,
      createCategory,
      updateCategory } = this.props;
    const {
      inputValue,
      selectIconName,
      subCategoryList } = this.state;

    const id = navigation.state.params && navigation.state.params.id;
    const icon = navigation.state.params && navigation.state.params.icon;
    const title = navigation.state.params && navigation.state.params.title;

    const variables = { id };

    if (inputValue.trim() !== title && inputValue.trim() !== '') {
      variables.name = inputValue;
    }
    if (selectIconName.trim() !== icon && selectIconName.trim() !== '') {
      variables.icon = selectIconName;
    }

    if (id && title) {
      if ((inputValue.trim() !== title && inputValue.trim() !== '')
          || (selectIconName.trim() !== icon && selectIconName.trim() !== '')) {
        try {
          await updateCategory(
            { variables },
          );
        } catch (error) {
          console.log(error.message);
        }
      }

      if (subCategoryList.length) {
        subCategoryList.forEach(async (i) => {
          try {
            await createCategory(
              { variables:
                {
                  icon: '',
                  name: i.name,
                  parentId: id,
                  companyId: userCompany.id,
                },
              },
            );
          } catch (error) {
            console.log(error.message);
          }
        });
      }
      navigation.goBack();
    }

    if (inputValue.trim() !== '' && selectIconName.trim() !== '') {
      try {
        const { data: { createCategory: { id } } } = await createCategory(
          { variables:
              {
                parentId: null,
                icon: selectIconName,
                name: inputValue.trim(),
                companyId: userCompany.id,
              },
          },
        );
        if (subCategoryList.length && id) {
          subCategoryList.forEach(async (i) => {
            try {
              await createCategory(
                { variables:
                  {
                    icon: '',
                    name: i.name,
                    parentId: id,
                    companyId: userCompany.id,
                  },
                },
              );
            } catch (error) {
              console.log(error.message);
            }
          });
        }
      } catch (error) {
        console.log(error.message);
      }
      navigation.goBack();
    }
  }

  handleDestroyCategory = async () => {
    const { destroyCategory, navigation } = this.props;
    const id = navigation.state.params && navigation.state.params.id;

    try {
      await destroyCategory(
        { variables: { id } },
      );
    } catch (error) {
      console.log(error.message);
    }
    navigation.goBack();
  };

  handleDestroySubCategory = async (subCategoryId) => {
    const { destroyCategory } = this.props;
    if (subCategoryId !== null) {
      try {
        await destroyCategory(
          { variables: { id: subCategoryId } },
        );
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  handleDelSubCategory = (name) => {
    const { subCategoryList } = this.state;
    this.setState({
      subCategoryList: subCategoryList.filter(i => i.name !== name),
    });
  }

  iconRender = ({ item }) => {
    const { selectIconName } = this.state;
    const isIconSelected = selectIconName === item.name;

    return (
      <TouchableOpacity
        onPress={() => this.selectIcon(item.name)}
        style={[styles.iconContainer, isIconSelected && styles.iconContainerSelect]}
      >
        <CustomIcon
          name={item.name}
          size={normalize(30)}
          backgroundColor={colors.transparent}
          color={isIconSelected ? colors.black : colors.blackOpacity}
        />
      </TouchableOpacity>
    );
  }

  renderSubCategory = ({ item }) => (
    <Input
      isWhite
      editable={false}
      value={item.name}
      type={constants.inputTypes.subCategory}
    >
      <Icon.Button
        name="ios-close"
        color={colors.red}
        activeOpacity={0.5}
        size={normalize(34)}
        underlayColor={colors.transparent}
        backgroundColor={colors.transparent}
        onPress={item.id
          ? () => this.handleDestroySubCategory(item.id)
          : () => this.handleDelSubCategory(item.name)
        }
      />
    </Input>
  )

  subCategoryValue: any

  render() {
    const {
      inputValue,
      selectIconName,
      subCategoryList,
      isSubCategoryEdit,
      isDeleteModalVisible,
    } = this.state;
    const { navigation } = this.props;
    const subCategories = navigation.state.params && navigation.state.params.subCategories;

    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <View>
          <Input
            isWhite
            returnKeyType="go"
            value={inputValue}
            blurOnSubmit={false}
            type={constants.inputTypes.category}
            onChangeText={text => this.onChangeField('inputValue', text)}
          />
          <FlatList
            numColumns={4}
            scrollEnabled={false}
            extraData={selectIconName}
            renderItem={this.iconRender}
            keyExtractor={this.keyExtractor}
            data={constants.categoryIconList}
            contentContainerStyle={styles.flatlistContainer}
          />
          {subCategories && subCategories.length > 0 && (
            <FlatList
              data={subCategories}
              scrollEnabled={false}
              renderItem={this.renderSubCategory}
              keyExtractor={(_, index) => index.toString()}
            />
          )}
          <FlatList
            scrollEnabled={false}
            data={subCategoryList}
            renderItem={this.renderSubCategory}
            keyExtractor={(_, index) => index.toString()}
          />
          {isSubCategoryEdit ? (
            <Input
              isWhite
              autoFocus
              returnKeyType="go"
              blurOnSubmit={false}
              onSubmitForm={this.changeSubcategory}
              type={constants.inputTypes.name}
              fieldRef={(ref) => { this.subCategoryValue = ref; }}
            >
              <Icon.Button
                color={colors.blue}
                activeOpacity={0.5}
                size={normalize(34)}
                iconStyle={{ marginRight: 0 }}
                onPress={this.changeSubcategory}
                underlayColor={colors.transparent}
                backgroundColor={colors.transparent}
                name={isSubCategoryEdit ? 'ios-checkmark-circle' : 'ios-close'}
              />
            </Input>
          ) : (
            <TouchableOpacity onPress={this.addSubCategory}>
              <Text style={[styles.addButtonText, subCategoryList.length > 0 && styles.withoutMargin]}>
                {constants.buttonTitles.addSubCategory}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <Button
          onPress={this.onSubmitForm}
          title={constants.buttonTitles.save}
        />
        <QuestionModal
          leftAction={this.toggleDelModal}
          isModalVisible={isDeleteModalVisible}
          rightAction={this.handleDestroyCategory}
          data={constants.modalQuestion.categotyDel}
        />
      </KeyboardAwareScrollView>
    );
  }
}

export default compose(
  graphql(QUERIES.GET_CURRENT_USER_COMPANY_CLIENT, {
    props: ({ data: { userCompany } }) => ({ userCompany }),
  }),
  graphql(UPDATE_CATEGORY, { name: 'updateCategory' }),
  graphql(CREATE_CATEGORY, { name: 'createCategory' }),
  graphql(DESTROY_CATEGORY, { name: 'destroyCategory' }),

)(CategoryEdit);
