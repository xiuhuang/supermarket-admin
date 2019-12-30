import { Button, Card, Form, Row, Col } from 'antd';
import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { TableListItem, TableListPagination, ProductItem } from './data.d';
import StandardTable, { StandardTableColumnProps } from './components/StandardTable';
import styles from './index.less';
import data from './pdata';
import sdata from './sdata';

const FormItem = Form.Item;

interface BasicFormProps extends FormComponentProps {
  submitting: boolean;
  dispatch: Dispatch<any>;
  match: any;
}

interface BasicState {
  detailData: ProductItem;
}

class BasicForm extends Component<BasicFormProps, BasicState> {
  state = {
    detailData: {
      fprFlowNo: 'FPR20190103000000001',
      fprProname: '小微创业贷',
      fprProtype:
        '1、具备申请办理工行信贷业务的基本条件\r\n2、借款人信用等级A级（含）以上\r\n3、在工行开立基本结算账户或一般结算账户\r\n4、贷款行的其他要求',
      fprFinanceId: '00000018',
      fprFinanceName: '工商银行',
      fprUserNo: 'fin00001406',
      fprPropath: null,
      fprLoanDate: '6',
      fprLoanDateTo: '24',
      fprBeginrate: '4.35',
      fprEndrate: '5.22',
      fprLoanAmt: '100000',
      fprLoanAmtTo: '5000000',
      fprGuatype: '9',
      fprLoanPurpose:
        '支持领域紧紧围绕江苏经济发展战略，重点支持各类传统产业和新兴产业中的小微企业，包括生产、加工、服务、贸易企业。优先做好小微企业创业创新项目的扶持。',
      fprStt: '1',
      fprOptime: '20190103160111',
      fprProchr:
        '小微创业贷是由省财政支持、省工行开发的服务于江苏小微企业创业、创新发展的一款融资产品。该产品是以江苏小微企业创业创新发展融资基金作为增信手段，按照一定放大倍数对小微企业发放贷款，解决企业成长发展过程中正常生产经营所需资金的一项融资业务',
      fprDesc: '',
      fprFlow:
        '1、受众广：符合“四有”要求的客户。即有适销对路的产品及合同（订单）、有稳定的现金流（银行流水单）、有健全的财务会计核算（账表齐全）、有正常的纳税记录\r\n2、成本低：除贷款利率外无其他担保费用\r\n3、额度高：最高可达500万',
      address: null,
      atName: null,
      userPhone: '18061933199',
      countNum: '758',
      pol_attname: null,
      fprMeasures: null,
      fprProductType: null,
      fprFinType: '05',
      applyCount: null,
      count: '745',
      countEnt: '755',
      financeTypeNo: '000001',
      succRate: '5',
    },
  };

  componentDidMount() {
    const { params } = this.props.match;
    data.forEach((element: ProductItem) => {
      if (element.fprFlowNo === params.no) {
        this.setState({
          detailData: element,
        });
      }
    });
  }

  handleStandardTableChange = (
    pagination: Partial<TableListPagination>,
    filtersArg: Record<keyof TableListItem, string[]>,
  ) => {
    // const filters = Object.keys(filtersArg).reduce((obj, key) => {
    //   const newObj = { ...obj };
    //   newObj[key] = getValue(filtersArg[key]);
    //   return newObj;
    // }, {});
    // const params: Partial<TableListParams> = {
    //   currentPage: pagination.current,
    //   pageSize: pagination.pageSize,
    // };
  };

  back = () => {
    window.history.back();
  };

  render() {
    const { detailData } = this.state;

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

    const columns: StandardTableColumnProps[] = [
      {
        title: '序号',
        dataIndex: 'no',
        key: 'no',
        align: 'center',
      },
      {
        title: '企业名称',
        dataIndex: 'name',
        key: 'name',
        align: 'center',
      },
      {
        title: '对接时间',
        dataIndex: 'time',
        key: 'time',
        align: 'center',
      },
    ];

    return (
      <PageHeaderWrapper>
        <Card bordered={false} className={styles.content}>
          <div className={styles.productHead}>
            <Row>
              <Col span={5}>
                <div className="leftImg">
                  <img src={`/images/bank/${detailData.fprFinanceId}.png`} alt="" />
                  <div>{detailData.fprProname}</div>
                </div>
              </Col>
              <Col span={19}>
                <Row className="rightBox">
                  <Col span={6}>
                    参考利率范围：
                    <br />
                    <div className="red-num">4.35%-9%</div>
                  </Col>
                  <Col span={6}>
                    贷款额度：
                    <br />
                    1万元-50,000万元
                  </Col>
                  <Col span={6}>
                    贷款期限：
                    <br />
                    1个月 - 12个月
                  </Col>
                  <Col span={6}>
                    担保方式：
                    <br />
                    不限
                  </Col>
                </Row>
                <div className="right-b">
                  <Button type="primary">立即申请</Button>
                  <span className="r-b-text">联系电话：15061862570</span>
                </div>
              </Col>
            </Row>
          </div>
          <div className={styles.dtitle}>产品详情</div>
          <div className={styles.stepBox}>
            <ul>
              <li>
                <div className="block">1.企业申请</div>
                <span className="less"></span>
              </li>
              <li>
                <samp className="less1 left"></samp>
                <div className="block">2.风险评估</div>
                <span className="less right"></span>
              </li>
              <li>
                <samp className="less1 left"></samp>
                <div className="block">3.机构受理</div>
                <span className="less"></span>
              </li>
              <li>
                <samp className="less1 left"></samp>
                <div className="block">4.机构审核</div>
                <span className="less"></span>
              </li>
              <li>
                <samp className="less1 left"></samp>
                <div className="block">5.机构授信</div>
                <span className="less"></span>
              </li>
              <li>
                <samp className="less1 left"></samp>
                <div className="block">6.签约放款</div>
              </li>
              <div className="clearfix"></div>
            </ul>
          </div>
          <div className={styles.box}>
            <Row>
              <Col span={12}>
                <FormItem {...formItemLayout} label="产品类型">
                  一般金融产品
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label="贷款类别">
                  经营贷款（含流动资金贷款、周转贷款）
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem {...formItemLayout} label="是否网贷直联">
                  否
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label="是否政策性产品">
                  否
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem {...formItemLayout} label="是否通用产品">
                  是
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label="是否人民币">
                  是
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...halfItemLayout} label="产品简介">
                  {detailData.fprProchr}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...halfItemLayout} label="产品特点">
                  {detailData.fprFlow}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...halfItemLayout} label="适用客户">
                  {detailData.fprLoanPurpose}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...halfItemLayout} label="申请条件">
                  {detailData.fprProtype}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...halfItemLayout} label="提交材料">
                  {detailData.fprDesc}
                </FormItem>
              </Col>
            </Row>
          </div>
          <div className={styles.dtitle}>成功案例</div>
          <div className={styles.ptable}>
            <StandardTable
              selectedRows={[]}
              rowSelection={undefined}
              data={sdata}
              onChange={this.handleStandardTableChange}
              columns={columns}
              bordered
            />
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

export default Form.create<BasicFormProps>()(BasicForm);
