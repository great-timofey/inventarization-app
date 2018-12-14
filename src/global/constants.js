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
    warning: 'Введите имя',
  },
  companyName: {
    label: 'Название организации',
    warning: 'Введите название вашей организации',
  },
  invitees: {
    label: 'Добавьте людей:',
    warning: 'Неверный формат электронной почты',
  },
  email: {
    label: 'e-mail',
    warning: 'Неверный формат электронной почты',
  },
  password: {
    label: 'Пароль',
    warning:
      'Пароль должен состоять из не менее 7 знаков \n латиницей и 1 цифры',
  },
  mobileNumber: {
    label: 'Телефон',
    warning: 'Неверный формат номера телефона',
  },
  confirmPassword: {
    label: 'Повторите пароль',
  },
  setNewPassword: {
    label: 'Введите новый пароль',
  },
};

const buttonTitles = {
  on: 'Вкл',
  off: 'Выкл',
  next: 'Далее',
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
  newItem: 'Новый предмет',
  createNewCompany: 'Создание новой \n организации',
};

const text = {
  question: 'Вы хотите создать \n аккаунт организации?',
  organisation:
    'Вас пока не добавили к организации.\nОбратитесь к администратору или\nдождитесь приглашения.',
  qrhint: 'Поместите штрих-код или QR-код в центр экрана',
};

const hints = {
  makePhotos: 'Сделайте фотографии вашего предмета',
};

export default {
  text,
  masks,
  hints,
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
