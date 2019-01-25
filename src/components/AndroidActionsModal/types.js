
// @flow

import type { Item } from '~/global/types';

export type Props = {
  elementPosition: {
    x: number,
    y: number,
  },
  item: Item | Object,
  delAction: Function,
  destroyAsset: Function,
  isModalVisible: boolean,
  handleOpenItem: Function,
  isListViewStyle: boolean,
  handleDeleteItem: Function,
  toggleActionsModal: Function,
};

export type State = {
  isDeleteModalVisible: boolean
}
