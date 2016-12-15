import React from 'react';
import { Button, Select, Table, Popconfirm, message } from 'antd';
import ModalForm from '../modalForm';

class Setting extends React.Component {
  constructor() {
    super();

    this.state = {
      modalVisible: true,
      modalOption: null
    };

    this.elementsFields = [];
    this.modifySetting = {};
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.monitorSubmitSuccess) {
      this.setState({
        modalVisible: false
      })
    }
  }


  render () {
    console.log('FlowChartDialog', this.props);
    const { station, flowChartMonitorData, dispatch } = this.props;
    const { modalVisible } = this.state;

    // 流量计点击弹窗
      // const { dispatch, userCenter, menuKey } = this.props;
    if (!flowChartMonitorData.params) {
      return null;
    }

    const settings = flowChartMonitorData.params.setting || {};
    const options = flowChartMonitorData.params.options || {};

    const modalProps = {
      options: {
        station,
        ...options,
      },
      title: flowChartMonitorData.title || '传感器详情',
      visible: modalVisible,
      modifySetting: {
        ...settings,
        station: {
          modifyType: 'text',
          title: '站点: '
        },
      },
      elementsFields: ['station', ...flowChartMonitorData.params.keyArr],
      handleOk: (values) => {
        console.log('handleOk:', values);

        Object.keys(values).map(key => {
          if (typeof values[key] === 'object') {
            values[key] = values[key].format('YYYY/MM/DD')
          }
        });

        console.log('handleOk2:', values);

        dispatch({
          type: 'flowChart/monitorSubmit',
          values,
        });
      },
      handleCancel: () => {
        this.setState({
          modalVisible: false
        })
      }
    };

    return <ModalForm {...modalProps} />;
  }
}

Setting.propTypes = {
};

export default Setting;
