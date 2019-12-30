import { Input, Card, Tabs, Form } from 'antd';
import React, { Component } from 'react';

import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { any } from 'prop-types';
import styles from './style.less';
import Person from './person';
import Qiye from './qiye';

const { TabPane } = Tabs;
const { Search } = Input;

const getValue = (obj: { [x: string]: string[] }) =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

interface TableListProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  loading: boolean;
}

interface TableListState {
  selectKey: string;
  showTable: boolean;
  searchQYValue: string;
  searchGRValue: string;
}

/* eslint react/no-multi-comp:0 */
// @connect(
//   ({
//     listTableList,
//     loading,
//   }: {
//     listTableList: StateType;
//     loading: {
//       models: {
//         [key: string]: boolean;
//       };
//     };
//   }) => ({
//     listTableList,
//     loading: loading.models.rule,
//   }),
// )
class TableList extends Component<TableListProps, TableListState> {
  state: TableListState = {
    selectKey: '1',
    showTable: false,
    searchQYValue: '',
    searchGRValue: '',
  };

  componentDidMount() {
    // const { dispatch } = this.props;
    // dispatch({
    //   type: 'listTableList/fetch',
    // });
  }

  callback = (key: any) => {
    this.setState({
      selectKey: key,
      showTable: false,
    });
  };

  searchChange = (value: string, type: string) => {
    if (!value) return;
    if (type === 'qiye') {
      this.setState({
        searchQYValue: value,
        selectKey: '1',
        showTable: true,
      });
    } else {
      this.setState({
        searchGRValue: value,
        selectKey: '2',
        showTable: true,
      });
    }
  };

  render() {
    const { selectKey, showTable, searchQYValue, searchGRValue } = this.state;
    let tabbleDom: any;
    if (showTable) {
      if (selectKey === '1') {
        tabbleDom = <Qiye searchValue={searchQYValue} />;
      } else {
        tabbleDom = <Person searchValue={searchGRValue} />;
      }
    }
    return (
      <PageHeaderWrapper>
        <Card bordered={false} style={{ minHeight: '500px' }}>
          <div className={styles.searchBox}>
            <Tabs defaultActiveKey={selectKey} onChange={this.callback} type="card">
              <TabPane tab="企业查询" key="1">
                <div>
                  <div className="title">企业信用查询</div>
                  <Search
                    className="search"
                    size="large"
                    placeholder="请输入企业名称、注册号或统一社会信用代码"
                    onSearch={value => this.searchChange(value, 'qiye')}
                    enterButton
                  />
                </div>
              </TabPane>
              <TabPane tab="个人查询" key="2">
                <div>
                  <div className="title">个人信用查询</div>
                  <Search
                    className="search"
                    size="large"
                    placeholder="请输入姓名、身份证号或手机号"
                    onSearch={value => this.searchChange(value, 'gere')}
                    enterButton
                  />
                </div>
              </TabPane>
            </Tabs>
          </div>
          {tabbleDom}
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<TableListProps>()(TableList);
