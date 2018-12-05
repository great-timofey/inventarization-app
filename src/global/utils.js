// @flow
import constants from 'global/constants';
import { Platform } from 'react-native';

export const getPlaceholder = (size: number) =>
  `https://via.placeholder.com/${size}x${size}`;

export const platformSelect = (ios?: Object, android?: Object) =>
  Platform.select({ ios, android });

const isValid = (value: string, type: Object) => {
  let regExp = null;
  if (type === constants.inputTypes.email) {
    regExp = constants.regExp.email;
  } else if (
    type === constants.inputTypes.password ||
    constants.inputTypes.setNewPassword ||
    constants.inputTypes.confirmPassword
  ) {
    regExp = constants.regExp.password;
  } else if (type === constants.inputTypes.mobileNumber) {
    regExp = constants.regExp.mobileNumber;
  }

  if (!value) {
    return false;
  }
  if (regExp && regExp.test(value)) {
    return true;
  }
  return false;
};

const isValidLoginForm = (
  email: string,
  password: string,
  name: string,
  isRegForm: boolean
) => {
  const isEmailValid = email && isValid(email, constants.inputTypes.email);
  const isPasswordValid =
    password && isValid(password, constants.inputTypes.password);
  if (isRegForm && name && isEmailValid && isPasswordValid) {
    return true;
  }
  if (!isRegForm && isEmailValid && isPasswordValid) {
    return true;
  }
  return false;
};

const isValidPassword = (password: string, confirmPassword: string) => {
  const isPasswordValid =
    password && isValid(password, constants.inputTypes.password);
  const isConfirmPasswordValid =
    password && isValid(confirmPassword, constants.inputTypes.password);
  if (
    isPasswordValid &&
    isConfirmPasswordValid &&
    password === confirmPassword
  ) {
    return true;
  }
  return false;
};

export default {
  isValid,
  getPlaceholder,
  platformSelect,
  isValidLoginForm,
  isValidPassword,
};
