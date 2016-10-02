import React from 'react';
import { Link } from 'dva/router';
import { connect } from 'dva';
import MainLayout from '../components/MainLayout';
import FormLayout from '../components/FormLayout';

const Products = (props) => {

  // function handleDelete(id) {
  //   props.dispatch({
  //     type: 'products/delete',
  //     payload: id,
  //   });
  // }

  const { location, dispatch, sideMenu, formSelects } = props;

  const mainLayoutProps = {
    location,
    dispatch,
    sideMenu,
  };

  console.log('ChartPage', props, mainLayoutProps);

  return (
    <MainLayout { ...mainLayoutProps } >
      <FormLayout formSelects={formSelects} />
    </MainLayout>
  );
};

// export default Products;
export default connect(({
  sideMenu,
  formSelects
}) => ({
  sideMenu,
  formSelects
}))(Products);
