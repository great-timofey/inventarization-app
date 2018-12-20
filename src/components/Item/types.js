// @flow
import type { Item } from '~/global/types';

export type Props = {
  item: Item,
  toggleDelModal?: () => void,
  selectItem?: (x: number | null | string) => void,
  currentSelectItem: number | string | null,
}

export type State ={
  isMenuOpen: boolean,
}
