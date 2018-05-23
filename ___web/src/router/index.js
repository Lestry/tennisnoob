import React from 'react';
import { Router, Route, Redirect, Switch } from 'dva/router';

import Main from '../views/entry/Main';
import ToolCourt from '../views/tool/Court';
import ToolDraw from '../views/tool/Draw';
import CourtList from '../views/court/List';
import CourtData from '../views/court/Data';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Redirect exact from="/" to="/tool/court" />
        <Route path="/" component={({history, location}) => {
          return (
            <Main history={history} location={location}>
              <Route path="/tool/court" component={ToolCourt}/>
              <Route path="/tool/draw" component={ToolDraw}/>
              <Route path="/court/list" component={CourtList}/>
              <Route path="/court/data" component={CourtData}/>
            </Main>
          )
        }}/>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
