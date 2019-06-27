import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { Translate, translate } from 'react-jhipster';
import { NavDropdown } from './menu-components';

const accountMenuItemsAuthenticated = (
  <MenuItem icon="sign-out-alt" to="/logout">
    <Translate contentKey="global.menu.account.logout">Sign out</Translate>
  </MenuItem>
);

const accountMenuItems = (
  <MenuItem id="login-item" icon="sign-in-alt" to="/login">
    <Translate contentKey="global.menu.account.login">Sign in</Translate>
  </MenuItem>
);

export const AccountMenu = ({ isAuthenticated = false }) => (
  <NavDropdown icon="user" name={translate('global.menu.account.main')} id="account-menu">
    {isAuthenticated ? accountMenuItemsAuthenticated : accountMenuItems}
  </NavDropdown>
);

export default AccountMenu;