import React from 'react';
import { Link } from 'dva/router';
import { connect } from 'dva';
import MainLayout from '../components/MainLayout';
import FlowChart from '../components/ChartLayout/FlowChart';
import getMenuKeyFromUrl from '../utils/getMenuKeyFromUrl';
// import * as routerPath from '../utils/routerPath';

const Page = (props) => {

  const { location, dispatch, sideMenu, flowChart, userCenter } = props;
  const menuKey = getMenuKeyFromUrl(location.pathname);

  const mainLayoutProps = {
    dispatch,
    sideMenu,
    menuKey,
    userCenter,
    pageData: flowChart
  };

  const flowChartLayoutProps = {
    dispatch,
    menuKey,
    pageData: flowChart
  };

  console.log('AlertPage', props, mainLayoutProps, flowChartLayoutProps);

  return (
    <MainLayout { ...mainLayoutProps } >
      <div>
        <FlowChart { ...flowChartLayoutProps } />
        <div id="flowChart" />
      </div>
    </MainLayout>
  );
};

// export default Products;
export default connect(({routing, ...others}) => ({...others}))(Page);

