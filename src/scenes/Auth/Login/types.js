// @flow

export type State = {
  name: string,
  email: string,
  mobile: string,
  warnings: Array<string>,
  password: string,
  isRegForm: boolean,
  isModalVisible: boolean,
};

export type Props = {
  client: Object,
  navigation: Object,
  signInMutation: Function,
  signUpMutation: Function,
  setAuthMutationClient: Function,
};
