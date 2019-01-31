// @flow

export type State = {|
  selectedCategory: string,
|}

export type Props = {|
  item: Object,
  isSelected?: boolean,
  selectCategory: Function,
  allSelectButton: boolean,
  defaultCategoryId: number,
  setSelectedCategories: Function,
  allSubCategoryList: Array<string>,
|}
