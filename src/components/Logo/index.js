// @flow

import React from 'react';
import { View, Image } from 'react-native';

import assets from '~/global/assets';

import styles from './styles';

type Props = {
  isSmall: boolean,
};

const Logo = ({ isSmall }: Props) => (
  <View style={isSmall ? styles.logo : styles.bigLogo}>
    <Image
      resizeMode="contain"
      style={isSmall ? styles.logoImage : styles.bigLogoImage}
      source={isSmall ? assets.logologin : assets.grayLogo}
    />
    {isSmall && <Image style={styles.logoText} source={assets.appName} />}
  </View>
);
export default Logo;
