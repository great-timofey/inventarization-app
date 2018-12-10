// @flow

export type State = {
  name: string,
  email: string,
  mobile: string,
  warnings: {
    name: boolean,
    email: boolean,
    mobile: boolean,
    password: boolean,
  },
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
