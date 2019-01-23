//  @flow
import React from 'react';
import { View, Text } from 'react-native';

import Modal from 'react-native-modal';

import Button from '~/components/Button';

import { deviceWidth, deviceHeight } from '~/global/device';
import { fonts } from '~/global/styles';
import colors from '~/global/colors';

import { normalize } from '~/global/utils';

import styles from './styles';

const AndroidActionsModal = ({ isModalVisible, toggleActionsModal, itemData }: Props) => (
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
    {itemData && (
    <View style={{
      top: itemData.y - normalize(10),
      left: itemData.x - normalize(10),
      position: 'absolute',
      padding: normalize(10),
      backgroundColor: 'white',
      borderRadius: normalize(17),
    }}
    >
      <View style={{
        borderRadius: 10,
        width: normalize(158),
        height: normalize(158),
        marginBottom: normalize(6),
        backgroundColor: colors.darkGreen }}
      />
      <Text
        style={{
          letterSpacing: -0.2,
          fontSize: normalize(16),
          marginBottom: normalize(3),
          fontFamily: fonts.proText.regular,
        }}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {itemData.name}
      </Text>
      <Text
        style={{
          color: '#BDBDBD',
          fontSize: normalize(15),
          fontFamily: fonts.proDisplay.medium,
        }}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {`${itemData.purchasePrice || 0} ₽`}
      </Text>
    </View>
    )
  }
    <Button
      onPress={toggleActionsModal}
      customStyle={{ width: normalize(315), marginBottom: normalize(15) }}
    />
    <Button
      onPress={toggleActionsModal}
      customStyle={{ width: normalize(315), backgroundColor: colors.red, marginBottom: normalize(15) }}
    />
  </Modal>
);


export default AndroidActionsModal;
