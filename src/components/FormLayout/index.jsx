import React, { PropTypes } from 'react';
import { Select, Button, Form, DatePicker } from 'antd';
import { Link } from 'dva/router';
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const valueObj = getFieldsValue();

    dispatch({
      type: 'chartPage/queryData',
      // type: 'formSelects/submit',
      payloadObj: valueObj
    });

  };

  let dateItem = null;

  formSelects.time_interval.hide = 1;
  switch (menuKey.split('-')[0]) {
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

      <Button type="primary" htmlType="submit" loading={loading}>查询</Button>
    </Form>
  )
}

FormLayout.propTypes = {
  location: PropTypes.object,
};

FormLayout = createForm()(FormLayout);

export default FormLayout;
