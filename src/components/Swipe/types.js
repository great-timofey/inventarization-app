// @flow
import type { Item } from '~/global/types';

export type Props = {
  extraData: {
    currentSelectItem: number | null | string,
     isSortByName: boolean,
  },
  data: Array<Item>,
  toggleDelModal?: () => void,
  selectItem?: (x: number | string) => void,
};
