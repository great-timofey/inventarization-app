// @flow

import type { KeyboardType, ReturnKeyType } from 'global/types';

export type Props = {
  type: string,
  value: string,
  refEl: string,
  state?: boolean,
  fieldRef: Object,
  focusField: Function,
  placeholder?: string,
  nextRefName?: string,
  onChangeText: Function,
  onPushButton?: Function,
  keyboardType?: ?KeyboardType,
  returnKeyType?: ?ReturnKeyType,
  secureTextEntry?: boolean,
};
