// @flow

export type State = {|
  selectedCategory: string,
|}

export type Props = {|
  item: Object,
  isSelected?: boolean,
  selectCategory: Function,
  allSelectButton: boolean,
  setSelectedCategories: Function,
  allSubCategoryList: Array<string>,
|}
