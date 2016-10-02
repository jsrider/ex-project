import React, { PropTypes } from 'react';
import { Row, Col } from 'antd';
import styles from './index.less';
import Header from './Header';
import SideMenu from './SideMenu';

function MainLayout(props) {
  console.log('MainLayout', props);

  const { location, children } = props;

  return (
    <div className={styles.normal}>
      <Header location={location} />
      <div className={styles.content}>
        <div className={styles.main}>
          <Row>
            <Col span="5">
              <SideMenu { ...props } />
            </Col>
            <Col span="19">
              <div className={styles.article}>
                {children}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

MainLayout.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
};

export default MainLayout;
