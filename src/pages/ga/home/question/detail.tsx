import { Button, Card, Form, Row, Col, Input } from 'antd';
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
    isEdit: false,
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

  changeEdit = (isEdit: boolean) => {
    this.setState({
      isEdit,
    });
  };

  render() {
    const { detailData, isEdit } = this.state;
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

    return (
      <PageHeaderWrapper>
        <Card bordered={false} className={styles.content}>
          <div className={styles.dtitle}>问题信息</div>
          <div className={styles.box}>
            <Row>
              <Col span={24}>
                <FormItem {...halfItemLayout} label="问题编号">
                  {detailData.no}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...halfItemLayout} label="发布时间">
                  {detailData.sj}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...halfItemLayout} label="问题">
                  {isEdit
                    ? getFieldDecorator('name', {
                        initialValue: detailData.name,
                      })(<TextArea rows={3} style={{ margin: '10px 0' }}></TextArea>)
                    : detailData.name}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...halfItemLayout} label="回答">
                  {isEdit
                    ? getFieldDecorator('hd', {
                        initialValue: detailData.hd,
                      })(<TextArea rows={3} style={{ margin: '10px 0' }}></TextArea>)
                    : detailData.hd}
                </FormItem>
              </Col>
            </Row>
          </div>
          {isEdit && (
            <div className={styles.bottom}>
              <div>
                <Button onClick={() => this.changeEdit(false)}>取消</Button>
                <Button type="primary" onClick={() => this.changeEdit(false)}>
                  提交
                </Button>
              </div>
            </div>
          )}
          {!isEdit && (
            <div className={styles.bottom}>
              <div>
                <Button onClick={this.back}>返回</Button>
                <Button onClick={this.changeEdit}>编辑</Button>
              </div>
            </div>
          )}
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<BasicFormProps>()(BasicForm);
