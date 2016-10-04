import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'dva/router';
import IndexPage from './routes/IndexPage';
import ChartPage from './routes/ChartPage';
import * as routerPath from './utils/routerPath';

export default function({ history }) {
  return (
    <Router history={history}>
      <Route path={`/${routerPath.shishiChart}`} component={ChartPage} />
      <Route path={`/${routerPath.riChart}`} component={ChartPage} />
      <Route path={`/${routerPath.yueChart}`} component={ChartPage} />
      <Route path={`/${routerPath.lishiChart}`} component={ChartPage} />
      <Route path={`/${routerPath.shishiTable}`} component={ChartPage} />
      <Route path={`/${routerPath.riTable}`} component={ChartPage} />
      <Route path={`/${routerPath.yueTable}`} component={ChartPage} />
      <Route path={`/${routerPath.lishiTable}`} component={ChartPage} />
      <Route path={`/${routerPath.setting}`} component={ChartPage} />
      <Route path={`/${routerPath.alert}`} component={ChartPage} />
      <Route path="/" component={IndexPage} />
    </Router>
  );
};
