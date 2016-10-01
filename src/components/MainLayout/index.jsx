import React, { PropTypes } from 'react';
import styles from './index.less';
import Header from './Header';

function MainLayout({ children, location }) {
  console.log(arguments, children, location);

  return (
    <div className={styles.normal}>
      <Header location={location} />
      <div className={styles.content}>
        <div className={styles.main}>
          {children}
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
