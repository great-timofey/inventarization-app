// @flow

export type State = {|
  selectedCategory: string,
|}

export type Props = {|
  current: Object,
  userCompany: Object,
  categoryOrder: Array<string>,
  saveSelectedCategories: Array<string>
|};
