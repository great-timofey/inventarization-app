// @flow

import type { ElementRef } from 'react';

/* eslint-disable camelcase */
import type {
  ____DangerouslyImpreciseStyle_Internal as ImpreciseStyle,
} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
/* eslint-enable camelcase */

import type {
  SyntheticEvent,
} from 'react-native/Libraries/Types/CoreEventTypes';
import type { KeyboardEvent } from 'react-native/Libraries/Components/Keyboard/Keyboard';

export type {
  Element,
  Node,
  ComponentType,
} from 'react';

/* eslint-disable camelcase */
export type {
  ____ViewStyleProp_Internal as ViewStyle,
  ____TextStyleProp_Internal as TextStyle,
  ____ImageStyleProp_Internal as ImageStyle,
  ____Styles_Internal as Styles,
} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
/* eslint-enable camelcase */

export type {
  LayoutEvent,
  ScrollEvent,
} from 'react-native/Libraries/Types/CoreEventTypes';

export type {
  TimingAnimationConfig,
} from 'react-native/Libraries/Animated/src/animations/TimingAnimation';

export type PageSelectedEvent = SyntheticEvent<$ReadOnly<{|
  position: number,
|}>>;

export type StyleSheetValue = $Shape<ImpreciseStyle>;

export type RefObject<ElementType> = {
  current: ElementRef<ElementType> | null,
};

export type KeyboardEventListener = (e: KeyboardEvent) => void;

export type Listener = {
  +remove: () => void,
};

export type Listeners = Array<Listener>;

/* eslint-disable no-use-before-define */

export type Asset = {
  id: string,
  gps: Object,
  name: string,
  place: Place,
  creator: User,
  model: string,
  status: Object,
  company: Company,
  quantity: number,
  codeData: string,
  createdAt: string,
  responsible: User,
  category: Category,
  description: string,
  inventoryId: string,
  manufacture: string,
  assessedDate: string,
  assessedValue: number,
  purchasePrice: number,
  photos: Array<Object>,
  dateOfPurchase: string,
  guaranteeExpires: string,
  onTheBalanceSheet: boolean,
  photosOfDamages: Array<Object>,
};

export type User = {
  id: string,
  role: string,
  email: string,
  photo: Object,
  fullName: string,
  createdAt: string,
  phoneNumber: string,
  places: Array<Place>,
  unconfirmedEmail: string,
  companies: Array<Company>,
  createdAssets: Array<Asset>,
  userCompanies: Array<Company>,
  responsibleAssets: Array<Asset>,
};

export type Category = {
  id: string,
  name: string,
  icon?: string,
  place?: Place,
  company: Company,
  parent?: Category,
  createdAt: string,
  chields: Array<Category>,
};

export type Company = {
  id: string,
  name: string,
  logo?: string,
  places: Place,
  deleted: boolean,
  createdAt: string,
  users: Array<User>,
  deleteAt?: string,
  deletedIn?: string,
  assets: Array<Asset>,
  timeToDelete?: string,
  categories: Array<Category>,
};

export type Place = {
  id: string,
  gps: Object,
  name: string,
  manager?: User,
  address: string,
  company: Company,
  createdAt: string,
  assets: Array<Asset>,
  photo: Array<string>,
  subPlaces: Array<Place>,
};

export type Categories = Array<Category>

/* eslint-enable no-use-before-define */
