// @flow
import type { Item } from '~/global/types';

export type Props = {
  data: Array<Item>,
  currentUser: string,
  toggleDelModal?: () => void,
  selectItem: (x: number | string) => void,
  extraData: {
    isSortByName: boolean,
    currentSelectItem: number | null | string,
  },
};
