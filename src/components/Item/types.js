// @flow

import type { Item } from '~/global/types';

export type Props = {
  item: Item,
  currentUserRole: string,
  toggleDelModal?: () => void,
  currentSelectItem: number | string | null,
  selectItem?: (x: number | null | string) => void,
}

export type State ={
  isMenuOpen: boolean,
}
