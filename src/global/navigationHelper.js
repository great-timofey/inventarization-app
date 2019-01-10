// @flow

import { createRef } from 'react';
import SideMenu from 'react-native-side-menu';
import { createNavigation } from 'react-navigation-extension';

import { navigationNames } from './navigationNames';

import type { RefObject } from '~/types';

export const mainNavigation = createNavigation(navigationNames.main);

export const sideMenuRef: RefObject<typeof SideMenu> = createRef();

export function setIsSideMenuOpen(isOpen: boolean) {
  const {
    current: sideMenuNode,
  } = sideMenuRef;
  if (sideMenuNode != null) {
    sideMenuNode.openMenu(isOpen);
  }
}
