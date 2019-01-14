// @flow

export type State = {|
  selectedCategory: string,
|}

export type Props = {|
  item: Object,
  isSelected?: boolean,
  selectCategory: Function,
  allSelectButton: boolean,
  setSelectedCategory: Function,
  allSubCategoryList: Array<string>,
|}
