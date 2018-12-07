// @flow

export type State = {
  invitees: Array<string>,
  chosenPhotoUri: string,
  isModalVisible: boolean,
  currentInvitee: string,
};

export type Props = {
  navigation: Object,
};

export type InviteeProps = {
  item: string,
  index: number,
};
