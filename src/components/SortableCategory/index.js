//  @flow
import React, { PureComponent } from 'react';
import {
  Text,
  View,
  Easing,
  Animated,
  TouchableOpacity,
} from 'react-native';

import { range } from 'ramda';

import Icon from 'react-native-vector-icons/Ionicons';

import CustomIcon from '~/assets/InventoryIcon';

import colors from '~/global/colors';
import { normalize } from '~/global/utils';

import styles from './styles';

const DrugButtons = () => {
  const x = range(1, 7);
  return (
    <View style={styles.drugButtons}>
      {x.map(xIndex => (
        <View
          key={xIndex}
          style={styles.dots}
        />
      ))}
    </View>
  );
};

type Props = {|
  data: Object,
  active: boolean,
  navigateToEdit: Function,
|}

class SortableCategory extends PureComponent<Props, {}> {
  active = new Animated.Value(0);

  style = {
    transform: [{
      scale: this.active.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.04],
      }),
    }],
  }

  componentDidUpdate(prevProps: Props) {
    const { active } = this.props;

    if (active !== prevProps.active) {
      Animated.timing(this.active, {
        duration: 300,
        easing: Easing.bounce,
        toValue: Number(active),
      }).start();
    }
  }

  navigateToEdit = () => {
    const { data: { id, icon, name, chields }, navigateToEdit } = this.props;
    navigateToEdit(id, icon, name, chields);
  }

  render() {
    const { data } = this.props;

    return (
      <Animated.View style={[
        styles.menuContainer,
        this.style,
      ]}
      >
        <DrugButtons />
        <TouchableOpacity
          style={styles.touchableWrapper}
          onPress={this.navigateToEdit}
        >
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
      </Animated.View>
    );
  }
}

export default SortableCategory;
