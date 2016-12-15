/**
 * @name form 表单弹出层
 * @author weishao
 * @date 2016-10-6
 **/
import React, { PropTypes } from 'react';
import { Modal, Input, Button, Form, Select, Radio, message, InputNumber, DatePicker } from 'antd';
import QueueAnim from 'rc-queue-anim';
import moment from 'moment';

const dateFormat = 'YYYY/MM/DD';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

const formItemLayoutDefault = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};
const validateStatusObj = {
  error: 'error',
  success: 'success',
  warning: 'warning',
  validating: 'validating'
};

const requiredValidate = (rule, value, callback) => {
  value = String(value).trim();

  if (!value || value === 'undefined') {
    callback(rule.message);
  }
  callback()
};

class ModalForm extends React.Component {
  static propTypes = {
    options: PropTypes.object,
    title: PropTypes.string,
    visible: PropTypes.bool,
    handleOk: PropTypes.func,
    handleCancel: PropTypes.func,
    disableKeys: PropTypes.array,
    hiddenKeys: PropTypes.array,
    elementsFields: PropTypes.array,
    modifySetting: PropTypes.object,
  };

  constructor() {
    super();

    this.state = {
      confirmLoading: false,
    }
  }

  handleOk() {
    const props = this.props;

    this.setState({
      confirmLoading: true,
    });

    props.form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        this.setState({
          confirmLoading: false,
        });

        return message.error('请检查表单再提交!');
      }

      // debugger;
      props.handleOk({
        ...props.options,
        ...values
      });

      setTimeout(() => {
        this.setState({
          confirmLoading: false,
        });
      }, 3000)
    });
  }

  render() {
    const props = this.props;
    const state = this.state;
    const { options, visible, handleCancel, title, disableKeys, modifySetting, elementsFields, cancel, width, children } = props;
    const { getFieldDecorator, getFieldError } = props.form;
    console.log('ModalForm: ', this.props, this.state);

    const modalProps = {
      visible,
      width,
    };

    if (cancel === false) {
      modalProps.footer = <Button type="primary" onClick={this.handleOk.bind(this)}>
        确定
      </Button>;
      modalProps.closable = false;
    }
    return (
      <div>
        <Modal title={title || "对话框"}
               onOk={this.handleOk.bind(this)}
               confirmLoading={state.confirmLoading}
               onCancel={handleCancel}
               { ...modalProps }
        >
          {children}
          <QueueAnim component={Form} horizontal type="bottom">
            {
              visible ?
                elementsFields.map((key, idx) => {
                  // if (Array.isArray(hiddenKeys) && hiddenKeys.includes(key)) {
                  //   return <Input key={idx} type="hidden"  />
                  // }
                  let children;
                  const { modifyType, modifyValue, modifyText, title, disabled, required } = modifySetting[key] || {};

                  const isRequired = typeof required === 'string' ? required === 'true' : !!required;


                  if (Array.isArray(disableKeys) && disableKeys.includes(key)) {
                    children = <Input key={idx} disabled={true}  />
                  } else {
                    switch (modifyType) {
                      case 'radio':
                        children = <RadioGroup >
                          {
                            modifyValue && modifyValue.split(',').map((el, i) =>
                              <Radio value={el} key={i}>{modifyText && modifyText.split(',')[i] || el}</Radio>
                            )
                          }
                        </RadioGroup>;
                        break;

                      case 'select':
                        children = <Select >
                          {
                            modifyValue && modifyValue.split(',').map((el, i) =>
                              <Option value={el} key={i}>{modifyText && modifyText.split(',')[i] || el}</Option>
                            )
                          }
                        </Select>;
                        break;

                      case 'password':
                        children = <Input type="password" />;
                        break;

                      case 'textarea':
                        children = <Input type="textarea" rows="3" />;
                        break;

                      case 'number':
                        children = <InputNumber />;
                        break;

                      case 'date':
                        children = <DatePicker format={dateFormat} />;
                        break;

                      default:
                        children = <Input disabled={disabled == 1} />;
                    }
                  }

                  return (
                    <FormItem
                      {...formItemLayoutDefault}
                      label={title || key}
                      key={idx}
                      required={isRequired}
                      validateStatus={getFieldError(key) ? validateStatusObj.error : ''}
                      help={(getFieldError(key) || []).join(', ')}
                    >
                      {
                        getFieldDecorator(key, {
                          initialValue: modifyType === 'date' ? moment(options[key], dateFormat): options[key],
                          rules: isRequired ? [
                            { validator: requiredValidate, message: '不能为空哦!', type: modifyType === 'date' ? 'object' : '' },
                          ] : [],
                        })(children)
                      }
                    </FormItem>
                  )
                }) :
                null
            }
          </QueueAnim>
        </Modal>
      </div>
    );
  }
}

ModalForm = Form.create()(ModalForm);
export default ModalForm;
