import React, { PropTypes } from 'react';
import { Select, Button, Form } from 'antd';
import styles from './index.less';
import { Link } from 'dva/router';

const Option = Select.Option;
const createForm = Form.create;
const FormItem = Form.Item;

const selectWidth = '150px';
const inputKeys = {
  time_interval: {
    lable: '时间间隔',
    data: [
      {
        title: '5分钟',
        value: '300'
      },{
        title: '10分钟',
        value: '600'
      },
      {
        title: '30分钟',
        value: '1800'
      },
      {
        title: '1小时',
        value: '3600'
      },
      {
        title: '2小时',
        value: '7200'
      }
    ]
  },
  monitor_point: {
    lable: '检测点',
    data: [
      {
        title: '总览',
        value: 'all'
      },
      {
        title: 'A检测点',
        value: 'A'
      },
      {
        title: 'B检测点',
        value: 'B'
      },
      {
        title: 'C检测点',
        value: 'C'
      },
      {
        title: 'D检测点',
        value: 'D'
      },
    ]
  },
  data_info: {
    lable: '数据选项',
    data: [
      {
        title: '总览',
        value: 'all'
      },
      {
        title: '温度',
        value: 'template'
      },
      {
        title: '压力',
        value: 'pressure'
      },
      {
        title: '瞬时流量',
        value: 'flow'
      },
      {
        title: '累计流量',
        value: 'total_flow'
      },
    ]
  },
};

function FormLayout(props) {
  console.log('FormLayout', props);

  const { location, formSelects } = props;
  const { getFieldDecorator } = props.form;

  return (
    <Form inline>

      {
        Object.keys(formSelects).map((key, index) => {
          const selectEl = formSelects[key];

          return selectEl.hide == 1 ?
            null :
            <FormItem
              label={selectEl.lable}
              key={index}
            >
              {getFieldDecorator(key)(
                <Select placeholder={`请选择${selectEl.lable}`} style={{width: selectWidth}}>
                  {
                    selectEl.data.map((el, i) => <Option key={i} value={el.value}>{el.title || el.value}</Option>)
                  }
                </Select>
              )}
            </FormItem>
        })
      }

      <Button type="primary" htmlType="submit">查询</Button>
    </Form>
  )
}

FormLayout.propTypes = {
  location: PropTypes.object,
};

FormLayout = createForm()(FormLayout);

export default FormLayout;
