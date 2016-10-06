import React from 'react';
import { Button, Select, Table, Popconfirm } from 'antd';
import ModalForm from './modalForm';

class Setting extends React.Component {
  constructor() {
    super();

    this.state = {
      modalVisible: false,
      modalOption: null
    };

    this.elementsFields = [];
    this.modifySetting = {};
  }

  getModalForm() {
    const { modalOption, modalVisible } = this.state;

    const modalProps = {
      options: modalOption,
      title: '修改数据',
      visible: modalVisible || false,
      modifySetting: this.modifySetting || {},
      elementsFields: this.elementsFields,
      handleOk: (values) => {
        console.log('handleOk:', values)
      },
      handleCancel: () => {
        this.setState({
          modalVisible: false,
        });
      }
    };

    return <ModalForm {...modalProps} />;
  };

  handleDelete(payloadObj) {
    const { dispatch } = this.props;

    dispatch({
      type: 'alertPageData/deleteRecord',
      payloadObj
    })
  }

  onChange(pagination, filters, sorter) {
    const { dispatch, dispatchType, menuKey} = this.props;

    const payloadObj = {
      current: pagination.current,
      pageSize: pagination.pageSize
    };

    // pageParams.addQueryParams(payloadObj);

    dispatch({
      type: dispatchType,
      // type: 'formSelects/submit',
      payloadObj,
      menuKey
    });
  }

  handleModify(record) {
    this.setState({
      modalOption: record,
      modalVisible: true
    })
  }

  render () {
    console.log('SettingLayout', this.props);

    const { pageData } = this.props;
    const { tableData, loading } = pageData;

    // if (!tableData) {
    //   return;
    // }
    let { data, params, pagination } = tableData;
    const columns = [];

    this.elementsFields = [];
    if (Array.isArray(data) && data.length && params) {

      const { keyArr, keyArrCN, setting } = params;
      const len = keyArr.length;

      this.modifySetting = setting;

      for (let i = 0; i < len; i++) {
        const key = keyArr[i];
        const title = keyArrCN[i];

        this.elementsFields.push(key);

        columns.push({
          title: title || key,
          dataIndex: key,
        })
      }
    } else {
      data = []
    }

    // 操作栏
    columns.push({
      title: '操作',
      key: 'operation',
      render: (text, record) => {
        return (
          <span>
          <a href="javascript:;" onClick={this.handleModify.bind(this, record)}>修改</a>
          <span className="ant-divider"/>
          <Popconfirm title="确定要删除这条数据吗？" onConfirm={
            this.handleDelete.bind(this, record)
          }>
            <a href="javascript:;">删除</a>
          </Popconfirm>
        </span>
        )
      },
    });

    return (
      <div style={{marginTop: '24px'}}>
        {this.getModalForm()}
        <Table
          loading={loading}
          rowKey={(record, index) => index}
          columns={columns}
          onChange={this.onChange}
          dataSource={data}
          pagination={pagination}
        />
      </div>
    );
  }
}

Setting.propTypes = {
};

export default Setting;
