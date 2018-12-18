// @flow

export type Props ={
  id: number,
  selectItem: Function,
  currentSelectItem: number | null,
  toggleDelModal?: () => void,
}

export type State ={
  isMenuOpen: boolean,
}
