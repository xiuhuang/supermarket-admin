import { Button, Card, Form, Icon, Input, Upload, Row, Col, message } from 'antd';
import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import InfoData from './cdata';
import styles from './style.less';

const nzhcn = require('nzh/cn');

const FormItem = Form.Item;
const { TextArea } = Input;
interface BasicFormProps extends FormComponentProps {
  submitting: boolean;
  dispatch: Dispatch<any>;
}

interface BasicFormState {
  isEdit: boolean;
  fileList1: any[];
  fileList2: any[];
  fileList3: any[];
}

class BasicForm extends Component<BasicFormProps, BasicFormState> {
  state = {
    isEdit: false,
    fileList1: [{ name: '' }],
    fileList2: [{ name: '' }],
    fileList3: [{ name: '' }],
  };

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
    const { isEdit, fileList1, fileList2, fileList3 } = this.state;

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

    const dom = InfoData.map(({ data, type }: { data: string[]; type: string }): any => {
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

    const props = {
      beforeUpload: (file: any) => {
        this.setState(state => ({
          fileList1: [...state.fileList1, file],
        }));
        return false;
      },
      showUploadList: false,
    };

    const props2 = {
      beforeUpload: (file: any) => {
        this.setState(state => ({
          fileList2: [...state.fileList2, file],
        }));
        return false;
      },
      showUploadList: false,
    };

    const props3 = {
      beforeUpload: (file: any) => {
        this.setState(state => ({
          fileList3: [...state.fileList3, file],
        }));
        return false;
      },
      showUploadList: false,
    };

    const cwdata = [
      { title: '资产总额（万元）', d1: '111', d2: '22234', d3: '33123' },
      { title: '负债总额（万元）', d1: '312', d2: '42', d3: '444' },
      { title: '所有者权益（万元）', d1: '123', d2: '1123', d3: '223' },
      { title: '销售收入（万元）', d1: '4123', d2: '324', d3: '123' },
      { title: '净利润总额（万元）', d1: '412', d2: '4123', d3: '4321' },
    ];
    const csDom = cwdata.map(item => (
      <>
        <Row className="b-item" key={item.title}>
          <Col span={6} className="b-title">
            {item.title}
          </Col>
          <Col span={6} className="b-control">
            {item.d1}
          </Col>
          <Col span={6} className="b-control">
            {item.d2}
          </Col>
          <Col span={6} className="b-control">
            {item.d3}
          </Col>
        </Row>
        <Row className="b-item" key={`${item.title}2`}>
          <Col span={6} className="b-title">
            {`${item.title}大写`}
          </Col>
          <Col span={6} className="b-control">
            {nzhcn.encodeB(item.d1)}
          </Col>
          <Col span={6} className="b-control">
            {nzhcn.encodeB(item.d2)}
          </Col>
          <Col span={6} className="b-control">
            {nzhcn.encodeB(item.d3)}
          </Col>
        </Row>
      </>
    ));

    return (
      <PageHeaderWrapper>
        <Card bordered={false} className={styles.content}>
          <div className={styles.dtitle}>企业信息</div>
          <div className={styles.box}>
            {dom}
            <Row>
              <Col span={24}>
                <FormItem {...halfItemLayout} label="营业执照">
                  {isEdit && (
                    <Upload {...props} style={{ marginRight: '10px' }}>
                      <Button type="primary" ghost>
                        <Icon type="upload" /> 浏览
                      </Button>
                    </Upload>
                  )}
                  <a>
                    {fileList1.length && fileList1[0].name
                      ? fileList1[0].name
                      : '高重营业执照副本.pdf'}
                  </a>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...halfItemLayout} label="平台授权委托书">
                  {isEdit && (
                    <Upload {...props2} style={{ marginRight: '10px' }}>
                      <Button type="primary" ghost>
                        <Icon type="upload" /> 浏览
                      </Button>
                    </Upload>
                  )}
                  <a>
                    {fileList2.length && fileList2[0].name
                      ? fileList2[0].name
                      : '平台授权委托书（盖章）.pdf'}
                  </a>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...halfItemLayout} label="征信授权委托书">
                  {isEdit && (
                    <Upload {...props3} style={{ marginRight: '10px' }}>
                      <Button type="primary" ghost>
                        <Icon type="upload" /> 浏览
                      </Button>
                    </Upload>
                  )}
                  <a>
                    {fileList3.length && fileList3[0].name
                      ? fileList3[0].name
                      : '征信授权书（盖章）.pdf'}
                  </a>
                </FormItem>
              </Col>
            </Row>
          </div>
          <div className={styles.dtitle}>财务情况</div>
          <div className={styles.box}>
            <Row className="b-item">
              <Col span={6} className="b-title">
                近三年情况
              </Col>
              <Col span={6} className="b-control" style={{ background: 'none' }}>
                2017年
              </Col>
              <Col span={6} className="b-control" style={{ background: 'none' }}>
                2018年
              </Col>
              <Col span={6} className="b-control" style={{ background: 'none' }}>
                最近一个月
              </Col>
            </Row>
            {csDom}
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
