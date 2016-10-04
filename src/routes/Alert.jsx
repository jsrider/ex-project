import React from 'react';
import { Link } from 'dva/router';
import { connect } from 'dva';
import MainLayout from '../components/MainLayout';
import Alert from '../components/Alert';
import getMenuKeyFromUrl from '../utils/getMenuKeyFromUrl';

const Page = (props) => {

  // function handleDelete(id) {
  //   props.dispatch({
  //     type: 'products/delete',
  //     payload: id,
  //   });
  // }

  const { location, dispatch, sideMenu, formSelects, chartPage } = props;
  const menuKey = getMenuKeyFromUrl(location.pathname);

  const mainLayoutProps = {
    dispatch,
    sideMenu,
    menuKey,
  };

  console.log('ChartPage', props, mainLayoutProps, formLayoutProps);

  return (
    <MainLayout { ...mainLayoutProps } >
      <div>
        <Alert/>
        <div id="c1" style={{display: menuKey.includes('chart') ? 'block' : 'none'}}></div>
      </div>
    </MainLayout>
  );
};

// export default Products;
export default connect(({routing, ...others}) => ({...others}))(Page);

