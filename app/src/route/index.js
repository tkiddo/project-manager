import { Switch, Route } from 'react-router-dom';
import React from 'react';

import TplManage from '../applications/tplmanage';

const AppRoute = (props) => {
  return (
    <Switch>
      <Route path="/tplmanage">
        <TplManage></TplManage>
      </Route>
      <Route path="/" exact>
        <div>Welcome</div>
      </Route>
    </Switch>
  );
};

export default AppRoute;
