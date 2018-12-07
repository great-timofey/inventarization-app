// @flow

export type State = {
  companyName: string,
  invitees: Array<string>,
  chosenPhotoUri: string,
  isModalVisible: boolean,
  currentInvitee: string,
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
