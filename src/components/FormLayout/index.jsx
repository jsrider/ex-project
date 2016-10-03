import React, { PropTypes } from 'react';
import { Select, Button, Form, DatePicker } from 'antd';
import { Link } from 'dva/router';
import styles from './index.less';
// import * as routerPath from '../../utils/routerPath';

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

  const { monitor_point, time_interval } = formSelects;

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
        label="日期"
      >
        <DatePicker />
      </FormItem>;
      break;

    case 'yue':
      dateItem = <FormItem
        label="月份"
      >
        <MonthPicker />
      </FormItem>;
      break;

    case 'lishi':
      dateItem = <FormItem
        label="日期区间"
      >
        <RangePicker />
      </FormItem>;
      break;
  }


  return (
    <Form inline onSubmit={handleSubmit}>
      {
        dateItem
      }
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
