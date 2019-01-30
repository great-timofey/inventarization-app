// @flow

import * as React from 'react';
import type { Item } from '~/global/types';

export type Props = {
  item: Item,
  openItem: Function,
  showMenuButton: ?boolean,
  getItemPosition: Function,
  showRemoveButton?: boolean,
  toggleDelModal?: () => void,
  parentScrollViewRef: React.Node,
  currentSelectItem: number | string | null,
  selectItem?: (x: number | null | string) => void,
};

export type State = {
  isMenuOpen: boolean,
};
