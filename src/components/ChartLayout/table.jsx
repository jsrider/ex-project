import React, { PropTypes } from 'react';
import { Table } from 'antd';
import styles from './index.less';
import { Link } from 'dva/router';
// import { pageParams } from '../../utils/pageParams';

const getRealHtml = (text) => {

  return <p dangerouslySetInnerHTML={{__html: text}} />
};

function FormLayout(props) {
  console.log('TableLayout', props);

  const { dispatch, pageData, dispatchType, menuKey} = props;
  const { tableData, loading } = pageData;

  // if (!tableData) {
  //   return;
  // }
  let { title, data, params, pagination } = tableData;

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

  const columns = [
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
      width: 100,
      render: getRealHtml,
      fixed: 'left',
    },
  ];

  if (Array.isArray(data) && data.length && params) {

    const { groupArr, groupArrCN, keyArr, keyArrCN } = params;
    const len = groupArr.length;

    for (let i = 0; i < len; i++) {
      let obj = {
        title: groupArrCN[i],
        children: []
      };

      obj.children = keyArr.map(el => {
        return {
          title: keyArrCN[el],
          dataIndex: `${groupArr[i]}${el}`,
          key: `${groupArr[i]}${el}`,
          width: 100,
          render: getRealHtml
        }
      });

      columns.push(obj)
    }
  } else {
    data = []
  }

  return (
    <div>
      <h1 className={styles.title}>{title || '报表'}</h1>
      <Table
        rowKey={(record, index) => index}
        columns={columns}
        dataSource={data || []}
        loading={loading}
        bordered
        pagination={pagination}
        onChange={onChange}
        scroll={{ x: params && Number(params.width) || 1500, y: 500 }}
      />
    </div>
  )
}

FormLayout.propTypes = {
  location: PropTypes.object,
  pageData: PropTypes.object.isRequired
};

export default FormLayout;
