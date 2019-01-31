// @flow

export type State = {
  error: ?string,
  loading: boolean,
  data: Array<Object>,
  isDrilledDown: boolean,
  categories: Array<Object>,
  currentlyActiveCategoryId: ?string,
};

export type Props = {
  type: string,
  client: Object,
  companyId: string,
  isVisible: boolean,
  onCancel: Function,
  onConfirm: Function,
};
