import { Button, Row, Col, Form, Input, Modal } from 'antd';
import React, { Component } from 'react';
import { FormComponentProps } from 'antd/es/form';
import StarContent from './Star';
import styles from '../style.less';

export interface FormValsType {
  name?: string;
  key?: number;
  no?: string;
  sj?: string;
  jg?: string;
  content?: string;
  status?: number;
  star?: number;
}

export interface UpdateFormProps extends FormComponentProps {
  handleUpdateModalVisible: (flag?: boolean, formVals?: FormValsType) => void;
  handleUpdate: (values: FormValsType) => void;
  updateModalVisible: boolean;
  values: FormValsType;
}
const FormItem = Form.Item;
const { TextArea } = Input;

export interface UpdateFormState {
  formVals: FormValsType;
  currentStep: number;
}

class UpdateForm extends Component<UpdateFormProps, UpdateFormState> {
  static defaultProps = {
    handleUpdate: () => {},
    handleUpdateModalVisible: () => {},
    values: {},
  };

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  constructor(props: UpdateFormProps) {
    super(props);

    this.state = {
      formVals: {
        name: props.values.name,
        key: props.values.key,
        no: props.values.no,
        sj: props.values.sj,
        jg: props.values.jg,
        content: props.values.content,
        status: props.values.status,
        star: props.values.star,
      },
      currentStep: 0,
    };
  }

  handleNext = () => {
    const { form, handleUpdate } = this.props;
    const { formVals: oldValue } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const formVals = { ...oldValue, ...fieldsValue };
      this.setState(
        {
          formVals,
        },
        () => {
          handleUpdate(formVals);
        },
      );
    });
  };

  backward = () => {
    const { currentStep } = this.state;
    this.setState({
      currentStep: currentStep - 1,
    });
  };

  forward = () => {
    const { currentStep } = this.state;
    this.setState({
      currentStep: currentStep + 1,
    });
  };

  changeStar = (starNum: number) => {
    console.log(starNum);
  };

  renderContent = (formVals: any) => {
    const halfItemLayout = {
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
    const formItemLayout = {
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
    return [
      <Row>
        <Col span={12}>
          <FormItem {...halfItemLayout} label="交易编号">
            {formVals.no}
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem {...halfItemLayout} label="交易时间">
            {formVals.sj}
          </FormItem>
        </Col>
      </Row>,
      <Row>
        <Col span={12}>
          <FormItem {...halfItemLayout} label="机构名称">
            {formVals.jg}
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem {...halfItemLayout} label="金融产品名">
            {formVals.name}
          </FormItem>
        </Col>
      </Row>,
      <Row>
        <Col span={24}>
          <FormItem {...formItemLayout} label="评分" required>
            <StarContent starNum={formVals.star} endStar={this.changeStar} />
          </FormItem>
        </Col>
      </Row>,
      <Row>
        <Col span={24}>
          <FormItem {...formItemLayout} label="服务态度" required>
            <StarContent starNum={formVals.star} endStar={this.changeStar} />
          </FormItem>
        </Col>
      </Row>,
      <Row>
        <Col span={24}>
          <FormItem {...formItemLayout} label="需求满意度" required>
            <StarContent starNum={formVals.star} endStar={this.changeStar} />
          </FormItem>
        </Col>
      </Row>,
      <Row>
        <Col span={24}>
          <FormItem {...formItemLayout} label="评价内容" required>
            <TextArea rows={4} placeholder="请输入至少五个字符" style={{ margin: '10px auto' }} />
          </FormItem>
        </Col>
      </Row>,
    ];
  };

  renderFooter = (currentStep: number) => {
    const { handleUpdateModalVisible, values } = this.props;
    return [
      <Button key="cancel" onClick={() => handleUpdateModalVisible(false, values)}>
        取消
      </Button>,
      <Button key="forward" type="primary" onClick={() => this.handleNext()}>
        提交
      </Button>,
    ];
  };

  render() {
    const { updateModalVisible, handleUpdateModalVisible, values } = this.props;
    const { currentStep, formVals } = this.state;

    return (
      <Modal
        width={800}
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title="评价信息"
        visible={updateModalVisible}
        footer={this.renderFooter(currentStep)}
        onCancel={() => handleUpdateModalVisible(false, values)}
        afterClose={() => handleUpdateModalVisible()}
      >
        <div className={styles.form}>{this.renderContent(formVals)}</div>
      </Modal>
    );
  }
}

export default Form.create<UpdateFormProps>()(UpdateForm);
