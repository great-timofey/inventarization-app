// @flow

export type State = {
  name: string,
  email: string,
  mobile: string,
  barcode: string,
  password: string,
  isRegForm: boolean,
  isTorchOn: boolean,
  isModalVisible: boolean,
};

export type Props = {
  client: Object,
  navigation: Object,
  signInMutation: Function,
  signUpMutation: Function,
  setAuthMutationClient: Function,
};
