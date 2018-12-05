export const inventoryApiUrl = 'https://api.staging.inventoryapp.info/graphql';

const regExp = {
  email: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/,
  password: /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{7,})\S$/,
};

const masks = {
  mobileNumber: '+7 ([000]) [000]-[00]-[00]',
};

const placeHolders = {
  mobileNumber: '+7 (___) ___-__-__',
};

const inputTypes = {
  name: {
    label: 'Имя',
    require: false,
  },
  email: {
    label: 'e-mail',
    require: true,
  },
  password: {
    label: 'Пароль',
    require: true,
  },
  mobileNumber: {
    label: 'Телефон',
    require: true,
  },
  confirmPassword: {
    label: 'Повторите пароль',
    require: true,
  },
  setNewPassword: {
    label: 'Введите новый пароль',
    require: true,
  },
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
    password:
      'Пароль должен состоять из не менее 7 знаков \n латиницей и 1 цифры',
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
  masks,
  errors,
  regExp,
  headers,
  inputTypes,
  buttonTitles,
  placeHolders,
  forgotPassText,
  setNewPassword,
};
