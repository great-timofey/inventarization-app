// @flow

export type State = {
  flashMode: boolean,
  showScanner: boolean,
  showNoMatchError: boolean,
};

export type Props = {
  data?: Object,
  client: Object,
  navigation: Object,
};
