// @flow

export type State = {
  email: string,
  warning: boolean,
  isRecoveryMailSend: boolean,
};

export type Props = {
  mutate: Function,
  navigation: Object,
};
