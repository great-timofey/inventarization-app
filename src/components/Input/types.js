// @flow
import * as React from 'react';

import type { KeyboardType, ReturnKeyType } from '~/global/types';

export type Props = {
  mask?: string,
  type: {
    label: string,
    warning: string,
  },
  value: string,
  isWhite?: boolean,
  fieldRef?: Object,
  isWarning?: boolean,
  placeholder?: string,
  children?: React.Node,
  onChangeText: Function,
  onSubmitForm?: Function,
  secureTextEntry?: boolean,
  keyboardType?: ?KeyboardType,
  onSubmitEditing?: () => void,
  returnKeyType?: ?ReturnKeyType,
};
