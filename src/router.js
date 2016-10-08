import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'dva/router';
import ChartPage from './routes/ChartPage';
import Alert from './routes/Alert';
import FlowChart from './routes/FlowChart';
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
      <Route path={`/${routerPath.setSetting}`} component={Alert} />
      <Route path={`/${routerPath.dealAlert}`} component={Alert} />
      <Route path={`/${routerPath.liuchengTu}`} component={FlowChart} />
      <Route path="/" component={FlowChart} />
    </Router>
  );
};
