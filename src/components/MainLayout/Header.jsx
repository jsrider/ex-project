import React, { PropTypes } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';
import styles from './index.less'

function getMenuKeyFromUrl(pathname) {
  let key = '';
  try {
    key = pathname.match(/\/([^\/]*)/i)[1];
    /* eslint no-empty:0 */
  } catch (e) {}
  return key;
}
const titleImg = require("../../img/header-title.png");

function Header({ location }) {
  return (
    <div className={styles.header}>
      <img src={titleImg} width="456" height="28" alt="天然气自动计量监控系统"/>
    </div>
  )
}

Header.propTypes = {
  location: PropTypes.object,
};

export default Header;
