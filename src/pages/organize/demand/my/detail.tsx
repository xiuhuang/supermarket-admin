import { Button, Card, Form, Icon, Input, Upload, Row, Col, message } from 'antd';
import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
// import adata from './data';
import cdata from './cdata';
import styles from './style.less';

const FormItem = Form.Item;
const { TextArea } = Input;
interface BasicFormProps extends FormComponentProps {
  submitting: boolean;
  dispatch: Dispatch<any>;
}

interface BasicFormState {
  isEdit: boolean;
  // detailData: any;
}

class BasicForm extends Component<BasicFormProps, BasicFormState> {
  state = {
    isEdit: false,
    // detailData: {
    //   key: 0,
    //   no: 'CP201900000001',
    //   qy: '上海高重信息科技有限公司',
    //   cp: '快易贷',
    //   jr: '100.00000',
    //   fw: '4%-8%',
    //   qx: '3个月',
    //   sj: '2019-01-01 12:00:00',
    //   status: 0,
    // },
  };

  componentDidMount() {
    // const { params } = this.props.match;
    // console.log(this.props);
    // adata.list.forEach((element: any) => {
    //   if (element.no === params.no) {
    //     this.setState({
    //       detailData: element,
    //     });
    //   }
    // });
  }

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

  back = () => {
    window.history.back();
  };

  changeEdit = (type: boolean) => {
    this.setState(state => ({
      isEdit: type || !state.isEdit,
    }));
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

    const dom = cdata.map(({ data, type }: { data: string[]; type: string }): any => {
      if (type === 'input2') {
        return (
          <Row key={data[0]}>
            <Col span={12}>
              <FormItem {...formItemLayout} label={data[0]}>
                {isEdit
                  ? getFieldDecorator(data[0], {
                      initialValue: data[1],
                    })(<Input />)
                  : data[1]}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem {...formItemLayout} label={data[2]}>
                {isEdit
                  ? getFieldDecorator(data[2], {
                      initialValue: data[3],
                    })(<Input />)
                  : data[3]}
              </FormItem>
            </Col>
          </Row>
        );
      }
      if (type === 'input') {
        return (
          <Row key={data[0]}>
            <Col span={24}>
              <FormItem {...halfItemLayout} label={data[0]}>
                {isEdit
                  ? getFieldDecorator(data[0], {
                      initialValue: data[1],
                    })(<Input />)
                  : data[1]}
              </FormItem>
            </Col>
          </Row>
        );
      }
      if (type === 'textarea') {
        return (
          <Row key={data[0]}>
            <Col span={24}>
              <FormItem {...halfItemLayout} label={data[0]}>
                {isEdit
                  ? getFieldDecorator(data[0], {
                      initialValue: data[1],
                    })(<TextArea rows={4} />)
                  : data[1]}
              </FormItem>
            </Col>
          </Row>
        );
      }
      return null;
    });

    return (
      <PageHeaderWrapper>
        <Card bordered={false} className={styles.content}>
          <div className={styles.dtitle}>需求详情</div>
          <div className={styles.box}>{dom}</div>
          <div className={styles.dtitle}>企业信用</div>
          <div className={`${styles.box} ${styles.xinyong}`}>
            <Row align="middle">
              <Col span={5} className="x-item" style={{ background: '#110c45', color: 'white' }}>
                信用等级
              </Col>
              <Col span={19}>
                <Row>
                  <Col
                    span={6}
                    className="x-item"
                    style={{ background: '#110c45', color: 'white' }}
                  >
                    极高风险
                  </Col>
                  <Col
                    span={6}
                    className="x-item"
                    style={{ background: '#a00b0b', color: 'white' }}
                  >
                    高风险
                  </Col>
                  <Col
                    span={6}
                    className="x-item"
                    style={{ background: '#53a706', color: 'white' }}
                  >
                    中风险
                  </Col>
                  <Col
                    span={6}
                    className="x-item"
                    style={{ background: '#017943', color: 'white' }}
                  >
                    低风险
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col span={5} className="x-item colonm2">
                信用评分
              </Col>
              <Col span={19}>
                <Row>
                  <Col span={6} className="x-item">
                    300-400
                  </Col>
                  <Col span={6} className="x-item">
                    400-500
                  </Col>
                  <Col span={6} className="x-item">
                    500-700
                  </Col>
                  <Col span={6} className="x-item">
                    700-1000
                  </Col>
                </Row>
                <Row>
                  <Col span={12} className="x-item x-bold" style={{ color: 'red' }}>
                    拒绝
                  </Col>
                  <Col span={6} className="x-item x-bold" style={{ color: '#2db7f5' }}>
                    复议
                  </Col>
                  <Col span={6} className="x-item x-bold" style={{ color: 'green' }}>
                    通过
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
          <div className={styles.box}>
            <Row>
              <Col span={24}>
                <FormItem {...halfItemLayout} label="建议策略" style={{ color: '#2db7f5' }}>
                  复议
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...halfItemLayout} label="企业规则验证结果">
                  命中3条风险
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...halfItemLayout} label="法人规则验证结果">
                  命中0条风险
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...halfItemLayout} label="法人规则验证结果" style={{ color: '#2db7f5' }}>
                  689.91分
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

export default Form.create<BasicFormProps>()(
  connect(({ loading }: { loading: { effects: { [key: string]: boolean } } }) => ({
    submitting: loading.effects['formBasicForm/submitRegularForm'],
  }))(BasicForm),
);
