// @flow

import * as React from 'react';
import type { Item } from '~/global/types';

export type Props = {
  item: Item,
  openItem: Function,
  getItemPosition: Function,
  parentScrollViewRef: React.Node,
};
