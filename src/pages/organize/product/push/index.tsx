import { Button, Card, Form, Icon, Input, Upload, Row, Col, message, Select } from 'antd';
import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import InfoData from './data';
import styles from './style.less';

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;
interface BasicFormProps extends FormComponentProps {
  submitting: boolean;
  dispatch: Dispatch<any>;
}

interface BasicFormState {
  isEdit: boolean;
}

class BasicForm extends Component<BasicFormProps, BasicFormState> {
  state = {
    isEdit: true,
  };

  handleSubmit = (e: React.FormEvent) => {
    const { form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);
        message.success('提交成功');
      }
    });
  };

  goback = () => {
    window.history.back();
  };

  render() {
    const { isEdit } = this.state;

    const {
      form: { getFieldDecorator },
    } = this.props;

    const halfItemLayout = {
      labelCol: {
        sm: {
          span: 4,
        },
      },
      wrapperCol: {
        sm: {
          span: 20,
        },
      },
    };
    const formItemLayout = {
      labelCol: {
        sm: {
          span: 8,
        },
      },
      wrapperCol: {
        sm: {
          span: 16,
        },
      },
    };

    const dom = InfoData.map(
      ({
        data,
        type,
        type1,
        type2,
      }: {
        data: string[];
        type: string;
        type1?: string;
        type2?: string;
      }): any => {
        if (type === 'input2') {
          return (
            <Row>
              <Col span={12}>
                <FormItem {...formItemLayout} label={data[0]}>
                  {type1 === 'select' ? (
                    <Select placeholder="请选择是否" style={{ width: '100%' }}>
                      <Option value="1">是</Option>
                      <Option value="0">否</Option>
                    </Select>
                  ) : (
                    <Input placeholder={`请输入${data[0]}`} />
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label={data[2]}>
                  {type2 === 'select' ? (
                    <Select placeholder="请选择是否" style={{ width: '100%' }}>
                      <Option value="1">是</Option>
                      <Option value="0">否</Option>
                    </Select>
                  ) : (
                    <Input placeholder={`请输入${data[2]}`} />
                  )}
                </FormItem>
              </Col>
            </Row>
          );
        }
        if (type === 'input') {
          return (
            <Row>
              <Col span={24}>
                <FormItem {...halfItemLayout} label={data[0]}>
                  {isEdit
                    ? getFieldDecorator(data[0])(<Input placeholder={`请输入${data[0]}`} />)
                    : data[1]}
                </FormItem>
              </Col>
            </Row>
          );
        }
        if (type === 'textarea') {
          return (
            <Row>
              <Col span={24}>
                <FormItem {...halfItemLayout} label={data[0]}>
                  {isEdit
                    ? getFieldDecorator(data[0])(
                        <TextArea
                          placeholder={`请输入${data[0]}`}
                          rows={4}
                          style={{ margin: '8px auto' }}
                        />,
                      )
                    : data[1]}
                </FormItem>
              </Col>
            </Row>
          );
        }
        return null;
      },
    );

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.box}>{dom}</div>
          <div className={styles.bottom}>
            {isEdit && (
              <div>
                <Button onClick={() => this.goback()}>返回</Button>{' '}
                <Button type="primary" onClick={this.handleSubmit}>
                  提交
                </Button>
              </div>
            )}
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<BasicFormProps>()(
  connect(({ loading }: { loading: { effects: { [key: string]: boolean } } }) => ({
    submitting: loading.effects['formBasicForm/submitRegularForm'],
  }))(BasicForm),
);
