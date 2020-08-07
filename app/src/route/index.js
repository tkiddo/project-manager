import { Switch, Route } from 'react-router-dom';
import React from 'react';

import TplManage from '../applications/tplmanage';
import Welcome from '../applications/welcome';

const AppRoute = () => (
  <Switch>
    <Route path="/" exact component={Welcome} />
    <Route path="/tplmanage" component={TplManage} />
  </Switch>
);

export default AppRoute;
