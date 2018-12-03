import React, { Component } from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';

import Modal from 'react-native-modal';
import colors from 'global/colors';
import styles from './styles';

type Props = {
  data: Array,
  onBackCallback: () => void,
  isModalVisible: boolean,
};
class PickPhotoModal extends Component<Props> {
  renderItem = ({ item }) => (
    <View style={{ width: 82, height: 82, backgroundColor: 'yellow' }}>
      <Text>{item}</Text>
    </View>
  );

  render() {
    const { onBackCallback, isModalVisible, data } = this.props;
    return (
      <Modal
        style={{
          flex: 1,
          justifyContent: 'flex-end',
        }}
        isVisible={isModalVisible}
        onBackdropPress={onBackCallback}
        onBackButtonPress={onBackCallback}
      >
        <View
          style={{
            paddingTop: 5,
            height: 150,
            borderRadius: 7,
            marginBottom: 15,
            overflow: 'hidden',
            backgroundColor: 'white',
          }}
        >
          <FlatList
            data={data}
            renderItem={this.renderItem}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            style={{ flex: 2 }}
          />
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={this.handleOpenModal}
          >
            <Text style={{ fontSize: 18, color: 'white' }}>Отмена</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          activeOpacity={1}
          style={{
            backgroundColor: colors.cancel,
            borderRadius: 7,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={onBackCallback}
        >
          <Text style={{ fontSize: 18, color: 'white' }}>Отмена</Text>
        </TouchableOpacity>
      </Modal>
    );
  }
}

export default PickPhotoModal;
