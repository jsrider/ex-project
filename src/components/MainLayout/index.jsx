import React, { PropTypes } from 'react';
import { Row, Col, Table, message } from 'antd';
import styles from './index.less';
import Header from './Header';
import SideMenu from './SideMenu';
import ModalForm from '../modalForm';

let alertDialogTimer = null;

class MainLayout extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  // 密码校验弹窗
  getModalForm() {
    const { dispatch, userCenter, menuKey } = this.props;

    const modalProps = {
      options: {
        password: ''
      },
      title: '请输入登录密码',
      visible: !userCenter.login || false,
      modifySetting: {
        password: {
          modifyType: 'password',
          title: '密码: '
        }
      },
      elementsFields: ['password'],
      cancel: false,
      handleOk: (values) => {
        // console.log('handleOk:', values);

        dispatch({
          type: 'userCenter/loginFetch',
          values,
          menuKey,
        });
      },
      handleCancel: () => {
        return false;
      }
    };

    return <ModalForm {...modalProps} />;
  };

  // 阻止使用弹窗
  getKeyFile() {
    const { userCenter } = this.props;

    const modalProps = {
      options: {
        password: ''
      },
      title: '需要 key 文件激活产品',
      visible: userCenter.needKey || false,
      modifySetting: {
      },
      elementsFields: [],
      cancel: false,
      handleOk: (values) => {
        // console.log('handleOk:', values);
        return alert('需要 key 文件激活产品,才能继续使用!');
      },
      handleCancel: () => {
        return false;
      }
    };

    return <ModalForm {...modalProps} />;
  };

  // 报警弹窗
  getModalFormAlert() {
    const { dispatch, alertDialog } = this.props;

    let { data, params, pagination, title, alert } = alertDialog || {};

    if (!alertDialogTimer) {
      const dialogFetch = () => {
        dispatch({
          type: 'alertDialog/fetchAlertDialog',
        });

        // throttle(fetchDialog, 5000);
      };

      // dialogFetch();

      alertDialogTimer = window.setInterval(dialogFetch, 300000);
    }


    const modalProps = {
      options: {},
      title: title || '报警',
      visible: alert == 1 || false,
      modifySetting: {
        handle_person: {
          title: '处理人: ',
          required: true
        },
        handle_tips: {
          modifyType: 'textarea',
          title: '处理信息: ',
          required: true
        }
      },
      width: 500,
      elementsFields: ['handle_person', 'handle_tips'],
      handleOk: (values) => {
        // console.log('handleOk:', values, curTableData);

        message.success('处理成功!');
        return dispatch({
          type: 'alertDialog/fetchDialogSubmit',
          values: {
            ...curTableData,
            ...values,
          },
        });
      },
      handleCancel: () => {
        return dispatch({
          type: 'alertDialog/closeDialog',
        });
      }
    };

    const tableChange = (pagination) => {
      curTableData = data[pagination.current - 1];
    };

    const columns = [];

    if (Array.isArray(data) && data.length && params) {

      const { keyArr, keyArrCN } = params;
      const len = keyArr.length;

      for (let i = 0; i < len; i++) {
        columns.push({
          title: keyArrCN[i] || keyArr[i],
          dataIndex: keyArr[i],
          // width: '80px'
        })
      }
    } else {
      data = []
    }

    let curTableData = data[0];

    return <ModalForm {...modalProps}>
      <Table
        className="alert-talbe"
        rowKey={(record, index) => index}
        columns={columns}
        dataSource={data}
        pagination={pagination}
        onChange={tableChange}
      />
    </ModalForm>;
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
              <Col span="4">
                <SideMenu { ...this.props } />
              </Col>
              <Col span="20">
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
          {this.getModalFormAlert()}
          {this.getKeyFile()}
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
