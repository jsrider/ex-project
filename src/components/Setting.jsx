import React from 'react';
import { Button, Select, Table } from 'antd';

const Alert = (props) => {

  console.log('AlertLayout', props);

  const { dispatch, pageData, dispatchType, menuKey} = props;
  const { tableData, loading } = pageData;

  // if (!tableData) {
  //   return;
  // }
  let { data, params, pagination } = tableData;
  const columns = [];

  if (Array.isArray(data) && data.length && params) {

    const { keyArr, keyArrCN } = params;
    const len = keyArr.length;

    for (let i = 0; i < len; i++) {
      columns.push({
        title: keyArrCN[i] || keyArr[i],
        dataIndex: keyArr[i],
      })
    }
  } else {
    data = []
  }

  // 操作栏
  columns.push({
    title: '操作',
    key: 'operation',
    render: (text, record) => (
      <span>
        <a href="javascript;;">修改{record.setup}</a>
        <span className="ant-divider" />
        <a href="javascript;;">删除</a>
      </span>
    ),
  });

  const onChange = (pagination, filters, sorter) => {
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
  };

  return (
    <div style={{marginTop: '24px'}}>
        <Table
          loading={loading}
          rowKey={(record, index) => index}
          columns={columns}
          onChange={onChange}
          dataSource={data}
          pagination={pagination}
        />
    </div>
  );
};

Alert.propTypes = {
};

export default Alert;
