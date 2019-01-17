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
  placeholder?: string,
  isWarning?: boolean,
  children?: React.Node,
  isMultiline?: boolean,
  onChangeText: Function,
  customWarning?: string,
  onSubmitForm?: Function,
  secureTextEntry?: boolean,
  showWarningInTitle?: boolean,
  containerCallback?: Function,
  keyboardType?: ?KeyboardType,
  onSubmitEditing?: () => void,
  returnKeyType?: ?ReturnKeyType,
  isBackgroundTransparent?: ?boolean,
};
