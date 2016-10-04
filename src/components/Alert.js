import React from 'react';
import { Button, Select, Table } from 'antd';

const Alert = (props) => {

  const columns = [{
    title: '报警时间',
    dataIndex: 'altime',
  }, {
    title: '站点',
    dataIndex: 'site',
  }, {
    title: '检测点',
    dataIndex: 'check',
  }, {
    title: '异常量',
    dataIndex: 'exception',
  }, {
    title: '处理时间',
    dataIndex: 'dealtime',
  }, {
    title: '处理人',
    dataIndex: 'dealpeople',
  }, {
    title: '处理信息',
    dataIndex: 'dealmsg',
  }];

  const data = [];



  return (
    <div style={{marginTop: '24px'}}>
        <Table
          rowKey={(record, index) => index}
          columns={columns}
          dataSource={data}
          pagination={false}
        />
    </div>
  );
};

Alert.propTypes = {
};

export default Alert;
