import React from 'react';
import { Router, Route, Switch } from 'dva/router';

import MainMobile from '../views/entry/MainMobile';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" component={({history, location}) => {
          return (
            <MainMobile history={history} location={location}>
            </MainMobile>
          )
        }}/>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
