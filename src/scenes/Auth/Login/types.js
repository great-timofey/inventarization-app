// @flow

export type State = {
  name: string,
  email: string,
  mobile: string,
  password: string,
  isRegForm: boolean,
  keyboardPadding: any,
  paddingContainer: any,
  warnings: Array<string>,
  isModalVisible: boolean,
  isKeyboardActive: boolean,
};

export type Props = {
  client: Object,
  navigation: Object,
  signInMutation: Function,
  signUpMutation: Function,
  setAuthMutationClient: Function,
  setInitialPermissionsMutationClient: Function,
};
