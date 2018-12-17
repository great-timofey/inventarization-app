// @flow

export type State = {
  loading: boolean,
  data: Array<String>,
};

export type Props = {
  client: Object,
  navigation: Object,
  createCompany: Function,
  setAuthMutationClient: Function,
};
