// @flow

export type State = {
  paddingTop: any,
  marginBottom: any,
  companyName: string,
  keyboardPadding: any,
  currentInvitee: string,
  chosenPhotoUri: string,
  warnings: Array<string>,
  invitees: Array<string>,
  isModalVisible: boolean,
};

export type Props = {
  navigation: Object,
  createCompany: Function,
  setAuthMutationClient: Function,
};

export type InviteeProps = {
  item: string,
  index: number,
};
