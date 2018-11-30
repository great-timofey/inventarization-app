// @flow

const regExp = {
  mobileNumber: /^(?:\+7|8)?9(?:\d{9})$/,
  email: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/,
  password: /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{8,})\S$/,
};

export type inputTypesType = {
  name: string,
  email: string,
  password: string,
  mobileNumber: string,
};

const inputTypes: inputTypesType = {
  name: 'Имя',
  email: 'e-mail',
  password: 'Пароль',
  mobileNumber: 'Телефон',
};

const loginButtonsTitle = ['Забыли пароль?', 'Регистрация'];

const buttonTitles = {
  reg: 'Зарегистрироваться',
  login: 'Войти',
  update: 'Обновить',
  create: 'Да, создать',
  createOrg: 'Создать организацию',
  restorePass: 'Восстановить пароль',
  setNewPass: 'Задать новый пароль',
};

export default {
  regExp,
  inputTypes,
  buttonTitles,
  loginButtonsTitle,
};
