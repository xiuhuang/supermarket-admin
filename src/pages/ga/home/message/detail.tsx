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
      name: '王大宝',
      phone: '13012345678',
      email: 'question@grandhonor.net',
      title: '征信授权书',
      content: '请问平台的授权证书模板可以在那里下载？',
      status: 0,
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
                <FormItem {...halfItemLayout} label="留言编号">
                  {detailData.no}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...halfItemLayout} label="提交时间">
                  {detailData.sj}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...halfItemLayout} label="联系人">
                  {detailData.name}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...halfItemLayout} label="联系电话">
                  {detailData.phone}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...halfItemLayout} label="联系邮箱">
                  {detailData.email}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...halfItemLayout} label="留言主题">
                  {detailData.title}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...halfItemLayout} label="问题描述">
                  {detailData.content}
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
