// @flow

export type Props = {
  navigation: Object,
};

export type State = {
  flashMode: number,
  photos: Array<string>,
  isHintOpened: boolean,
};

export type PhotoProps = {
  item: string,
  index: number,
};
