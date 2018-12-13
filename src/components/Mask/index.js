//  @flow

import React from 'react';

import Svg, { Path } from 'react-native-svg';

import { normalize } from 'global/utils';
import { deviceHeight, deviceWidth } from 'global/device';

const windowWidth = deviceWidth * 0.7;
const windowPadX = (deviceWidth - windowWidth) / 2;
const windowPadY = (deviceHeight - windowWidth) / 2 - normalize(40);
const r = 20;

function Mask({ opacity, color }: { opacity: number, color: string }) {
  return (
    <Svg height={deviceHeight} width={deviceWidth}>
      <Path
        opacity={opacity}
        d={`
        M0 0 h${deviceWidth} v${deviceHeight} H0V0 z 
        M${windowPadX} ${windowPadY - 80} a${r} ${r} 0 0 0 ${-r} ${r} 
        v${windowWidth} a${r} ${r} 0 0 0 ${r} ${r} 
        h${windowWidth} a${r} ${r} 0 0 0 ${r} ${-r}
        v${-windowWidth} a${r} ${r} 0 0 0 ${-r} ${-r} 
        h${-windowWidth} z`}
        fillRule="evenodd"
        fill={color}
      />
    </Svg>
  );
}

export default Mask;
