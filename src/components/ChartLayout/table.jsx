import React, { PropTypes } from 'react';
import { Table } from 'antd';
import styles from './index.less';
import { Link } from 'dva/router';

const keyArrCN = {
  template: '温度',
  pressure: '压力',
  flow: '流量',
  total: '累积',
  tolerance: '气量'
};

function FormLayout(props) {
  console.log('TableLayout', props);

  const { chartData, loading } = props.chartPage;

  // if (!chartData) {
  //   return;
  // }
  const { title, data, params } = chartData;

  const columns = [
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
      width: 100,
      // fixed: 'left',
    },
  ];

  if (data && data.length && params) {

    const { groupArr, groupArrCN, keyArr } = params;
    const len = groupArr.length;

    for (let i = 0; i < len; i++) {
      let obj = {
        title: groupArrCN[i],
        children: []
      };

      obj.children = keyArr.map(el => {
        return {
          title: keyArrCN[el],
          dataIndex: `${el}${groupArr[i]}`,
          key: `${el}${groupArr[i]}`,
          width: 100,
        }
      });

      columns.push(obj)
    }
  }


  return (
    <div>
      <h1 className={styles.title}>{title || '报表'}</h1>
      <Table
        columns={columns}
        dataSource={data || []}
        bordered
        size="middle"
        scroll={{ x: 1200, y: 240 }}
      />
    </div>
  )
}

FormLayout.propTypes = {
  location: PropTypes.object,
  chartPage: PropTypes.object.isRequired
};

export default FormLayout;
