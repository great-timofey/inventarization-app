// @flow

export type State = {
  isTorchOn: boolean,
  showScanner: boolean,
  showNoMatchError: boolean,
};

export type Props = {
  data?: Object,
  client: Object,
  navigation: Object,
};
