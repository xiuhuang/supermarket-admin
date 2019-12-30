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
      star: 5,
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

    const starDom = [];
    for (let i = 0; i < 5; i += 1) {
      if (detailData.star > i && detailData.star < i + 1) {
        starDom.push(<img key={i} src="/images/half_star.png" alt="" />);
      } else if (detailData.star > i) {
        starDom.push(<img key={i} src="/images/selected_star.png" alt="" />);
      } else {
        starDom.push(<img key={i} src="/images/star.png" alt="" />);
      }
    }

    return (
      <PageHeaderWrapper>
        <Card bordered={false} className={styles.content}>
          <div className={styles.dtitle}>我的评价详情</div>
          <div className={styles.box}>
            <Row>
              <Col span={24}>
                <FormItem {...halfItemLayout} label="交易编号">
                  {detailData.no}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...halfItemLayout} label="交易时间">
                  {detailData.sj}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...halfItemLayout} label="机构名称">
                  {detailData.jg}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...halfItemLayout} label="金融产品名">
                  {detailData.name}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...halfItemLayout} label="评分">
                  {starDom}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...halfItemLayout} label="评价内容">
                  {detailData.content}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...halfItemLayout} label="回复内容">
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
