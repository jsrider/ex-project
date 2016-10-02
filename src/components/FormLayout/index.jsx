import React, { PropTypes } from 'react';
import { Select, Button, Form } from 'antd';
import styles from './index.less';
import { Link } from 'dva/router';

const Option = Select.Option;
const createForm = Form.create;
const FormItem = Form.Item;

const selectWidth = '150px';

function FormLayout(props) {
  console.log('FormLayout', props);

  const { location, formSelects, dispatch } = props;
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

  return (
    <Form inline onSubmit={handleSubmit}>

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
