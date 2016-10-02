import React from 'react';
import { Link } from 'dva/router';
import { connect } from 'dva';
import MainLayout from '../components/MainLayout'

const Products = (props) => {

  // function handleDelete(id) {
  //   props.dispatch({
  //     type: 'products/delete',
  //     payload: id,
  //   });
  // }

  const { location, dispatch, sideMenu } = props;

  const mainLayoutProps = {
    location,
    dispatch,
    sideMenu
  };

  console.log('IndexPage', props, mainLayoutProps);

  return (
    <MainLayout { ...mainLayoutProps } >
      <h2>List of Products</h2>
    </MainLayout>
  );
};

// export default Products;
export default connect(({ sideMenu }) => ({
  sideMenu
}))(Products);
