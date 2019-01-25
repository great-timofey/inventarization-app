//  @flow
import React, { PureComponent } from 'react';
import { View, Text, Image } from 'react-native';

import Modal from 'react-native-modal';

import Button from '~/components/Button';
import QuestionModal from '~/components/QuestionModal';

import { normalize } from '~/global/utils';
import constants from '~/global/constants';
import { deviceWidth, deviceHeight } from '~/global/device';

import styles from './styles';
import type { Props, State } from './types.js';

class AndroidActionsModal extends PureComponent<Props, State> {
  state = {
    isDeleteModalVisible: false,
  }

  toggleDelModalVisible = () => {
    const { isDeleteModalVisible } = this.state;
    this.setState({
      isDeleteModalVisible: !isDeleteModalVisible,
    });
  };

  deleteItem = () => {
    const { item, handleDeleteItem } = this.props;
    handleDeleteItem(item.id, true);

    this.setState({
      isDeleteModalVisible: false,
    });
  }

  editItem = () => {
    const { handleOpenItem, item } = this.props;
    this.setState({
      isDeleteModalVisible: false,
    });
    handleOpenItem(item, true);
  }

  render() {
    const {
      props: {
        item,
        isModalVisible,
        isListViewStyle,
        elementPosition,
        toggleActionsModal,
      },
      state: {
        isDeleteModalVisible,
      },
    } = this;

    return (
      <Modal
        style={styles.modal}
        animationIn="fadeIn"
        animationOut="fadeOut"
        animationOutTiming={1}
        animationInTiming={300}
        deviceWidth={deviceWidth}
        isVisible={isModalVisible}
        deviceHeight={deviceHeight}
        onBackdropPress={toggleActionsModal}
      >
        {!isListViewStyle ? (
          <View style={[styles.container,
            { top: elementPosition.y - normalize(10),
              left: elementPosition.x - normalize(10) },
          ]}
          >
            <View style={styles.photo} />
            <Text
              numberOfLines={1}
              style={styles.name}
              ellipsizeMode="tail"
            >
              {item.name}
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.price}
            >
              {`${item.purchasePrice || 0} ₽`}
            </Text>
          </View>
        ) : (
          <View style={[styles.rowItem, { top: elementPosition.y, left: 0 }]}>
            <Image style={styles.smallImage} />
            <View style={styles.description}>
              <View>
                <Text style={styles.topText}>{item.name}</Text>
                <Text style={styles.botText}>
                  {`${0} Фото`}
                </Text>
              </View>
              <View style={styles.count}>
                <Text style={styles.countText}>{item.purchasePrice}</Text>
              </View>
            </View>
          </View>
        )}
        <Button
          onPress={this.editItem}
          customStyle={styles.editButton}
          title={constants.buttonTitles.edit}
        />
        <Button
          customStyle={styles.delButton}
          onPress={this.toggleDelModalVisible}
          title={constants.buttonTitles.delete}
        />
        <QuestionModal
          rightAction={this.deleteItem}
          isModalVisible={isDeleteModalVisible}
          data={constants.modalQuestion.itemDel}
          leftAction={this.toggleDelModalVisible}
          //  $FlowFixMe
        />
      </Modal>
    );
  }
}

export default AndroidActionsModal;
