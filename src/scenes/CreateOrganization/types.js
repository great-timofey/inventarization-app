// @flow

export type State = {
  orgName: string,
  currentInvitee: string,
  chosenPhotoUri: string,
  invitees: Array<string>,
  warnings: Array<string>,
  isModalVisible: boolean,
};

export type Props = {
  navigation: Object,
};

export type InviteeProps = {
  item: string,
  index: number,
};
