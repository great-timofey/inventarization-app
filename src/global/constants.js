const regExp = {
  mobileNumber: /^(?:\+7|8)?9(?:\d{9})$/,
  email: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/,
  password: /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{8,})\S$/,
};

const inputTypes = {
  name: 'Имя',
  email: 'e-mail',
  password: 'Пароль',
  mobileNumber: 'Телефон',
};

const buttonTitles = {
  reg: 'Зарегистрироваться',
  login: 'Войти',
  update: 'Обновить',
  create: 'Да, создать',
  createOrg: 'Создать организацию',
  setNewPass: 'Задать новый пароль',
  restorePass: 'Восстановить пароль',
  registration: 'Регистрация',
  forgotPassword: 'Забыли пароль?',
};

const forgotPassText = {
  headerTitle: `Восстановление \n пароля`,
  enterData: 'Введите e-mail или телефон',
  placeHolder: 'Ваш номер телефона',
  sendMail:
    'На ваш е-mail было отправлено письмо с ссылкой на восстановление. Проверьте свой почтовый ящик.',
};

export default {
  regExp,
  inputTypes,
  buttonTitles,
  forgotPassText,
};
