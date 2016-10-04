import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'dva/router';
import IndexPage from './routes/IndexPage';
import ChartPage from './routes/ChartPage';
import Alert from './routes/Alert';
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
      <Route path={`/${routerPath.setSetting}`} component={ChartPage} />
      <Route path={`/${routerPath.dealAlert}`} component={Alert} />
      <Route path="/" component={IndexPage} />
    </Router>
  );
};
