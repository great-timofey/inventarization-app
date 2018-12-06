// @flow

export type State = {
  email: string,
  isRecoveryMailSend: boolean,
};

export type Props = {
  mutate: Function,
  navigation: Object,
};
