import React, { PropTypes } from 'react';
import { Select, Button, Form, DatePicker } from 'antd';
import { Link } from 'dva/router';
import styles from './index.less';
// import * as routerPath from '../../utils/routerPath';
// import moment from 'moment-timezone/moment-timezone';

// 推荐在入口文件全局设置 locale 与时区
// import 'moment/locale/zh-cn';
// moment.locale('zh-cn');

import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const Option = Select.Option;
const createForm = Form.create;
const FormItem = Form.Item;

const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;

const selectWidth = '150px';

function FormLayout(props) {
  console.log('FormLayout', props);

  const { menuKey, formSelects, dispatch } = props;
  const { loading } = props.chartPage;
  const { getFieldDecorator, getFieldsValue } = props.form;
  const menuTitle = menuKey.split('-')[0];
  const menuType = menuKey.split('-')[1];

  if (typeof formSelects !== 'object') {
    return ;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const valueObj = getFieldsValue();

    dispatch({
      type: 'chartPage/queryData',
      // type: 'formSelects/submit',
      payloadObj: valueObj,
      apiType: menuType === 'chart' ? 'chart' : 'table'
    });

  };

  const { monitor_point, time_interval, time_date, time_month, time_range, ...others } = formSelects;

  let dateItem = null;

  if (menuType === 'table') {
    monitor_point && (monitor_point.hide = 1)
  }

  time_interval && (time_interval.hide = 1);
  switch (menuTitle) {
    case 'shishi':
      formSelects.time_interval && (formSelects.time_interval.hide = 0);
      break;

    case 'ri':
      dateItem = <FormItem
        label={time_date.label}
      >
        {
          getFieldDecorator('time_data', {
            initialValue: moment(time_month.init, 'YYYY-MM-DD')
          })(
            <DatePicker />
          )
        }
      </FormItem>;
      break;

    case 'yue':
      dateItem = <FormItem
        label={time_month.label}
      >
        {
          getFieldDecorator('time_month', {
            initialValue: moment(time_month.init, 'YYYY-MM')
          })(
            <MonthPicker />
          )
        }
      </FormItem>;
      break;

    case 'lishi':
      dateItem = <FormItem
        label={time_range.label}
      >
        {
          getFieldDecorator('time_range', {
            initialValue: moment(time_range.init, 'YYYY-MM-DD')
          })(
            <RangePicker />
          )
        }
      </FormItem>;
      break;
  }

  const selects = {
    time_interval,
    monitor_point,
    ...others,
  };


  return (
    <Form inline onSubmit={handleSubmit}>
      {
        dateItem
      }
      {
        Object.keys(selects).map((key, index) => {
          const selectEl = selects[key];

          return selectEl.hide == 1 ?
            null :
            <FormItem
              label={selectEl.label}
              key={index}
            >
              {getFieldDecorator(key, {
                initialValue: selectEl.init
              })(
                <Select placeholder={`请选择${selectEl.lable}`} style={{width: selectWidth}}>
                  {
                    selectEl.data.map((el, i) => <Option key={i} value={el.value}>{el.title || el.value}</Option>)
                  }
                </Select>
              )}
            </FormItem>
        })
      }

      <Button type="primary" className={styles.opButton} htmlType="submit" loading={loading}>查询</Button>

      <div className={styles.opWrap}>
        <Button type="primary" className={styles.opButton} >导出Excel</Button>
        <Button type="primary" className={styles.opButton} >打印</Button>

        <Button type="primary" className={styles.opButton}>
          <Link to={`/${menuTitle}-${menuType === 'chart' ? 'table' : 'chart'}`}>
            {
              menuType === 'chart' ?
                '报表':
                '曲线'
            }
          </Link>
        </Button>
      </div>
    </Form>
  )
}

FormLayout.propTypes = {
  location: PropTypes.object,
  formSelects: PropTypes.object.isRequired,
  menuKey: PropTypes.string.isRequired,
};

FormLayout = createForm()(FormLayout);

export default FormLayout;
