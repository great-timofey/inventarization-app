// @flow

import type { KeyboardType, ReturnKeyType } from 'global/types';

export type Props = {
  mask?: string,
  type: {
    label: string,
    require: boolean,
  },
  value: string,
  isWarning: boolean,
  fieldRef: Object,
  placeholder?: string,
  onChangeText: Function,
  onSubmitForm?: Function,
  secureTextEntry?: boolean,
  keyboardType?: ?KeyboardType,
  onSubmitEditing?: () => void,
  returnKeyType?: ?ReturnKeyType,
};
