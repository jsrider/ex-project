import React, { PropTypes } from 'react';
import { Table } from 'antd';
import styles from './index.less';
import { Link } from 'dva/router';

function FormLayout(props) {
  console.log('TableLayout', props);

  // const { location, dispatch } = props;
  const { chartData, loading } = props.chartPage;

  const columns = [
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
      width: 100,
      // fixed: 'left',
    },
    {
      title: '一',
      children: [
        {
          title: '温度',
          dataIndex: 'template',
          key: 'template',
          width: 100,
        },
        {
          title: '压力',
          dataIndex: 'pressure',
          key: 'pressure',
          width: 100,
        },
        {
          title: '流量',
          dataIndex: 'flow',
          key: 'flow',
          width: 100,
        },
        {
          title: '累积',
          dataIndex: 'total',
          key: 'total',
          width: 100,
        },
        {
          title: '气量',
          dataIndex: 'tolerance',
          key: 'tolerance',
          width: 100,
        },
      ],
    },
  ];

  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      time: '10: 10',
      template: Math.ceil(Math.random() * 100),
      pressure: Math.ceil(Math.random() * 100),
      flow: Math.ceil(Math.random() * 100),
      total: Math.ceil(Math.random() * 100),
      tolerance: Math.ceil(Math.random() * 100),
    })
  }

  return (
    <div>
      <h1 className={styles.title}>{chartData.title}</h1>
      <Table
        columns={columns}
        dataSource={data}
        bordered
        size="middle"
        scroll={{ x: 1010, y: 240 }}
      />
    </div>
  )
}

FormLayout.propTypes = {
  location: PropTypes.object,
};

export default FormLayout;
