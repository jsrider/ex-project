import React from 'react';
import { Link } from 'dva/router';
import { connect } from 'dva';
import MainLayout from '../components/MainLayout'
import getMenuKeyFromUrl from '../utils/getMenuKeyFromUrl';

const Page = (props) => {

  // function handleDelete(id) {
  //   props.dispatch({
  //     type: 'products/delete',
  //     payload: id,
  //   });
  // }

  const { location, dispatch, sideMenu } = props;

  const mainLayoutProps = {
    dispatch,
    sideMenu,
    menuKey: getMenuKeyFromUrl(location.pathname),
  };


  console.log('IndexPage', props, mainLayoutProps);

  return (
    <MainLayout { ...mainLayoutProps } >
      <h2>List of Products</h2>
    </MainLayout>
  );
};

// export default Products;
export default connect(({routing, ...others}) => ({...others}))(Page);
