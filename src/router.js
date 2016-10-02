import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'dva/router';
import IndexPage from './routes/IndexPage';
import ChartPage from './routes/ChartPage';

export default function({ history }) {
  return (
    <Router history={history}>
      <Route path="/shishi-chart" component={ChartPage} />
      <Route path="/" component={IndexPage} />
    </Router>
  );
};
