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
      no: 'DK000000000',
      sj: '2019-01-01 12:00:00',
      name: '快易贷',
      jg: '江苏银行',
      content: '这是一段描述',
      status: 0,
    },
  };

  componentDidMount() {
    const { params } = this.props.match;
    console.log(this.props);
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
                <FormItem {...halfItemLayout} label="投诉时间">
                  {detailData.sj}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...halfItemLayout} label="投诉机构">
                  {detailData.jg}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...halfItemLayout} label="投诉产品">
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
            <Row>
              <Col span={24}>
                <FormItem {...halfItemLayout} label="反馈内容">
                  这是反馈意见
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
