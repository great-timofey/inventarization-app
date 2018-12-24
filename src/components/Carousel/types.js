// @flow

type Photo = {
  uri: string,
  base64: string,
};

export type PhotosProps = {
  item: Photo,
  index: number,
};

export type Props = {
  data: Array<Photo>
};
