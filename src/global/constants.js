export const inventoryApiUrl = 'https://api.staging.inventoryapp.info/graphql';

const regExp = {
  mobileNumber: /^(?:\+7|8)?9(?:\d{9})$/,
  email: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/,
  password: /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{7,})\S$/,
};

const inputTypes = {
  name: 'Имя',
  email: 'e-mail',
  password: 'Пароль',
  mobileNumber: 'Телефон',
  confirmPassword: 'Повторите пароль',
  setNewPassword: 'Введите новый пароль',
};

const buttonTitles = {
  on: 'Вкл',
  off: 'Выкл',
  login: 'Войти',
  create: 'Да, создать',
  cancel: 'Отмена',
  update: 'Обновить',
  reg: 'Зарегистрироваться',
  registration: 'Регистрация',
  choosePhoto: 'Выбрать фото',
  forgotPassword: 'Забыли пароль?',
  createOrg: 'Создать организацию',
  setNewPass: 'Задать новый пароль',
  restorePass: 'Восстановить пароль',
};

const forgotPassText = {
  headerTitle: `Восстановление \n пароля`,
  enterEmail: 'Введите e-mail',
  placeHolder: 'Ваш номер телефона',
  sendMail:
    'На ваш е-mail было отправлено письмо с ссылкой на восстановление. Проверьте свой почтовый ящик.',
};

const setNewPassword = {
  create: 'Создание нового \n пароля',
};

const errors = {
  login: {
    email: 'Неверный формат электронной почты',
  },
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
  forgotPassText,
  setNewPassword,
};
