import React from 'react';
import { Switch } from 'react-router-dom';
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import PageNotFound from 'app/shared/error/page-not-found';
import Scanning from 'app/modules/scanning/scanning';
import { Pay } from './modules/pay/pay';

const Routes = () => (
    <div className="view-routes">
        <Switch>
            <ErrorBoundaryRoute path="/pay" component={Pay} />
            <ErrorBoundaryRoute path="/" exact component={Scanning} />
            <ErrorBoundaryRoute component={PageNotFound} />
        </Switch>
    </div>
);

export default Routes;
