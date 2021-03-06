import { Button, Card, Form, Icon, Input, Upload, Row, Col, message } from 'antd';
import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import InfoData from './data';
import styles from './style.less';

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

  changeEdit = (type: boolean) => {
    this.setState(state => ({
      isEdit: type || !state.isEdit,
    }));
  };

  render() {
    const { isEdit, fileList1, fileList2 } = this.state;

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

    const dom = InfoData.map(
      ({ data, type, cwidth }: { data: string[]; type: string; cwidth?: string }): any => {
        if (type === 'input2') {
          return (
            <Row>
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
            <Row>
              <Col span={24}>
                <FormItem {...halfItemLayout} label={data[0]}>
                  {isEdit
                    ? getFieldDecorator(data[0], {
                        initialValue: data[1],
                      })(<Input style={{ width: cwidth || 'calc(100% - 391px)' }} />)
                    : data[1]}
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
      },
    );

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

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
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
                      : '江苏银行股份有限公司执照副本.pdf'}
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
            <div className={styles.insImg}>
              <img src="/images/timg.jpeg" alt="" />
            </div>
          </div>
          <div className={styles.bottom}>
            {!isEdit && (
              <Button type="primary" onClick={() => this.changeEdit(true)}>
                编辑资料
              </Button>
            )}
            {isEdit && (
              <div>
                <Button onClick={() => this.changeEdit(false)}>返回</Button>{' '}
                <Button type="primary" onClick={this.handleSubmit}>
                  提交
                </Button>
              </div>
            )}
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
