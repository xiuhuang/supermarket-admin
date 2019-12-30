import { Button, Card, Form, Input, Row, Col, message } from 'antd';
import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import ListData from './data';
import styles from './style.less';

const FormItem = Form.Item;
const { TextArea } = Input;
interface BasicFormProps extends FormComponentProps {
  submitting: boolean;
  dispatch: Dispatch<any>;
}

class BasicForm extends Component<BasicFormProps> {
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

  render() {
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

    const dom = ListData.map(({ data, type }: { data: string[]; type: string }): any => {
      if (type === 'label') {
        return (
          <Row>
            <Col span={24}>
              <FormItem {...halfItemLayout} label={data[0]}>
                {data[1]}
              </FormItem>
            </Col>
          </Row>
        );
      }
      if (type === 'search') {
        return (
          <Row>
            <Col span={24}>
              <FormItem {...halfItemLayout} label={data[0]}>
                {getFieldDecorator(data[0], {
                  initialValue: data[1],
                })(
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
                    {data[2]}
                  </Button>
                </div>
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
                {getFieldDecorator(data[0], {
                  initialValue: data[1],
                })(<TextArea rows={4} />)}
              </FormItem>
            </Col>
          </Row>
        );
      }
      return null;
    });

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.box}>{dom}</div>
          <div className={styles.bottom}>
            <div>
              <Button type="primary" onClick={this.handleSubmit}>
                提交
              </Button>
            </div>
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
