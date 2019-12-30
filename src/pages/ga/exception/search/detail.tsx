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
      {
        title: '信保贷',
        d1: '信保基金',
        d2: '5.22%-6.55%',
        d3: '10万元-500万元',
        d4: '6个月 - 12个月',
        d5: '一般金融产品',
      },
      {
        title: '一般流动资金贷款',
        d1: '不限',
        d2: '4.35%-6.5%',
        d3: '1万元-20,000万元',
        d4: '1个月 - 36个月',
        d5: '一般金融产品',
      },
      {
        title: '税e融',
        d1: '信用',
        d2: '7%-11%',
        d3: '1万元-100万元',
        d4: '1个月 - 12个月',
        d5: '一般金融产品',
      },
      {
        title: '负债总额（万元）大写',
        d1: '不限',
        d2: '4.35%-4.35%',
        d3: '10万元-300万元',
        d4: '1个月 - 12个月',
        d5: '一般金融产品',
      },
    ];
    const csDom = cwdata.map(item => (
      <Row className="b-item" key={item.title}>
        <Col span={4} className="b-title">
          {item.title}
        </Col>
        <Col span={4} className="b-control">
          {item.d1}
        </Col>
        <Col span={4} className="b-control">
          {item.d2}
        </Col>
        <Col span={4} className="b-control">
          {item.d3}
        </Col>
        <Col span={4} className="b-control">
          {item.d4}
        </Col>
        <Col span={4} className="b-control">
          {item.d5}
        </Col>
      </Row>
    ));

    const star = 3.5;
    const starDom = [];
    for (let i = 0; i < 5; i += 1) {
      if (star > i && star < i + 1) {
        starDom.push(<img key={i} src="/images/half_star.png" alt="" />);
      } else if (star > i) {
        starDom.push(<img key={i} src="/images/selected_star.png" alt="" />);
      } else {
        starDom.push(<img key={i} src="/images/star.png" alt="" />);
      }
    }

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
            {/* <Row>
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
            </Row> */}
          </div>
          <div className={styles.dtitle}>财务情况</div>
          <div className={styles.box}>
            <Row className="b-item">
              <Col span={4} className="b-title">
                产品名称
              </Col>
              <Col span={4} className="b-control" style={{ background: 'none' }}>
                担保方式
              </Col>
              <Col span={4} className="b-control" style={{ background: 'none' }}>
                参考利率范围
              </Col>
              <Col span={4} className="b-control" style={{ background: 'none' }}>
                贷款额度
              </Col>
              <Col span={4} className="b-control" style={{ background: 'none' }}>
                贷款期限
              </Col>
              <Col span={4} className="b-control" style={{ background: 'none' }}>
                产品类型
              </Col>
            </Row>
            {csDom}
          </div>
          <div className={styles.dtitle}>综合评价</div>
          <div className={styles.box} style={{ width: '60%' }}>
            <Row>
              <Col span={24}>
                <FormItem {...halfItemLayout} label="总体评价">
                  {starDom}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...halfItemLayout} label="服务态度">
                  {starDom}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...halfItemLayout} label="需求满意度">
                  {starDom}
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
