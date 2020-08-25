import { Switch, Route, Redirect } from 'react-router-dom';
import React from 'react';

import UserGuide from '../applications/UserGuide';
import TplManage from '../applications/TplManage';
import ProjectManage from '../applications/ProjectManage';
import EslintManage from '../applications/EslintManage';
import Taskmanage from '../applications/TaskManage';
import CompTemplate from '../applications/CompTemplate';
import ProjectInfo from '../applications/ProjectInfo';
import NotFound from '../components/NotFound';

const AppRoute = () => (
  <Switch>
    <Route path="/userguide" component={UserGuide} />
    <Route path="/tplmanage" component={TplManage} />
    <Route path="/projectmanage" component={ProjectManage} />
    <Route path="/eslintmanage" component={EslintManage} />
    <Route path="/taskmanage" component={Taskmanage} />
    <Route path="/comptemplate" component={CompTemplate} />
    <Route path="/projectinfo/:id" component={ProjectInfo} />
    <Route path="/" exact>
      <Redirect to="/userguide" />
    </Route>
    <Route path="*">
      <NotFound />
    </Route>
  </Switch>
);

export default AppRoute;
