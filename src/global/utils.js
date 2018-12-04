// @flow
import constants from 'global/constants';

const validateFunction = (value: string, type: string) => {
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
};

export default {
  validateFunction,
};
