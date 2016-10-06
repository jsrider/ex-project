import React, { PropTypes } from 'react';
import { Row, Col } from 'antd';
import styles from './index.less';
import Header from './Header';
import SideMenu from './SideMenu';
import ModalForm from '../modalForm';

class MainLayout extends React.Component {
  constructor() {
    super();

    this.state = {
      modalOption: {
        password: ''
      },
    };

    this.modifySetting = {
      password: {
        modifyType: 'password',
        title: '密码: '
      }
    };
    this.elementsFields = ['password'];
  }

  getModalForm() {
    const { modalOption, modalVisible } = this.state;
    const { dispatch, userCenter } = this.props;

    const modalProps = {
      options: modalOption,
      title: '请输入登录密码',
      visible: !userCenter.login || false,
      modifySetting: this.modifySetting || {},
      elementsFields: this.elementsFields,
      cancel: false,
      handleOk: (values) => {
        // console.log('handleOk:', values);

        dispatch({
          type: 'userCenter/loginFetch',
          values,
        });
      },
      handleCancel: () => {
        return false;
      }
    };

    return <ModalForm {...modalProps} />;
  };

  render() {

    console.log('MainLayout', this.props);

    const { location, children, userCenter } = this.props;
    const { login } = userCenter || {};

    return (
      <div className={styles.normal}>
        <Header location={location} />
        <div className={styles.content}>
          <div className={styles.main}>
            <Row>
              <Col span="5">
                <SideMenu { ...this.props } />
              </Col>
              <Col span="19">
                <div className={styles.article}>
                  {
                    login ?
                      children :
                      null
                  }
                </div>
              </Col>
            </Row>
          </div>
          {this.getModalForm()}
        </div>
      </div>
    );
  }
}

MainLayout.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
};

export default MainLayout;
