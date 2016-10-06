/**
 * @name form 表单弹出层
 * @author weishao
 * @date 2016-10-6
 **/
import React, { PropTypes } from 'react';
import { Modal, Input, Button, Form, Select, Radio } from 'antd';
import QueueAnim from 'rc-queue-anim';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

const formItemLayoutDefault = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
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
        return;
      }

      // debugger;
      props.handleOk({
        ...props.options,
        ...values
      }).then(() => {
        this.setState({
          confirmLoading: false,
        });
      })
    });
  }

  render() {
    const props = this.props;
    const state = this.state;
    const { options, visible, handleCancel, title, disableKeys, modifySetting, elementsFields } = props;
    const { getFieldDecorator } = props.form;
    console.log('ModalForm: ', this.props, this.state);

    return (
      <div>
        <Modal title={title || "对话框"}
               visible={visible}
               onOk={this.handleOk.bind(this)}
               confirmLoading={state.confirmLoading}
               onCancel={handleCancel}
        >
          <QueueAnim component={Form} horizontal type="bottom">
            {
              visible ?
                elementsFields.map((key, idx) => {
                  // if (Array.isArray(hiddenKeys) && hiddenKeys.includes(key)) {
                  //   return <Input key={idx} type="hidden"  />
                  // }
                  let children;
                  const { modifyType, modifyValue, modifyText, title, disabled } = modifySetting[key] || {};


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

                      default:
                        children = <Input disabled={disabled == 1} />;
                    }
                  }

                  return (
                    <FormItem
                      {...formItemLayoutDefault}
                      label={title || key}
                      key={idx}
                    >
                      {
                        getFieldDecorator(key, {initialValue: options[key]})(children)
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
