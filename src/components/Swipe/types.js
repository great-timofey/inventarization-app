// @flow

import type { Item } from '~/global/types';

export type Props = {
  userId: string,
  userRole: string,
  data: Array<Item>,
  openItem: Function,
  userRole: string,
  toggleDelModal?: () => void,
  selectItem: (x: number | string) => void,
  extraData: {
    isSortByName: boolean,
    currentSelectItem: number | null | string,
  },
};
