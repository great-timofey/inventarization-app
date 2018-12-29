import React, { PureComponent } from 'react';

import {
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { Query } from 'react-apollo';
import SortableList from 'react-native-sortable-list';

import Icon from 'react-native-vector-icons/Ionicons';
import HeaderBackbutton from '~/components/HeaderBackButton';

import colors from '~/global/colors';
import { normalize } from '~/global/utils';
import constants from '~/global/constants';
import CustomIcon from '~/assets/InventoryIcon';
import * as SCENE_NAMES from '~/navigation/scenes';
import { GET_COMPANY_CATEGORIES } from '~/graphql/categories/queries';

import styles from './styles';

const DrugButtons = () => {
  const x = [...Array(6)];
  return (
    <View style={styles.drugButtons}>
      {x.map((x, index) => (
        <View
          key={index}
          style={styles.dots}
        />
      ))}
    </View>
  );
};

class CategoryList extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: constants.text.categoryList,
    headerStyle: styles.headerStyle,
    headerTitleStyle: styles.header,
    headerLeft: HeaderBackbutton({
      onPress: () => navigation.navigate(SCENE_NAMES.ItemsSceneName),
    }),
  })

  categoryItem = ({ data, active }) => {
    const { navigation } = this.props;

    return (
      <TouchableOpacity
        style={styles.menuContainer}
        onPress={() => navigation.navigate(
          SCENE_NAMES.CategoryEdit,
          {
            id: data.id,
            icon: data.icon,
            title: data.name,
            subCategories: data.chields,
          },
        )}
      >
        <DrugButtons />
        <CustomIcon
          name={data.icon}
          size={normalize(25)}
          color={colors.black}
          backgroundColor={colors.transparent}
        />
        <View style={styles.wrapper}>
          <Text style={styles.text}>
            {data.name}
          </Text>
          <Icon
            style={styles.arrow}
            color={colors.black}
            size={normalize(20)}
            name="ios-arrow-forward"
            backgroundColor={colors.transparent}
          />
        </View>
      </TouchableOpacity>
    );
  };

  keyExtractor = (el: any, index: number) => `${el.id || index}`;

  render() {
    const { navigation } = this.props;

    return (
      <Query query={GET_COMPANY_CATEGORIES}>
        {({ data, loading, error }) => {
          if (loading) return <ActivityIndicator />;
          if (error) {
            return (
              <View>
                <Text>{error.message}</Text>
              </View>
            );
          }
          const { categories } = data.current.companies['0'];
          let categoryList = null;
          if (data) {
            categoryList = categories.filter(i => i.parent === null);
          }
          const categoryListTest = Object.assign({}, categoryList);

          return (
            <ScrollView style={styles.container}>
              <StatusBar barStyle="dark-content" />
              <SortableList
                data={categoryListTest}
                renderRow={this.categoryItem}
              />
              <TouchableOpacity
                style={styles.addButtonContainer}
                onPress={() => navigation.navigate(SCENE_NAMES.CategoryEdit)}
              >
                <Text style={styles.addButtonText}>
                  {constants.text.addCategory}
                </Text>
              </TouchableOpacity>
            </ScrollView>
          );
        }}
      </Query>
    );
  }
}

export default CategoryList;
