// @flow

export type Props = {
  size?: number,
  iconName: string,
  iconColor?: string,
  onPress?: () => void,
  isDisabled?: boolean,
  isCustomIcon?: boolean,
  customPosition?: Object,
  customContStyle?: Array<Object> | Object,
  customIconStyle?: Object,
};
