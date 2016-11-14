import React, { PropTypes } from 'react';
import { Select, Button, Form, DatePicker } from 'antd';
import { Link } from 'dva/router';
import styles from './index.less';
import { pageParams } from '../../utils/pageParams';
import * as routerPath from '../../utils/routerPath';
// import downTable from '../../utils/downTable';
const qs = require('qs');

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
  const formatStr = 'YYYY/M/D';

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
    const { dispatch, menuKey, dispatchType, pageData } = this.props;
    const { station } = pageData;

    e && e.preventDefault();

    const valueObj = this.getFormData();

    dispatch({
      // type: 'chartPage/queryData',
      type: dispatchType,
      payloadObj: valueObj,
      menuKey,
      station
    });

  };

  downtable() {
    const valueObj = this.getFormData();
    const { dispatch, menuKey, dispatchType, pageData } = this.props;
    const { station } = pageData;

    var aElement = document.createElement("a");

    aElement.href = `${window.location.host}/api/getExcel?${qs.stringify({
      ...valueObj,
      station,
      type: menuKey && menuKey.split('-')[0]
    })}`;
    aElement.target = '_blank';
    aElement.download = "excel";
    document.body.appendChild(aElement);

    console.log('下载链接:',aElement.href);
    aElement.click();
  }

  onSelectChange (e) {
    const { dispatch, form, menuKey } = this.props;
    const { getFieldValue } = form;

    if (menuKey === routerPath.dealAlert || menuKey === routerPath.setSetting) {

      dispatch({
        type: 'formSelects/queryData',
        station: getFieldValue('station'),
      });
    }
  };

  getSelectItem(select, key) {
    const { getFieldDecorator } = this.props.form;

    return <FormItem
      label={select.label}
    >
      {getFieldDecorator(key, {
        initialValue: select.init
      })(
        <Select placeholder={`请选择${select.label}`} style={{width: selectWidth}} >
          {
            select.data.map((el, i) => <Option key={i} value={el.value}>{el.title || el.value}</Option>)
          }
        </Select>
      )}
    </FormItem>;
  }

  render() {

    console.log('FormLayout', this.props);

    const { menuKey, formSelects, pageData, form } = this.props;
    const { loading, tableData } = pageData;
    const { getFieldDecorator } = form;
    const menuTitle = menuKey.split('-')[0];
    const menuType = menuKey.split('-')[1];

    if (typeof formSelects !== 'object') {
      return ;
    }

    const { monitor_point, time_interval, time_lishi, time_date, time_month, time_range, station, unusual_value, data_info, alert_value } = formSelects;

    let dateItem = null;
    let dataInfoItem = null;
    let monitorItem = null;

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

    monitorItem = this.getSelectItem(monitor_point, 'monitor_point');

    let selects = null;

    switch (menuKey) {
      case routerPath.dealAlert:
        selects = {
          station,
          unusual_value,
          // alert_value,
        };
        break;

      case routerPath.setSetting:
        selects = {
          station,
        };
        break;

      default:
        selects = null;

        if (menuType === 'table') {
          monitorItem = null;
        }
        dataInfoItem = this.getSelectItem(data_info, 'data_info');
    }

    if (menuTitle === 'lishi') {
      selects = {
        time_lishi,
        ...selects
      }
    } else if (menuTitle === 'shishi') {
      selects = {
        time_interval,
        ...selects
      }
    }

    const selectInput = selects ? Object.keys(selects).map((key, index) => {
      const selectEl = selects[key];

      const selectProps = {
        placeholder: `请选择${selectEl.label}`,
        style: {width: selectWidth},
      };

      if (key === 'station') {
        selectProps.onBlur = this.onSelectChange.bind(this)
      }

      if (!selectEl) {
        return;
      }

      return (
        <FormItem
          label={selectEl.label}
          key={index}
        >
          {getFieldDecorator(key, {
            initialValue: selectEl.init
          })(
            <Select { ...selectProps } >
              {
                selectEl.data.map((el, i) => <Option key={i} value={el.value}>{el.title || el.value}</Option>)
              }
            </Select>
          )}
        </FormItem>
      )
    }) : null;


    return (
      <Form inline onSubmit={this.handleSubmit.bind(this)}>
        {
          dateItem
        }
        {
          selectInput
        }
        {
          monitorItem
        }
        {
          dataInfoItem
        }

        <Button type="primary" className={styles.opButton} htmlType="submit" loading={loading}>查询</Button>

        {
          menuKey === routerPath.dealAlert || menuKey === routerPath.setSetting ?
            null :
            <div className={styles.opWrap}>
              {
                menuType === 'table' ?
                  <Button type="primary" className={styles.opButton} onClick={this.downtable.bind(this)}>导出Excel</Button> :
                  null
              }
              <Button type="primary" className={styles.opButton} >打印</Button>

              <Button type="primary" className={styles.opButton}>
                <Link to={`/${menuTitle}-${menuType === 'chart' ? 'table' : 'chart'}?station=${pageData.station}`}>
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
