// @flow

import { pick, slice, keys } from 'ramda';

export const inventoryApiUrl = 'https://api.staging.inventoryapp.info/graphql';

const regExp = {
  price: /^\d+(.|,){0,2}\d/,
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

const placeholders = {
  manufacturer: 'Введите название',
  model: 'Введите название',
  description: 'Введите текст',
  place: 'Место не указано',
  inputHeader: 'Введите название',
  inventoryCode: 'Введите код',
  qrcode: 'Введите код',
  estimateDate: 'Не оценивалось',
  purchaseDate: 'Выберите дату покупки',
  warrantyPeriod: 'Выберите дату окончания',
  category: 'Без категории',
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
    warning: 'Пароль должен состоять из не менее 7 знаков \n латиницей и 1 цифры',
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
  exit: 'Выйти',
  login: 'Войти',
  ready: 'Готово',
  cancel: 'Отмена',
  update: 'Обновить',
  defects: 'Дефекты',
  skip: 'Пропустить',
  photos: 'Фотографии',
  create: 'Да, создать',
  reg: 'Зарегистрироваться',
  registration: 'Регистрация',
  choosePhoto: 'Выбрать фото',
  chooseLogo: 'Выбери \n лого',
  saveItem: 'Сохранить предмет',
  addItem: 'Добавить предмет',
  forgotPassword: 'Забыли пароль?',
  setNewPass: 'Задать новый пароль',
  restorePass: 'Восстановить пароль',
  enter: 'Нет, войти как пользователь',
  createCompany: 'Создать организацию',
  fillItemForm: 'Заполнить анкету предмета',
  addAnotherYetItem: 'Добавить ещё один предмет',
};

const modalQuestion = {
  itemDel: {
    title: 'Удаление предмета',
    question: 'Вы точно хотите удалить \n предмет?',
    button: 'Удалить',
  },
  categotyDel: {
    title: 'Удаление категории',
    question: 'Вы точно хотите удалить \n категорию?',
    button: 'Удалить',
  },
  subCategotyDel: {
    title: 'Удаление подкатегории',
    question: 'Вы точно хотите удалить \n подкатегорию?',
    button: 'Удалить',
  },
  userNotFound: {
    title: 'Завхоза не найдено',
    question: 'Вы хотите назначить \n сотрудника на роль завхоза?',
    button: 'Назначить',
  },
  orgDel: {
    title: 'Удаление организации',
    question:
      'Все данные организации будут \n находиться в архиве в течение \n 30 дней, после чего будут \n автоматически удалены.',
    button: 'Удалить',
  },
  orgRecovery: {
    title: 'Восстановление организации',
    question: 'Вы точно хотите восстановить \n организацию, все данные и \n сотрудников?',
    button: 'Восстановить',
  },
  exit: {
    title: 'Выход из аккаунта',
    question: 'Вы точно хотите выйти из \n аккаунта?',
    button: 'Выйти',
  },
  accNotBelong: {
    title: 'Аккаунт не принадлежит ни к одной организации',
    question: 'Хотите дождаться добавления \n в организацию или создать \n новую организацию?',
    button: 'Создать',
  },
  cancel: 'Отмена',
};

const forgotPassText = {
  headerTitle: 'Восстановление \n пароля',
  enterEmail: 'Введите e-mail',
  placeholder: 'Ваш номер телефона',
  sendMail:
    'На ваш е-mail было отправлено письмо с ссылкой на восстановление. Проверьте свой почтовый ящик.',
};

const setNewPassword = {
  create: 'Создание нового \n пароля',
};

const sort = {
  name: 'Сортировать по имени',
  price: 'Сортировать по цене',
  close: 'Закрыть',
};
const errors = {
  login: {
    name: 'Введите имя',
    companyName: 'Введите название вашей организации',
    email: 'Вы указали неверный email',
    emailEmpty: 'Введите email',
    password: 'Пароль должен состоять из не менее 7 знаков \n латиницей и 1 цифры',
    mobile: 'Неверный формат номера телефона',
    notMatch: 'Пароли не совпадают',
  },
  search: 'Подходящих результатов не найдено',
  camera: {
    photo: 'Произошла ошибка выбора фотографии. Пожалуйста, попробуйте еще раз.',
  },
  createItem: {
    name: 'Нельзя сохранить без названия',
    inventoryCodeEmpty: 'Введите инвентарный номер',
    inventoryCodeAlreadyInUse: 'Данный инвентарный номер уже существует',
  },
};

const headers = {
  items: 'Предметы',
  defects: 'Дефекты',
  qrscanner: 'Сканер',
  itemReady: 'Добавлено!',
  newItem: 'Новый предмет',
  pickDate: 'Выберите дату',
  mainInfo: 'Основная информация',
  addingItem: 'Добавление предмета',
  priceAndValue: 'Покупка и стоимость',
  storage: 'Принадлежность и хранение',
  createNewCompany: 'Создание новой \n организации',
};

const text = {
  question: 'Вы хотите создать \n аккаунт организации?',
  organisation:
    'Вас пока не добавили к организации.\nОбратитесь к администратору или\nдождитесь приглашения.',
  qrhint: 'Поместите штрих-код или QR-код в центр экрана',
  notItemsYet: 'Пока не добавлено ни одного предмета',
};

const hints = {
  name: 'Название',
  addPhoto: 'Добавить фото',
  noPhotos: 'Нет фотографий',
  enterName: 'Введите название',
  makePhotos: 'Сделайте фотографии вашего предмета',
  makeDefectsPhotos: 'Сделайте фотографии всех дефектов',
};

const itemForm = {
  manufacturer: 'Производитель',
  model: 'Модeль',
  description: 'Описание',
  inventoryCode: 'Инвентарный номер',
  qrcode: 'QR-код',
  purchaseDate: 'Дата покупки',
  purchasePrice: 'Цена покупки',
  marketPrice: 'Рыночная цена',
  estimateDate: 'Дата оценки',
  warrantyPeriod: 'Гарантийный срок',
  company: 'Организация',
  place: 'Место',
  coordinates: 'Координаты',
  responsible: 'Ответственный',
  onBalance: 'На балансе',
  category: 'Категория',
  name: 'Название',
};

const itemFormFields = Object.keys(itemForm).reduce((acc, objKey) => {
  const result = {
    key: objKey,
    description: itemForm[objKey],
    placeholder: placeholders[objKey],
  };

  if (objKey === 'inventoryCode') {
    result.warnings = {
      empty: errors.createItem.inventoryCodeEmpty,
      inUse: errors.createItem.inventoryCodeAlreadyInUse,
    };
  }

  if (objKey === 'name') {
    result.warning = errors.createItem.name;
  }

  acc[objKey] = result;
  return acc;
}, {});

const itemFormSections = [
  {
    index: 0,
    title: headers.mainInfo,
    data: Object.values(pick(slice(0, 5, keys(itemFormFields)), itemFormFields)),
  },
  {
    index: 1,
    title: headers.priceAndValue,
    data: Object.values(pick(slice(5, 10, keys(itemFormFields)), itemFormFields)),
  },
  {
    index: 2,
    title: headers.storage,
    data: Object.values(pick(slice(10, -1, keys(itemFormFields)), itemFormFields)),
  },
];

const formats = {
  newItemDates: 'DD.MM.YYYY',
};

const category = [
  'Новое',
  'Мебель',
  'Компьютеры',
  'Мебель',
  'Компьютеры',
  'Мебель',
  'Новое',
  'Мебель',
  'Новое',
  'Компьютеры',
  'Мебель',
  'Новое',
  'Мебель',
];

const data = {
  assets: [
    {
      id: '1',
      name: 'iPhone 6s',
      purchasePrice: 55000,
    },
    {
      id: '2',
      name: 'iPhone X',
      purchasePrice: 4,
    },
    {
      id: '3',
      name: 'MacBook Pro 13 Late',
      purchasePrice: 1700,
    },
    {
      id: '4',
      name: 'iPhone 5c',
      purchasePrice: 8000,
    },
    {
      id: '5',
      name: 'iPhone 4S',
      purchasePrice: 67000,
    },
    {
      id: '6',
      name: 'iPhone xs Max',
      purchasePrice: 900000,
    },
    {
      id: '7',
      name: 'iPad Pro 12 2017',
      purchasePrice: 6000,
    },
    {
      id: '8',
      name: 'Apple AirPods',
      purchasePrice: 30000,
    },
    {
      id: '9',
      name: 'Apple Watch Series 3',
      purchasePrice: 78000,
    },
  ],
};

const users = {
  admin: 'admin',
  manager: 'manager',
  observer: 'observer',
  employee: 'employee',
};

export default {
  data,
  sort,
  text,
  masks,
  users,
  hints,
  errors,
  regExp,
  headers,
  formats,
  itemForm,
  category,
  inputTypes,
  buttonTitles,
  placeholders,
  modalQuestion,
  itemFormFields,
  forgotPassText,
  setNewPassword,
  itemFormSections,
  uploadCreateCompanyImages,
};
