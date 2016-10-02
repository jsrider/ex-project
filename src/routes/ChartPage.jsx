import React from 'react';
import { Link } from 'dva/router';
import { connect } from 'dva';
import MainLayout from '../components/MainLayout';
import FormLayout from '../components/FormLayout';
import getMenuKeyFromUrl from '../utils/getMenuKeyFromUrl';

const Page = (props) => {

  // function handleDelete(id) {
  //   props.dispatch({
  //     type: 'products/delete',
  //     payload: id,
  //   });
  // }

  const { location, dispatch, sideMenu, formSelects, chartPage } = props;

  const mainLayoutProps = {
    dispatch,
    sideMenu,
    menuKey: getMenuKeyFromUrl(location.pathname),
  };
  const formLayoutProps = {
    dispatch,
    formSelects,
    chartPage,
  };

  console.log('ChartPage', props, mainLayoutProps, formLayoutProps);

  return (
    <MainLayout { ...mainLayoutProps } >
      <FormLayout { ...formLayoutProps } />
    </MainLayout>
  );
};

// export default Products;
export default connect(({routing, ...others}) => ({...others}))(Page);

