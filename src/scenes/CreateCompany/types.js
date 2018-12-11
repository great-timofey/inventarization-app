// @flow

export type State = {
  companyName: string,
  invitees: Array<string>,
  currentInvitee: string,
  chosenPhotoUri: string,
  invitees: Array<string>,
  warnings: Array<string>,
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
