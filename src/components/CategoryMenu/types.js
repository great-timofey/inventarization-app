// @flow

export type State = {|
  selectedCategory: string,
|}

export type Props = {|
  current: Object,
  categoryOrder: Array<string>,
  saveSelectedCategories: Array<string>
|};
