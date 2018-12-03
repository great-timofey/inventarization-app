//  @flow
import React, { PureComponent } from 'react';
import { Text, View, Button, TouchableOpacity, FlatList } from 'react-native';
import Modal from 'react-native-modal';

import styles from './styles';

type Props = {};
type State = { isModalVisible: boolean };
export default class ItemsScene extends PureComponent<Props, State> {
  state = {
    isModalVisible: false,
  };

  handlePickPhoto = () => {
    const { isModalVisible } = this.state;
    this.setState({ isModalVisible: !isModalVisible });
  };

  handleClose = () => {
    // some implementation
  };

  render() {
    const { isModalVisible } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>ITEMS</Text>
        <Button title="choose photo" onPress={this.handlePickPhoto} />
        <Modal
          style={{
            flex: 1,
            justifyContent: 'flex-end',
          }}
          isVisible={isModalVisible}
          onBackdropPress={this.handlePickPhoto}
          onBackButtonPress={this.handlePickPhoto}
        >
          <View style={{ backgroundColor: 'orange' }}>
            <Text>Hello!</Text>
            <View>
              <FlatList horizontal />
            </View>
            <TouchableOpacity onPress={this.handlePickPhoto}>
              <Text>Отмена</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}
