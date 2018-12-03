//  @flow
import React, { PureComponent } from 'react';
import { Alert, Text, View, Button } from 'react-native';

import PickPhotoModal from 'components/PickPhotoModal';
import colors from 'global/colors';
import styles from './styles';

type Props = {};
type State = { isModalVisible: boolean, photos: Array<String> };
export default class ItemsScene extends PureComponent<Props, State> {
  state = {
    isModalVisible: false,
  };

  handleOpenModal = () => {
    const { isModalVisible } = this.state;
    this.setState({ isModalVisible: !isModalVisible });
  };

  handleCloseModal = () => {
    const { isModalVisible } = this.state;
    this.setState({ isModalVisible: !isModalVisible });
  };

  render() {
    const { isModalVisible } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>ITEMS</Text>
        <Button title="choose photo" onPress={this.handleOpenModal} />
        <PickPhotoModal
          isModalVisible={isModalVisible}
          onBackCallback={this.handleCloseModal}
        />
      </View>
    );
  }
}
