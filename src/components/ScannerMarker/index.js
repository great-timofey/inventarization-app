//  @flow

import React from 'react';

import Svg, { Path } from 'react-native-svg';

import { normalize } from 'global/utils';
import { deviceHeight, deviceWidth } from 'global/device';

const windowWidth = deviceWidth * 0.7;
const windowPadX = (deviceWidth - windowWidth) / 2;
const windowPadY = (deviceHeight - windowWidth) / 2 - normalize(40);
const radius = 20;
const bottomOffset = 80;

function ScannerMarker({ opacity, color }: { opacity: number, color: string }) {
  return (
    <Svg height={deviceHeight} width={deviceWidth}>
      <Path
        opacity={opacity}
        d={`
        M0 0 h${deviceWidth} v${deviceHeight} H0V0 z 
        M${windowPadX} ${windowPadY -
          bottomOffset} a${radius} ${radius} 0 0 0 ${-radius} ${radius} 
        v${windowWidth} a${radius} ${radius} 0 0 0 ${radius} ${radius} 
        h${windowWidth} a${radius} ${radius} 0 0 0 ${radius} ${-radius}
        v${-windowWidth} a${radius} ${radius} 0 0 0 ${-radius} ${-radius} 
        h${-windowWidth} z`}
        fillRule="evenodd"
        fill={color}
      />
    </Svg>
  );
}

export default ScannerMarker;
