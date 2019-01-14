// @flow

export type State = {
  name: string,
  email: string,
  mobile: string,
  password: string,
  isRegForm: boolean,
  warnings: Array<string>,
  isKeyboardActive: boolean,
  isPasswordHidden: boolean,
};

export type Props = {
  client: Object,
  navigation: Object,
  signInMutation: Function,
  signUpMutation: Function,
  setAuthMutationClient: Function,
  setUserIdMutationClient: Function,
  setUserCompanyMutationClient: Function,
};
