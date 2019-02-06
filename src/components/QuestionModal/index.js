//  @flow
import React from 'react';
import { StatusBar, View, Text, TouchableOpacity } from 'react-native';

import Modal from 'react-native-modal';

import colors from '~/global/colors';
import constants from '~/global/constants';
import { isAndroid } from '~/global/device';

import styles from './styles';
import type { Props } from './types';

const QuestionModal = ({
  data,
  leftAction,
  rightAction,
  isModalVisible,
}: Props) => (
  <Modal isVisible={isModalVisible} style={styles.modal}>
    {isAndroid && <StatusBar backgroundColor={colors.androidModalStatusBarOverlay} barStyle="light-content" />}
    <View style={styles.container}>
      <Text style={styles.title}>{data.title}</Text>
      <Text style={styles.question}>{data.question}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={leftAction} style={styles.leftButton}>
          <Text style={styles.buttonText}>{constants.modalQuestion.cancel}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={rightAction} style={styles.rightButton}>
          <Text style={styles.buttonText}>{data.button}</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);


export default QuestionModal;
