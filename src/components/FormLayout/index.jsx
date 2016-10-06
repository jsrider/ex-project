import React, { PropTypes } from 'react';
import { Select, Button, Form, DatePicker } from 'antd';
import { Link } from 'dva/router';
import styles from './index.less';
import { pageParams } from '../../utils/pageParams';
import * as routerPath from '../../utils/routerPath';
import downTable from '../../utils/downTable';

import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const Option = Select.Option;
const createForm = Form.create;
const FormItem = Form.Item;

const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;

const selectWidth = '150px';

const formatValue = (val) => {
  const formatStr = 'YYYY/MM/DD';

  if (Array.isArray(val)) {
    return val.map(el => el.format(formatStr)).join(',')
  } else if (typeof val.format === 'function') {
    return val.format(formatStr);
  } else {
    return val;
  }
};

class FormLayout extends React.Component {
  // componentDidMount() {
  //   this.handleSubmit()
  // }
  //
  // componentWillReceiveProps() {
  //   const { pageData } = this.props;
  //
  //   pageData.init || (!pageData.loading && this.handleSubmit())
  // }

  getFormData() {
    const { form } = this.props;
    const { getFieldsValue } = form;

    const valueObj = getFieldsValue();

    for (let key in valueObj) {
      if (valueObj.hasOwnProperty(key)) {
        valueObj[key] = formatValue(valueObj[key])
      }
    }

    pageParams.addQueryParams(valueObj);

    return valueObj
  }

  handleSubmit (e) {
    const { dispatch, menuKey, dispatchType } = this.props;

    e && e.preventDefault();

    const valueObj = this.getFormData();

    dispatch({
      // type: 'chartPage/queryData',
      type: dispatchType,
      payloadObj: valueObj,
      menuKey,
    });

  };

  render() {

    console.log('FormLayout', this.props);

    const { menuKey, formSelects, pageData, form } = this.props;
    const { loading, station, tableData } = pageData;
    const { getFieldDecorator } = form;
    const menuTitle = menuKey.split('-')[0];
    const menuType = menuKey.split('-')[1];

    if (typeof formSelects !== 'object') {
      return ;
    }

    const { monitor_point, time_interval, time_date, time_month, time_range, station_point, unusual_value, data_info, tolerance_value } = formSelects;

    let dateItem = null;

    if (menuType === 'table') {
      monitor_point && (monitor_point.hide = 1)
    }

    let format = 'YYYY-MM-DD';

    // 根据不同的 类型 显示对应控件
    switch (menuKey) {
      case `ri-${menuType}`:
        dateItem = <FormItem
          label={time_date.label}
        >
          {
            getFieldDecorator('time_data', {
              initialValue: moment(time_month.init, format)
            })(
              <DatePicker format={format} />
            )
          }
        </FormItem>;
        break;

      case `yue-${menuType}`:
        format = 'YYYY-MM';

        dateItem = <FormItem
          label={time_month.label}
        >
          {
            getFieldDecorator('time_month', {
              initialValue: moment(time_month.init, format)
            })(
              <MonthPicker format={format} />
            )
          }
        </FormItem>;
        break;

    }

    if (menuKey === `lishi-${menuType}` || menuKey === routerPath.dealAlert) {
      dateItem = <FormItem
        label={time_range.label}
      >
        {
          getFieldDecorator('time_range', {
            initialValue: time_range.init.split(',').map(el => moment(el, format))
          })(
            <RangePicker format={format} />
          )
        }
      </FormItem>
    }

    let selects = null;

    switch (menuKey) {
      case routerPath.dealAlert:
        selects = {
          station_point,
          monitor_point,
          unusual_value,
        };
        break;

      case routerPath.setSetting:
        selects = {
          station_point,
          monitor_point,
        };
        break;

      default:
        selects = {
          monitor_point,
          data_info
        }
    }

    if (menuTitle === 'ri' || menuTitle === 'yue') {
      selects = {
        tolerance_value,
        ...selects
      }
    } else if (menuTitle === 'lishi' || menuTitle === 'shishi') {
      selects = {
        time_interval,
        ...selects
      }
    }

    return (
      <Form inline onSubmit={this.handleSubmit.bind(this)}>
        {
          dateItem
        }
        {
          Object.keys(selects).map((key, index) => {
            const selectEl = selects[key];

            if (!selectEl) {
              return;
            }

            return selectEl.hide == 1 ?
              null :
              <FormItem
                label={selectEl.label}
                key={index}
              >
                {getFieldDecorator(key, {
                  initialValue: selectEl.init
                })(
                  <Select placeholder={`请选择${selectEl.label}`} style={{width: selectWidth}}>
                    {
                      selectEl.data.map((el, i) => <Option key={i} value={el.value}>{el.title || el.value}</Option>)
                    }
                  </Select>
                )}
              </FormItem>
          })
        }

        <Button type="primary" className={styles.opButton} htmlType="submit" loading={loading}>查询</Button>

        {
          menuKey === routerPath.dealAlert || menuKey === routerPath.setSetting ?
            null :
            <div className={styles.opWrap}>
              {
                menuType === 'table' ?
                  <Button type="primary" className={styles.opButton} onClick={downTable.bind(this, tableData)} >导出Excel</Button> :
                  null
              }
              <Button type="primary" className={styles.opButton} >打印</Button>

              <Button type="primary" className={styles.opButton}>
                <Link to={`/${menuTitle}-${menuType === 'chart' ? 'table' : 'chart'}?station=${station}`}>
                  {
                    menuType === 'chart' ?
                      '报表':
                      '曲线'
                  }
                </Link>
              </Button>
            </div>
        }
      </Form>
    )
  }
}

FormLayout.propTypes = {
  location: PropTypes.object,
  formSelects: PropTypes.object.isRequired,
  menuKey: PropTypes.string.isRequired,
};

FormLayout = createForm()(FormLayout);

export default FormLayout;
