//  @flow
import React, { PureComponent } from 'react';
import { View, Text, Image } from 'react-native';

import Modal from 'react-native-modal';

import Button from '~/components/Button';
import QuestionModal from '~/components/QuestionModal';

import assets from '~/global/assets';
import constants from '~/global/constants';
import { getPlaceholder, normalize } from '~/global/utils';
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
    const {
      state: { isDeleteModalVisible },
      props: { item, handleDeleteItem },
    } = this;

    handleDeleteItem(item.id, true);

    if (isDeleteModalVisible) {
      this.toggleDelModalVisible();
    }
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
        type,
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


    let uri;
    let smallPhotosUrls;

    if (item && item.photosUrls) {
      const { photosUrls, photosOfDamagesUrls } = item;
      smallPhotosUrls = item.photosUrls;
      if (photosUrls.length > 0) {
        /*  eslint-disable */
        uri = photosUrls[0];
      } else if (photosOfDamagesUrls.length > 0) {
        uri = photosOfDamagesUrls[0];
        /** eslint-enable */
      } else {
        uri = getPlaceholder(normalize(isListViewStyle ? 62 : 158));
      }
    }
    
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
        {type === 'items' && !isListViewStyle && (
          <View style={[styles.container,
            { top: elementPosition.y - normalize(10),
              left: elementPosition.x - normalize(10) },
          ]}
          >
            <Image source={{ uri }} style={styles.photo} />
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
        )}
            
        {type === 'items' && isListViewStyle && (
          <View style={[styles.rowItem, { top: elementPosition.y, left: elementPosition.x }]}>
            <Image source={{ uri }} style={styles.smallImage} />
            <View style={styles.description}>
              <View>
                <Text style={styles.topText}>{item.name}</Text>
                <Text style={styles.botText}>
                  {`${(smallPhotosUrls && smallPhotosUrls.length) || 0} Фото`}
                </Text>
              </View>
              <View style={styles.count}>
                <Text style={styles.countText}>{item.purchasePrice}</Text>
              </View>
            </View>
          </View>
          )}

        {type === 'places' && (
            <View style={[styles.rowItem, { top: elementPosition.y, left: elementPosition.x }]}>
              <Image style={styles.pinImage} source={assets.pin} />
              <Image style={styles.image} source={assets.mapLayout} />
              <View style={styles.description}>
                <View>
                  <Text style={styles.topText}>{item.name}</Text>
                  <Text style={styles.botText}>
                    {item.address}
                  </Text>
                </View>
                <View style={styles.count}>
                  <Text style={styles.countText}>{item.assetsCount || '0'}</Text>
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
