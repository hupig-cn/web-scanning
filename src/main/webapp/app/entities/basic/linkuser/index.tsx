import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Linkuser from './linkuser';
import LinkuserDetail from './linkuser-detail';
import LinkuserUpdate from './linkuser-update';
import LinkuserDeleteDialog from './linkuser-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={LinkuserUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={LinkuserUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={LinkuserDetail} />
      <ErrorBoundaryRoute path={match.url} component={Linkuser} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={LinkuserDeleteDialog} />
  </>
);

export default Routes;
