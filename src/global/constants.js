// @flow

import { pick, slice, keys } from 'ramda';

export const inventoryApiUrl = 'https://api.staging.inventoryapp.info/graphql';

const regExp = {
  price: /^\d+(.|,){0,2}\d/,
  password: /^((?=\S*?[a-z,A-Z,0-9]).{7,})\S$/,
  email: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/,
  // eslint-disable-next-line no-useless-escape
  mobileNumber: /^(\+7)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/,
  // eslint-disable-next-line no-useless-escape
  photo: /^.+[\.\=](([pP][nN][gG])|([jJ][pP][gG])|([jJ][pP][eE][gG]))$/,
};

const masks = {
  price: '\u20BD [9999999990].[99]',
  mobileNumber: '+7 ([000]) [000]-[00]-[00]',
};

const uploadCreateCompanyImages = {
  width: 110,
  height: 110,
  quality: 0.5,
};

const uploadCreateAssetImages = {
  width: 375,
  height: 375,
  quality: 0.5,
};

const words = {
  yes: 'Да',
  no: 'Нет',
};

const suffixes = {
  firstType: ['ь', 'а'],
  secondType: ['ы', 'я', 'и'],
};

const prefixes = {
  firstType: 'Вся',
  secondType: 'Все',
  thirdType: 'Весь',
};

const placeholders = {
  manufacture: 'Введите название',
  email: 'Введите электронную почту',
  setPassword: 'Назначьте пароль',
  enterPassword: 'Введите пароль',
  model: 'Введите название',
  description: 'Введите текст',
  placeId: 'Место не указано',
  inputHeader: 'Введите название',
  inventoryId: 'Введите код',
  codeData: 'Введите код',
  assessedDate: 'Не оценивалось',
  dateOfPurchase: 'Выберите дату покупки',
  guaranteeExpires: 'Выберите дату окончания',
  category: 'Без категории',
  mobileNumber: '+7 (___) ___-__-__',
  purchasePrice: '\u20BD 0',
  assessedValue: '\u20BD 0',
  status: {
    accepted: 'Учтено',
    onProcessing: 'В обработке',
  },
  company: undefined,
  gps: undefined,
  name: undefined,
  onTheBalanceSheet: undefined,
  responsibleId: undefined,
};

const inputTypes = {
  name: {
    label: 'Имя',
    warning: 'Введите имя',
  },
  subCategory: {
    label: 'Название подкатегории',
  },
  category: {
    label: 'Название категории',
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
    warning: 'Пароль должен состоять из не менее 7 знаков латиницей и 1 цифры',
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
  save: 'Сохранить',
  update: 'Обновить',
  delete: 'Удалить',
  defects: 'Дефекты',
  skip: 'Пропустить',
  photos: 'Фотографии',
  create: 'Да, создать',
  edit: 'Редактировать',
  reg: 'Зарегистрироваться',
  addItem: 'Добавить предмет',
  registration: 'Регистрация',
  choosePhoto: 'Выбрать фото',
  chooseLogo: 'Выбери \n лого',
  saveItem: 'Сохранить предмет',
  forgotPassword: 'Забыли пароль?',
  addCategory: 'Добавить категорию',
  setNewPass: 'Задать новый пароль',
  restorePass: 'Восстановить пароль',
  saveChanges: 'Сохранить изменения',
  enter: 'Нет, войти как пользователь',
  createCompany: 'Создать организацию',
  editCategory: 'Редактировать категории',
  addSubCategory: 'Добавить подкатегорию',
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
    companyLogo: 'Неверный формат. Нужен .jpg или .png',
  },
  search: 'Подходящих результатов не найдено',
  qrcode: 'По отсканированному предмету\n нет информации',
  camera: {
    photo: 'Произошла ошибка выбора фотографии. Пожалуйста, попробуйте еще раз.',
    location: 'Не можем сделать фотографию без доступа к вашему местоположению',
    needPhoto: 'Требуется фото предмета или его дефектов для продолежния',
  },
  createItem: {
    name: 'Нельзя сохранить без названия',
    inventoryIdEmpty: 'Введите инвентарный номер',
    inventoryIdAlreadyInUse: 'Данный инвентарный номер уже существует',
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
  categoryList: 'Список категорий',
  addPhotos: 'Добавить фотографии',
  addingItem: 'Добавление предмета',
  priceAndValue: 'Покупка и стоимость',
  storage: 'Принадлежность и хранение',
  modifyingItem: 'Редактирование предмета',
  editCategory: 'Редактирование категории',
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
  noPlaceId: 'Пока не существует \n ни одного места',
  makeDefectsPhotos: 'Сделайте фотографии всех дефектов',
  noCategory: 'Пока не существует \n ни одной категории',
  noResponsibleId: 'Пока не существует \n ни одного ответственного',
};

/** Form stuff */

const itemForm = {
  manufacture: 'Производитель',
  model: 'Модeль',
  description: 'Описание',
  codeData: 'QR-код',
  inventoryId: 'Инвентарный номер',
  dateOfPurchase: 'Дата покупки',
  purchasePrice: 'Цена покупки',
  assessedValue: 'Рыночная цена',
  assessedDate: 'Дата оценки',
  guaranteeExpires: 'Гарантийный срок',
  company: 'Организация',
  placeId: 'Место',
  gps: 'Координаты',
  responsibleId: 'Ответственный',
  onTheBalanceSheet: 'На бухгалтерском балансе',
  category: 'Категория',
  status: 'Статус',
  name: 'Название',
};

const itemFormFields = Object.keys(itemForm).reduce((acc, objKey) => {
  const result: Object = {
    key: objKey,
    description: itemForm[objKey],
    placeholder: placeholders[objKey],
  };

  if (objKey === 'inventoryId') {
    result.warnings = {
      empty: errors.createItem.inventoryIdEmpty,
      inUse: errors.createItem.inventoryIdAlreadyInUse,
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

const fieldTypes = {
  currencyFields: [itemForm.assessedValue, itemForm.purchasePrice],
  nonEditableFields: [itemForm.codeData, itemForm.company, itemForm.status, itemForm.gps],
  dateFields: [itemForm.dateOfPurchase, itemForm.assessedDate, itemForm.guaranteeExpires],
  modalFields: [
    itemForm.placeId,
    itemForm.category,
    itemForm.responsibleId,
    itemForm.onTheBalanceSheet,
  ],
};

const updateAssetProperties = keys(itemForm).concat([
  'id',
  'photosIdsToRemove',
  'photosToAdd',
  'photosOfDamagesToAdd',
]);

const assetStatuses = {
  onProcessing: 'on_processing',
  accepted: 'accepted',
};

const roles = {
  admin: 'admin',
  manager: 'manager',
  observer: 'observer',
  employee: 'employee',
};

const formats = {
  newItemDates: 'DD.MM.YYYY',
  createAssetDates: 'YYYY-MM-DD',
  createUserCompanyDates: 'YYYY-MM-DDTHH:MM:ss[Z]',
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

const categoryIconList = [
  {
    id: 1,
    name: 'side-menu-atom',
  },
  {
    id: 2,
    name: 'side-menu-notebook',
  },
  {
    id: 3,
    name: 'side-menu-plug',
  },
  {
    id: 4,
    name: 'side-menu-boots',
  },
  {
    id: 5,
    name: 'side-menu-ball',
  },
  {
    id: 6,
    name: 'side-menu-furniture',
  },
  {
    id: 7,
    name: 'side-menu-rudder',
  },
  {
    id: 8,
    name: 'side-menu-joystick',
  },
  {
    id: 9,
    name: 'side-menu-desk',
  },
  {
    id: 10,
    name: 'side-menu-tools',
  },
  {
    id: 11,
    name: 'power',
  },
  {
    id: 12,
    name: 'pencil',
  },
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

const generalCategories = {
  allCategories: {
    name: 'Все категории',
    icon: 'side-menu-all',
  },
  withoutCategories: {
    name: 'Без категории',
    icon: 'side-menu-all',
  },
};

const warnings = {
  emptyName: 'Введите имя',
  emptyEmail: 'Введите email',
  emptyPassword: 'Введите пароль',
  invalidEmail: 'Вы указали неверный email',
  userNotFound: 'Неверный email или пароль',
  invalidMobile: 'Не верный формат номера телефона',
  emailAlreadyExists: 'Этот email уже зарегистрирован',
  unregisteredEmail: 'Данный email не был зарегистрирован',
  invalidPassword: 'Минимальная длинна пароля - 8 символов',
};

const graphqlErrors = {
  userNotFound: 'GraphQL error: User not found',
  passwordIsIncorrect: 'GraphQL error: Password is incorrect',
  emailAlreadyExists: 'GraphQL error: Validation failed: Email already exists',
};

export default {
  data,
  sort,
  text,
  masks,
  words,
  roles,
  hints,
  errors,
  regExp,
  headers,
  formats,
  prefixes,
  suffixes,
  itemForm,
  warnings,
  category,
  inputTypes,
  fieldTypes,
  buttonTitles,
  placeholders,
  assetStatuses,
  graphqlErrors,
  modalQuestion,
  itemFormFields,
  forgotPassText,
  setNewPassword,
  categoryIconList,
  itemFormSections,
  generalCategories,
  updateAssetProperties,
  uploadCreateAssetImages,
  uploadCreateCompanyImages,
};
