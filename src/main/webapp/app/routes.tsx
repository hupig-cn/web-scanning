import React from 'react';

import Scanning from 'app/modules/scanning/scanning';
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

const Routes = () => (
  <ErrorBoundaryRoute path="/" exact component={Scanning} />
);

export default Routes;
