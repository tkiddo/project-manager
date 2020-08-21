import { Switch, Route, Redirect } from 'react-router-dom';
import React from 'react';

import UserGuide from '../applications/UserGuide';
import TplManage from '../applications/TplManage';
import ProjectManage from '../applications/ProjectManage';
import EslintManage from '../applications/EslintManage';
import Taskmanage from '../applications/Taskmanage';
import CompTemplate from '../applications/CompTemplate';

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
