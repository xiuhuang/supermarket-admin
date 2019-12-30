import { Button, Card, Form, Row, Col, message } from 'antd';
import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import TextArea from 'antd/lib/input/TextArea';
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
    type: 'd',
    detailData: {
      key: 0,
      no: 'DK000000000',
      qy: '上海高重信息科技有限公司',
      sj: '2019-01-01 12:00:00',
      name: '快易贷',
      jg: '江苏银行',
      content: '这是一段描述',
      status: 0,
    },
  };

  componentDidMount() {
    const { params } = this.props.match;
    const { query } = this.props.location;
    console.log(this.props);
    data.list.forEach((element: any) => {
      if (element.no === params.no) {
        this.setState({
          detailData: element,
          type: query.t,
        });
      }
    });
  }

  back = () => {
    window.history.back();
  };

  submitBtn = () => {
    message.success('提交成功');
    window.history.back();
  };

  render() {
    const { detailData, type } = this.state;

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
          <div className={styles.dtitle}>投诉详情</div>
          <div className={styles.box}>
            <Row>
              <Col span={24}>
                <FormItem {...halfItemLayout} label="投诉编号">
                  {detailData.no}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...halfItemLayout} label="投诉企业">
                  {detailData.qy}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...halfItemLayout} label="投诉企业账号">
                  913101103246443123
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...halfItemLayout} label="投诉企业联系人">
                  {detailData.qy}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...halfItemLayout} label="投诉企业联系人电话">
                  13812345678
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...halfItemLayout} label="投诉时间">
                  {detailData.sj}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...halfItemLayout} label="被投诉机构">
                  {detailData.jg}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...halfItemLayout} label="被投诉产品">
                  {detailData.name}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...halfItemLayout} label="投诉内容">
                  {detailData.content}
                </FormItem>
              </Col>
            </Row>
          </div>
          <div className={styles.dtitle}>处理详情</div>
          <div className={styles.box}>
            <Row>
              <Col span={24}>
                <FormItem {...halfItemLayout} label="处理时间">
                  2019-07-24 12:00:00
                </FormItem>
              </Col>
            </Row>
            {type === 'e' ? (
              <Row>
                <Col span={24}>
                  <FormItem {...halfItemLayout} label="回复内容">
                    <TextArea rows={3} style={{ margin: '10px 0' }} />
                  </FormItem>
                </Col>
              </Row>
            ) : (
              <Row>
                <Col span={24}>
                  <FormItem {...halfItemLayout} label="反馈内容">
                    这是反馈意见
                  </FormItem>
                </Col>
              </Row>
            )}
          </div>
          <div className={styles.bottom}>
            <div>
              <Button onClick={this.back}>返回</Button>
              {type === 'e' && (
                <Button type="primary" onClick={this.submitBtn}>
                  提交
                </Button>
              )}
            </div>
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<BasicFormProps>()(BasicForm);
