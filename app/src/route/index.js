import { Switch, Route } from 'react-router-dom';
import React from 'react';

import Welcome from '../applications/welcome';
import TplManage from '../applications/tplmanage';
import ProjectManage from '../applications/projectmanage';

const AppRoute = () => (
  <Switch>
    <Route path="/" exact component={Welcome} />
    <Route path="/tplmanage" component={TplManage} />
    <Route path="/projectmanage" component={ProjectManage} />
  </Switch>
);

export default AppRoute;
