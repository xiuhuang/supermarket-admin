import { Button, Card, Form, Input, Pagination } from 'antd';
import React, { Component } from 'react';
import { Dispatch } from 'redux';
import router from 'umi/router';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from './index.less';
import { TypeItem, ProductItem } from './data.d';
import finaceData from './data';
import productionList from './pdata';

interface BasicFormProps extends FormComponentProps {
  submitting: boolean;
  dispatch: Dispatch<any>;
  match: any;
}

interface BasicState {
  itemData: any;
  currentPage: number;
  pageSize: number;
  listData: any[];
  pageTotal: number;
  formValues: {
    fprProname: string;
    fprFinanceName: string;
  };
}

class BasicForm extends Component<BasicFormProps, BasicState> {
  state = {
    itemData: finaceData.itemList[0],
    currentPage: 1,
    pageSize: 10,
    pageTotal: productionList.length,
    listData: [],
    formValues: {
      fprProname: '',
      fprFinanceName: '',
    },
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    this.setState(state => ({
      listData: productionList.slice(
        (state.currentPage - 1) * state.pageSize,
        state.currentPage * state.pageSize,
      ),
    }));
  };

  handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const { form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
      };

      this.setState(
        {
          formValues: values,
        },
        () => {
          this.search();
        },
      );
    });
  };

  search = () => {
    let newProductionList = productionList;
    const { formValues } = this.state;

    if (formValues.fprProname) {
      newProductionList = newProductionList.filter(
        item => item.fprProname.indexOf(formValues.fprProname) > -1,
      );
    }
    if (formValues.fprFinanceName) {
      newProductionList = newProductionList.filter(
        item => item.fprFinanceName.indexOf(formValues.fprFinanceName) > -1,
      );
    }

    this.state.itemData.list.forEach(itemType => {
      if (itemType.current) {
        if (itemType.key === 'fprGuatype') {
          newProductionList = newProductionList.filter(item => {
            const child = itemType.itemList[itemType.current];
            return item.fprGuatype === child.id;
          });
        } else {
          newProductionList = newProductionList.filter((item: ProductItem) => {
            const child = itemType.itemList[itemType.current] as TypeItem;
            if (child.isCal === 1) {
              return item[`${child.key}`] <= child.id;
            }

            if (child.isCal === 2) {
              return item[`${child.key}`] >= child.id;
            }

            return item[`${child.key}`] === child.id;
          });
        }
      }
    });
    this.setState(state => ({
      pageTotal: newProductionList.length,
      listData: newProductionList.slice(
        (state.currentPage - 1) * state.pageSize,
        state.currentPage * state.pageSize,
      ),
    }));
  };

  onChangeFinace = (index: number) => {
    this.setState({
      itemData: { ...finaceData.itemList[index] },
    });
  };

  onChangeTag = (items: any, child: any) => {
    let current = 0;
    items.itemList.forEach((item: any, index: number) => {
      if (item.title === child.title) {
        current = index;
      }
    });
    const newdata = this.state.itemData.list.map(item => {
      if (item.title === items.title) {
        return { ...items, current };
      }
      return item;
    });

    this.setState(
      state => ({
        itemData: { ...state.itemData, list: newdata },
      }),
      () => {
        this.search();
      },
    );
  };

  onShowSizeChange = (current: number, size: number) => {
    this.setState({
      currentPage: current,
      pageSize: size,
    });
    this.getData();
  };

  onPageChange = (page: number, pageSize?: number) => {
    this.setState({
      currentPage: page,
      pageSize: pageSize || 10,
    });
    this.getData();
  };

  goDetail = (item: ProductItem) => {
    console.log(item);
    router.push(`/product/detail/${item.fprFlowNo}`);
  };

  getStar = (starV: number) => {
    const newStar = [0, 1, 2, 3, 4].map(starNum => {
      if (starNum >= starV) {
        return (
          <i className="star_img">
            <img src="/images/star.png" alt="" />
          </i>
        );
      }
      return (
        <i className="star_img">
          <img src="/images/selected_star.png" alt="" />
        </i>
      );
    });
    return newStar;
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { itemData, listData, currentPage, pageTotal } = this.state;

    const listDom = listData.map((item: ProductItem, index: number) => (
      <div className="result_content_list" key={`${item.fprFinanceName}-${item.fprProname}`}>
        <div className="content_list_left">
          <img src={`/images/bank/${item.fprFinanceId}.png`} alt="" />
        </div>
        <div className="content_list_right">
          <p className="content_list_title">
            {item.fprFinanceName}-{item.fprProname}
          </p>
          <div className="content_list_middle">
            <div className="content_list_middle_item">
              <p>
                <span className="middle_item_title">参考利率范围：</span>
                <span className="middle_item_content">
                  {item.fprBeginrate}%-{item.fprEndrate}%
                </span>
              </p>
              <p style={{ height: '32px' }}></p>
            </div>
            <div className="content_list_middle_item">
              <p>
                <span className="middle_item_title">贷款额度：</span>
                <span className="middle_item_content">
                  {Math.floor(Number(item.fprLoanAmt) / 10000)}万元-
                  {Math.floor(Number(item.fprLoanAmtTo) / 10000)}万元
                </span>
              </p>
              <p>
                <span className="middle_item_title">担保方式：</span>
                <span className="middle_item_content">不限</span>
              </p>
              <p>
                <span className="middle_item_title">贷款期限：</span>
                <span className="middle_item_content">
                  {item.fprLoanDate}个月-{item.fprLoanDateTo}个月
                </span>
              </p>
            </div>
            <div className="content_list_middle_item">
              <p>
                <Button className="list_detail" onClick={() => this.goDetail(item)}>
                  详情
                </Button>
              </p>
              <p>
                成功率
                <span className="success_num">{this.getStar(Number(item.succRate))}</span>
              </p>
              <p>
                对接成功
                <span className="middle_item_content">{Number(item.countEnt)}项</span>需求
              </p>
            </div>
          </div>
        </div>
      </div>
    ));

    return (
      <PageHeaderWrapper>
        <Card bordered={false} className={styles.content}>
          <div className={styles.tableList}>
            <div className="production">
              <div className="product_box">
                <div className="product_search_box">
                  <div className="product_search_content">
                    <div className="product_search_name">
                      <span>机构名称：</span>
                      {getFieldDecorator('fprProname')(<Input placeholder="支持模糊查询" />)}
                    </div>
                    <div className="product_search_name">
                      <span>产品名称：</span>
                      {getFieldDecorator('fprFinanceName')(<Input placeholder="支持模糊查询" />)}
                      <Button className="prodduct_search_btn" onClick={this.handleSearch}>
                        搜索
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="product_screen_box">
                  <div className="product_screen_title">产品筛选</div>
                  <div className="product_screen_content">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <div className="screen_list_left">
                          <span>{finaceData.title}</span>
                        </div>
                        <div className="screen_list_right">
                          {finaceData.itemList &&
                            finaceData.itemList.map((item, index) => {
                              console.log(item);
                              return (
                                <span
                                  key={item.title}
                                  onClick={() => this.onChangeFinace(index)}
                                  className={`screen_right_item ${item.title === itemData.title &&
                                    'current'}`}
                                >
                                  {item.title}
                                </span>
                              );
                            })}
                        </div>
                      </li>
                      {itemData.list.map((items: any) => {
                        const childDom = items.itemList
                          ? items.itemList.map((child: any, index: number) => (
                              <span
                                className={`screen_right_item ${index === items.current &&
                                  'current'}`}
                                key={child.title}
                                onClick={() => {
                                  this.onChangeTag(items, child);
                                }}
                              >
                                {child.title}
                              </span>
                            ))
                          : null;

                        return (
                          <li className="list-group-item" key={items.title}>
                            <div className="screen_list_left">
                              <span>{items.title}</span>
                            </div>
                            <div className="screen_list_right">{childDom}</div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
                <div className="product_result_box">
                  <div className="product_result_top">
                    <div className="result_top_title">
                      共找到
                      <span>{pageTotal}</span>结果
                    </div>
                  </div>
                  <div className="product_result_content">{listDom}</div>
                  <div className={styles.pagination}>
                    <Pagination
                      defaultCurrent={currentPage}
                      total={pageTotal}
                      showSizeChanger
                      onShowSizeChange={this.onShowSizeChange}
                      onChange={this.onPageChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<BasicFormProps>()(BasicForm);
