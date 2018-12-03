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
    photos: ['a', 'b', 'a', 'b', 'a', 'b'],
  };

  handleOpenModal = () => {
    const { isModalVisible } = this.state;
    this.setState({ isModalVisible: !isModalVisible });
    console.log('sdf');
  };

  handleCloseModal = () => {
    const { isModalVisible } = this.state;
    this.setState({ isModalVisible: !isModalVisible });
  };

  render() {
    const { isModalVisible, photos } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>ITEMS</Text>
        <Button title="choose photo" onPress={this.handleOpenModal} />
        <PickPhotoModal
          data={photos}
          isModalVisible={isModalVisible}
          onBackCallback={this.handleCloseModal}
        />
      </View>
    );
  }
}
