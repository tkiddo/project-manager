import { Switch, Route, Redirect } from 'react-router-dom';
import React from 'react';

import UserGuide from '../applications/userguide';
import TplManage from '../applications/tplmanage';
import ProjectManage from '../applications/projectmanage';
import EslintManage from '../applications/eslintmanage';
import Taskmanage from '../applications/taskmanage';
import CompTemplate from '../applications/comptemplate';

const AppRoute = () => (
  <Switch>
    <Route path="/userguide" component={UserGuide} />
    <Route path="/tplmanage" component={TplManage} />
    <Route path="/projectmanage" component={ProjectManage} />
    <Route path="/eslintmanage" component={EslintManage} />
    <Route path="/taskmanage" component={Taskmanage} />
    <Route path="/comptemplate" component={CompTemplate} />
    <Route path="/" exact>
      <Redirect to="/userguide" />
    </Route>
  </Switch>
);

export default AppRoute;
