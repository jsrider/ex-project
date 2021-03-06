import React from 'react';
import { Link } from 'dva/router';
import { connect } from 'dva';
import MainLayout from '../components/MainLayout';
import FormLayout from '../components/FormLayout';
import Alert from '../components/Alert';
import Setting from '../components/Setting';
import getMenuKeyFromUrl from '../utils/getMenuKeyFromUrl';
import * as routerPath from '../utils/routerPath';

const Page = (props) => {

  // function handleDelete(id) {
  //   props.dispatch({
  //     type: 'products/delete',
  //     payload: id,
  //   });
  // }

  const { location, dispatch, sideMenu, formSelects, alertPageData, userCenter, alertDialog } = props;
  const menuKey = getMenuKeyFromUrl(location.pathname);

  let dispatchType = 'pageData';

  switch (menuKey) {
    case routerPath.dealAlert:
      dispatchType = 'alertPageData/queryData';
      break;

    case routerPath.setSetting:
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
    userCenter,
    pageData: alertPageData,
    alertDialog
  };

  const formLayoutProps = {
    dispatch,
    formSelects,
    pageData: alertPageData,
    menuKey,
    location,
    dispatchType
  };

  const alertProps = {
    dispatch,
    menuKey,
    pageData: alertPageData,
    dispatchType,
  };

  console.log('AlertPage', props, mainLayoutProps, formLayoutProps);

  return (
    <MainLayout { ...mainLayoutProps } >
      <div>
        <FormLayout { ...formLayoutProps } />
        {
          menuKey === routerPath.dealAlert ?
            <Alert { ...alertProps } /> :
            <Setting { ...alertProps } />
        }
      </div>
    </MainLayout>
  );
};

// export default Products;
export default connect(({routing, ...others}) => ({...others}))(Page);

