// @flow
import * as React from 'react';

import type { KeyboardType, ReturnKeyType } from '~/global/types';

export type Props = {
  mask?: string,
  type: {
    label: string,
    warning?: string,
  },
  value: string,
  isWhite?: boolean,
  fieldRef?: Object,
  customKey?: string,
  isWarning: boolean,
  placeholder?: string,
  children?: React.Node,
  isMultiline?: boolean,
  onChangeText: Function,
  onSubmitForm?: Function,
  secureTextEntry?: boolean,
  showWarningInTitle?: boolean,
  containerCallback?: Function,
  keyboardType?: ?KeyboardType,
  onSubmitEditing?: () => void,
  returnKeyType?: ?ReturnKeyType,
  isBackgroundTransparent?: ?boolean,
};
