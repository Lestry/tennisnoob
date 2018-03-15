import React from 'react';
import { Router, Route, Switch } from 'dva/router';

import Main from '../views/Main';
import ToolIndex from '../views/tool/Index';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Main>
          <Route path="/tool" component={ToolIndex}/>
        </Main>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
