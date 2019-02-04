// @flow

import * as React from 'react';

import type { Item } from '~/global/types';

export type Props = {
  userId: string,
  userRole: string,
  isPlaces?: boolean,
  currentUser: ?Object,
  data: Array<Item>,
  openPlace: Function,
  openItem: Function,
  userRole: string,
  editPlace?: Function,
  parentScrollViewRef: React.Node,
  getItemPosition: Function,
  toggleDelModal?: () => void,
  selectItem: (x: number | string) => void,
  extraData: {
    isSortByName: boolean,
    currentSelectItem: number | null | string,
  },
};
