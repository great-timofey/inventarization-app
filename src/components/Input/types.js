// @flow

import type { KeyboardType, ReturnKeyType } from 'global/types';

export type Props = {
  mask?: string,
  type: {
    label: string,
    require: boolean,
  },
  value: string,
  fieldRef: Object,
  focusField: Function,
  placeholder?: string,
  onChangeText: Function,
  onSubmitForm?: Function,
  secureTextEntry?: boolean,
  keyboardType?: ?KeyboardType,
  onSubmitEditing?: () => void,
  returnKeyType?: ?ReturnKeyType,
};
