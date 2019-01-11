// @flow

import type { Item } from '~/global/types';

export type Props = {
  item: Item,
  openItem: Function,
  showMenuButton: ?boolean,
  showRemoveButton?: boolean,
  toggleDelModal?: () => void,
  currentSelectItem: number | string | null,
  selectItem?: (x: number | null | string) => void,
};

export type State = {
  isMenuOpen: boolean,
};
