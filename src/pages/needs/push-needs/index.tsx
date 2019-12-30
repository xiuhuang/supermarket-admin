import { Button, Card, Form, Input, Row, Col, InputNumber } from 'antd';
import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import styles from './style.less';

const nzhcn = require('nzh/cn');

const FormItem = Form.Item;
const { TextArea } = Input;
interface BasicFormProps extends FormComponentProps {
  submitting: boolean;
  dispatch: Dispatch<any>;
}

class BasicForm extends Component<BasicFormProps> {
  state = {
    money: '',
  };

  handleSubmit = (e: React.FormEvent) => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'formBasicForm/submitRegularForm',
          payload: values,
        });
      }
    });
  };

  changeMoney = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      money: event.target.value,
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { money } = this.state;

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

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.box}>
            <Row>
              <Col span={12}>
                <FormItem {...formItemLayout} label="企业名称">
                  上海高重信息科技有限公司
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label="统一社会信用代码">
                  913101103246443123
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem {...formItemLayout} label="登记机关">
                  普陀区市场监管局
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label="所属地区">
                  上海市
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem {...formItemLayout} label="贷款金额（万元）" required>
                  {getFieldDecorator('money')(<Input onChange={this.changeMoney} />)}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label="金额大写">
                  {nzhcn.encodeB(money)}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem {...formItemLayout} label="利率范围" required>
                  <div
                    style={{
                      display: 'inline-block',
                      width: 'calc(50% - 12px)',
                    }}
                  >
                    <InputNumber style={{ width: '100%' }} />
                  </div>
                  <span
                    style={{
                      display: 'inline-block',
                      width: '24px',
                      textAlign: 'center',
                    }}
                  >
                    -
                  </span>
                  <div
                    style={{
                      display: 'inline-block',
                      width: 'calc(50% - 12px)',
                    }}
                  >
                    <InputNumber style={{ width: '100%' }} />
                  </div>
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label="贷款期限" required>
                  {getFieldDecorator('title')(<Input />)}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem {...formItemLayout} label="担保方式">
                  <Input />
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label="贷款用途" required>
                  {getFieldDecorator('yt')(<Input />)}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...halfItemLayout} label="指定机构">
                  {getFieldDecorator('jg')(
                    <Input
                      style={{
                        display: 'inline-block',
                        width: 'calc(100% - 140px)',
                      }}
                    />,
                  )}
                  <div
                    style={{
                      display: 'inline-block',
                      width: '140px',
                      textAlign: 'center',
                    }}
                  >
                    <Button type="primary" ghost icon="search">
                      查询机构
                    </Button>
                  </div>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...halfItemLayout} label="项目情况">
                  {getFieldDecorator('qk')(
                    <TextArea
                      rows={3}
                      style={{
                        margin: '6px auto',
                      }}
                    />,
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...halfItemLayout} label="备注">
                  {getFieldDecorator('resk')(
                    <TextArea
                      rows={3}
                      style={{
                        margin: '6px auto',
                      }}
                    />,
                  )}
                </FormItem>
              </Col>
            </Row>
          </div>
          <div className={styles.bottom}>
            <Button>返回</Button>
            <Button type="primary">提交</Button>
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
