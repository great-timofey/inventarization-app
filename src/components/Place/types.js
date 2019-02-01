// @flow

import * as React from 'react';

export type Props = {
  place: Object,
  openItem?: Function,
  openPlace?: Function,
  getItemPosition: Function,
  parentScrollViewRef: React.Node,
};
