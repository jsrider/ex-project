import React from 'react';
import { Link } from 'dva/router';
import { connect } from 'dva';
import MainLayout from '../components/MainLayout'

const Products = ({location, dispatch}) => {

  // function handleDelete(id) {
  //   props.dispatch({
  //     type: 'products/delete',
  //     payload: id,
  //   });
  // }

  console.log('IndexPage', location);

  return (
    <MainLayout location={location}>
      <h2>List of Products</h2>
    </MainLayout>
  );
};

// export default Products;
export default connect(({ props }) => ({
  props
}))(Products);
