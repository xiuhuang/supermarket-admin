import { Button, Card, Form, Row, Col } from 'antd';
import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from './style.less';
import data from './data';

const FormItem = Form.Item;

interface BasicFormProps extends FormComponentProps {
  submitting: boolean;
  dispatch: Dispatch<any>;
  match: any;
}

class BasicForm extends Component<BasicFormProps> {
  state = {
    detailData: {
      key: 0,
      no: 'Q0000000001',
      sj: '2019-01-01 12:00:00',
      name: 'admin',
      phone: '13012345678',
      email: 'admin@123.net',
      account: 'admin',
      bumen: '部门1',
      rule: '管理员',
      status: 0,
      remark: '',
    },
  };

  componentDidMount() {
    const { params } = this.props.match;
    data.list.forEach((element: any) => {
      if (element.no === params.no) {
        this.setState({
          detailData: element,
        });
      }
    });
  }

  back = () => {
    window.history.back();
  };

  render() {
    const { detailData } = this.state;

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

    return (
      <PageHeaderWrapper>
        <Card bordered={false} className={styles.content}>
          <div className={styles.dtitle}>留言信息</div>
          <div className={styles.box}>
            <Row>
              <Col span={24}>
                <FormItem {...halfItemLayout} label="账户">
                  {detailData.account}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...halfItemLayout} label="姓名">
                  {detailData.name}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...halfItemLayout} label="部门">
                  {detailData.bumen}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...halfItemLayout} label="角色">
                  {detailData.rule}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...halfItemLayout} label="电话">
                  {detailData.phone}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...halfItemLayout} label="邮箱">
                  {detailData.email}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...halfItemLayout} label="状态">
                  {detailData.status ? '启用' : '停用'}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...halfItemLayout} label="备注">
                  {detailData.remark}
                </FormItem>
              </Col>
            </Row>
          </div>
          <div className={styles.bottom}>
            <div>
              <Button onClick={this.back}>返回</Button>
            </div>
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<BasicFormProps>()(BasicForm);
