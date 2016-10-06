import React from 'react';
import { Link } from 'dva/router';
import { connect } from 'dva';
import MainLayout from '../components/MainLayout';
import FormLayout from '../components/FormLayout';
import ChartLayout from '../components/ChartLayout';
import TableLayout from '../components/ChartLayout/table';
import getMenuKeyFromUrl from '../utils/getMenuKeyFromUrl';
import * as routerPath from '../utils/routerPath';

const Page = (props) => {

  // function handleDelete(id) {
  //   props.dispatch({
  //     type: 'products/delete',
  //     payload: id,
  //   });
  // }

  const { location, dispatch, sideMenu, formSelects, pageData, userCenter } = props;
  const menuKey = getMenuKeyFromUrl(location.pathname);

  let dispatchType = 'pageData';

  switch (menuKey) {
    case routerPath.dealAlert:
      dispatchType = 'alertPageData/queryData';
      break;

    default:
      dispatchType = 'pageData/queryData';
      break;
  }

  const mainLayoutProps = {
    dispatch,
    sideMenu,
    menuKey,
    pageData,
    userCenter,
  };
  const formLayoutProps = {
    dispatch,
    formSelects,
    pageData,
    menuKey,
    location,
    dispatchType
  };

  const chartLayoutProps = {
    pageData,
    dispatch,
    dispatchType,
    menuKey
  };


  console.log('ChartPage', props, mainLayoutProps, formLayoutProps);

  return (
    <MainLayout { ...mainLayoutProps } >
      <div>
        <FormLayout { ...formLayoutProps } />
        {
          menuKey.includes('chart') ?
            <ChartLayout { ...chartLayoutProps } /> :
            <TableLayout { ...chartLayoutProps } />
        }
        <div id="c1" style={{display: menuKey.includes('chart') ? 'block' : 'none'}}></div>
      </div>
    </MainLayout>
  );
};

// export default Products;
export default connect(({routing, ...others}) => ({...others}))(Page);

