import { Button, Col, DatePicker, Form, Icon, Input, Row, Select } from 'antd';
import React, { Component, Fragment } from 'react';

import { FormComponentProps } from 'antd/es/form';
import { SorterResult } from 'antd/es/table';
// import { connect } from 'dva';
import StandardTable, { StandardTableColumnProps } from './components/StandardTable';
import { TableListItem, TableListPagination, TableListParams, GerenParams } from './data.d';
import ListData from './data';
import styles from './style.less';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const { Option } = Select;
const getValue = (obj: { [x: string]: string[] }) =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

interface TableListProps extends FormComponentProps {
  searchValue: string;
}

interface TableListState {
  formValues: { [key: string]: string };
  data: any;
}

class TableList extends Component<TableListProps, TableListState> {
  state: TableListState = {
    formValues: {},
    data: ListData,
  };

  columns: StandardTableColumnProps[] = [
    {
      title: '姓名',
      dataIndex: 'name',
      render: v => this.checkText(v),
    },
    {
      title: '身份证号',
      dataIndex: 'idcard',
      render: v => this.checkText(this.plusXing(v, 10, 4)),
    },
    {
      title: '性别',
      dataIndex: 'sex',
      render: v => ['男', '女'][v],
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      render: v => this.checkText(v),
    },
    {
      title: '时间',
      dataIndex: 'sj',
    },
    {
      title: '操作',
      render: (text, record: any) => (
        <Fragment>
          <Button>申请报告</Button>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { searchValue } = this.props;
    this.getData(searchValue);
  }

  componentWillReceiveProps(nextProps: any) {
    const { searchValue } = this.props;
    if (nextProps.searchValue !== searchValue) {
      this.getData(nextProps.searchValue);
    }
  }

  plusXing = (str: string, frontLen: number, endLen: number) => {
    const len = str.length - frontLen - endLen;
    let xing = '';
    for (let i = 0; i < len; i += 1) {
      xing += '*';
    }
    return str.substring(0, frontLen) + xing + str.substring(str.length - endLen);
  };

  getData = (searchValue: string) => {
    const newdata = ListData.list.filter((item: GerenParams) => {
      console.log(item.name.indexOf(searchValue));
      return (
        item.idcard.indexOf(searchValue) > -1 ||
        item.phone.indexOf(searchValue) > -1 ||
        item.name.indexOf(searchValue) > -1
      );
    });
    this.setState({
      data: {
        pagination: ListData.pagination,
        list: newdata,
      },
    });
  };

  checkText = (text: string) => {
    const { searchValue } = this.props;
    const childIndex = text.toUpperCase().indexOf(searchValue.toUpperCase());
    const childBeforeStr = text.substr(0, childIndex);
    const childMStr = text.substr(childIndex, searchValue.length);
    const childAfterStr = text.substr(childIndex + searchValue.length);
    const newtext =
      childIndex > -1 && searchValue ? (
        <span>
          {childBeforeStr}
          <span style={{ color: '#f5222D' }}>{childMStr}</span>
          {childAfterStr}
        </span>
      ) : (
        <span>{text}</span>
      );
    return newtext;
  };

  handleStandardTableChange = (
    pagination: Partial<TableListPagination>,
    filtersArg: Record<keyof TableListItem, string[]>,
    sorter: SorterResult<TableListItem>,
  ) => {
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params: Partial<TableListParams> = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }
  };

  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
  };

  handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const { form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });
    });
  };

  renderSimpleForm() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={6} sm={24}>
            <FormItem label="姓名">
              {getFieldDecorator('name')(<Input placeholder="请输入查询姓名" />)}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="身份证号">
              {getFieldDecorator('idcard')(<Input placeholder="请输入查询身份证号" />)}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="发布时间">
              {getFieldDecorator('sj')(<RangePicker style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const { data } = this.state;
    return (
      <div className={styles.tableList}>
        <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
        <StandardTable
          selectedRows={[]}
          rowSelection={undefined}
          data={data}
          columns={this.columns}
          onChange={this.handleStandardTableChange}
        />
      </div>
    );
  }
}

export default Form.create<TableListProps>()(TableList);
