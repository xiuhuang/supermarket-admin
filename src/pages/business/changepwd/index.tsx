import { Button, Card, Form, Row, Col, Input } from 'antd';
import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from './style.less';

const FormItem = Form.Item;
let timer: any;

interface BasicFormProps extends FormComponentProps {
  submitting: boolean;
  dispatch: Dispatch<any>;
  match: any;
}

class BasicForm extends Component<BasicFormProps> {
  state = {
    codetext: '获取验证码',
  };

  componentDidMount() {}

  componentWillUnmount() {
    clearInterval(timer);
    timer = null;
  }

  back = () => {
    window.history.back();
  };

  getCode = () => {
    clearInterval(timer);
    timer = null;
    let number = 60;
    this.setState({
      codetext: number,
    });
    timer = setInterval(() => {
      number -= 1;
      this.setState({
        codetext: number,
      });
      if (number <= 0) {
        clearInterval(timer);
        this.setState({
          codetext: '获取验证码',
        });
      }
    }, 1000);
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { codetext } = this.state;

    const halfItemLayout = {
      labelCol: {
        sm: {
          span: 6,
        },
      },
      wrapperCol: {
        sm: {
          span: 18,
        },
      },
    };

    return (
      <PageHeaderWrapper>
        <Card bordered={false} className={styles.content}>
          <div className={styles.dtitle}>修改密码</div>
          <div className={styles.box}>
            <Row>
              <Col span={24}>
                <FormItem {...halfItemLayout} label="企业名称">
                  上海高重信息科技有限公司
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...halfItemLayout} label="登录用户名">
                  913101103246443123
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...halfItemLayout} label="联系电话">
                  13812345678
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...halfItemLayout} label="原始密码" required>
                  {getFieldDecorator('password')(<Input style={{ width: '100%' }} />)}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...halfItemLayout} label="新密码" required>
                  {getFieldDecorator('newpassword')(<Input style={{ width: '100%' }} />)}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...halfItemLayout} label="确认密码" required>
                  {getFieldDecorator('compassword')(<Input style={{ width: '100%' }} />)}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24} className={styles.code}>
                <FormItem {...halfItemLayout} label="动态验证码" required>
                  {getFieldDecorator('code')(<Input />)}
                  <Button
                    type="primary"
                    onClick={this.getCode}
                    disabled={codetext !== '获取验证码'}
                  >
                    {codetext}
                  </Button>
                </FormItem>
              </Col>
            </Row>
          </div>
          <div className={styles.bottom}>
            <div>
              <Button onClick={this.back}>取消</Button>
              <Button type="primary">提交</Button>
            </div>
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<BasicFormProps>()(BasicForm);
