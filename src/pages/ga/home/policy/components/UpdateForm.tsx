import { Button, Row, Col, Form, Input, Modal } from 'antd';
import React, { Component } from 'react';

import { FormComponentProps } from 'antd/es/form';
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

  handleNext = (currentStep: number) => {
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
          if (currentStep < 2) {
            this.forward();
          } else {
            handleUpdate(formVals);
          }
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

  renderContent = (formVals: any) => {
    const { values } = this.props;
    console.log(values);

    const formItemLayout = {
      labelCol: {
        sm: {
          span: 6,
        },
      },
      wrapperCol: {
        sm: {
          span: 18,
        },
      },
    };
    return [
      <Row>
        <Col span={24}>
          <FormItem {...formItemLayout} label="企业名称">
            上海高重信息科技有限公司
          </FormItem>
        </Col>
      </Row>,
      <Row>
        <Col span={24}>
          <FormItem {...formItemLayout} label="统一社会信用代码">
            913101103246443123
          </FormItem>
        </Col>
      </Row>,
      <Row>
        <Col span={24}>
          <FormItem {...formItemLayout} label="申请时间">
            2019-01-01 12:00:00
          </FormItem>
        </Col>
      </Row>,
      <Row>
        <Col span={24}>
          <FormItem {...formItemLayout} label="审核意见" required>
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
      <Button key="cancel" onClick={() => handleUpdateModalVisible(false, values)}>
        驳回
      </Button>,
      <Button key="forward" type="primary" onClick={() => handleUpdateModalVisible(false, values)}>
        通过
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
