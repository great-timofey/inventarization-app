// @flow

import type { Item } from '~/global/types';

export type Props = {
  openItem: Function,
  data: Array<Item>,
  currentUserRole: string,
  toggleDelModal?: () => void,
  selectItem: (x: number | string) => void,
  extraData: {
    isSortByName: boolean,
    currentSelectItem: number | null | string,
  },
};
