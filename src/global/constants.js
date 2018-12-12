export const inventoryApiUrl = 'https://api.staging.inventoryapp.info/graphql';

const regExp = {
  password: /^((?=\S*?[a-z,A-Z])(?=\S*?[0-9]).{7,})\S$/,
  email: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/,
  mobileNumber: /^(\+7)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/,
};

const masks = {
  mobileNumber: '+7 ([000]) [000]-[00]-[00]',
};

const uploadCreateCompanyImages = {
  width: 110,
  height: 110,
  quality: 0.5,
};

const placeHolders = {
  mobileNumber: '+7 (___) ___-__-__',
};

const inputTypes = {
  name: {
    label: 'Имя',
    require: false,
  },
  companyName: {
    label: 'Название организации',
    require: false,
  },
  invitees: {
    label: 'Добавьте людей:',
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
  cancel: 'Отмена',
  update: 'Обновить',
  skip: 'Пропустить',
  create: 'Да, создать',
  chooseLogo: 'Выбери \n лого',
  reg: 'Зарегистрироваться',
  registration: 'Регистрация',
  choosePhoto: 'Выбрать фото',
  forgotPassword: 'Забыли пароль?',
  setNewPass: 'Задать новый пароль',
  restorePass: 'Восстановить пароль',
  enter: 'Нет, войти как пользователь',
  createCompany: 'Создать организацию',
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
    name: 'Введите имя',
    companyName: 'Введите название вашей организации',
    email: 'Вы указали неверный email',
    emailEmpty: 'Введите email',
    password:
      'Пароль должен состоять из не менее 7 знаков \n латиницей и 1 цифры',
    mobile: 'Неверный формат номера телефона',
    notMatch: 'Пароли не совпадают',
  },
  camera: {
    photo:
      'Произошла ошибка выбора фотографии. Пожалуйста, попробуйте еще раз.',
  },
};

const headers = {
  items: 'Предметы',
  qrscanner: 'Сканер',
  createNewCompany: 'Создание новой \n организации',
};

const text = {
  question: 'Вы хотите создать \n аккаунт организации?',
  organisation:
    'Вас пока не добавили к организации.\nОбратитесь к администратору или\nдождитесь приглашения.',
  qrhint: 'Поместите штрих-код или QR-код в центр экрана',
};
export default {
  text,
  masks,
  errors,
  regExp,
  headers,
  inputTypes,
  buttonTitles,
  placeHolders,
  forgotPassText,
  setNewPassword,
  uploadCreateCompanyImages,
};
