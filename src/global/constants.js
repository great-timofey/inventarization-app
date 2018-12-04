export const inventoryApiUrl = 'https://api.staging.inventoryapp.info/graphql';
export const githubApiUrl = 'https://api.github.com/graphql';

export const githubToken = 'a0474fe78d33bb97d1a191e99cb5df4f2af5e99b';

const regExp = {
  mobileNumber: /^(?:\+7|8)?9(?:\d{9})$/,
  email: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/,
  password: /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{8,})\S$/,
};

const inputTypes: inputTypesType = {
  name: 'Имя',
  email: 'e-mail',
  password: 'Пароль',
  mobileNumber: 'Телефон',
};

const buttonTitles = {
  on: 'Вкл',
  off: 'Выкл',
  login: 'Войти',
  cancel: 'Отмена',
  update: 'Обновить',
  create: 'Да, создать',
  reg: 'Зарегистрироваться',
  registration: 'Регистрация',
  choosePhoto: 'Выбрать фото',
  forgotPassword: 'Забыли пароль?',
  createOrg: 'Создать организацию',
  setNewPass: 'Задать новый пароль',
  restorePass: 'Восстановить пароль',
};

const errors = {
  camera: {
    photo:
      'Произошла ошибка выбора фотографии. Пожалуйста, попробуйте еще раз.',
  },
};

const headers = {
  items: 'Предметы',
};

export default {
  errors,
  regExp,
  headers,
  inputTypes,
  buttonTitles,
};
