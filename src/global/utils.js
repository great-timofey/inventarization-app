// @flow

const validateFunction = (regExp: RegExp, value: string) => {
  if (regExp.test(value)) {
    return true;
  }
  return false;
};

export default {
  validateFunction,
};
