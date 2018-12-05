// @flow

export type State = {
  name: string,
  email: string,
  mobile: string,
  password: string,
  loading: boolean,
  isRegForm: boolean,
  isModalVisible: boolean,
};

export type Props = {
  client: Object,
  navigation: Object,
};
