// @flow

export type State = {
  data: Array<Object>,
  error: ?string,
  loading: boolean,
};

export type Props = {
  type: string,
  client: Object,
  companyId: string,
  isVisible: boolean,
  onCancel: Function,
  onConfirm: Function,
  data: Array<string>,
};
