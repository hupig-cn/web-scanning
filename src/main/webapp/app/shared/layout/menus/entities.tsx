import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { Translate, translate } from 'react-jhipster';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown icon="th-list" name={translate('global.menu.entities.main')} id="entity-menu">
    <MenuItem icon="asterisk" to="/entity/linkuser">
      <Translate contentKey="global.menu.entities.basicLinkuser" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/merchant">
      <Translate contentKey="global.menu.entities.merchantMerchant" />
    </MenuItem>
  </NavDropdown>
);
