import { Card } from 'antd';
import { RadioChangeEvent } from 'antd/es/radio';
import React from 'react';
import { VisitDataType } from '../data.d';
import { Pie } from './Charts';
import styles from '../style.less';

const ProportionSales = ({
  loading,
  salesPieData,
}: {
  loading: boolean;
  dropdownGroup: React.ReactNode;
  salesType: 'all' | 'online' | 'stores';
  salesPieData: VisitDataType[];
  handleChangeSalesType?: (e: RadioChangeEvent) => void;
}) => (
  <Card
    loading={loading}
    className={styles.salesCard}
    bordered={false}
    // title={
    //   <FormattedMessage
    //     id="analysis.analysis.the-proportion-of-sales"
    //     defaultMessage="The Proportion of Sales"
    //   />
    // }
    style={{
      height: '100%',
    }}
    // extra={
    //   <div className={styles.salesCardExtra}>
    //     {dropdownGroup}
    //     <div className={styles.salesTypeRadio}>
    //       <Radio.Group value={salesType} onChange={handleChangeSalesType}>
    //         <Radio.Button value="all">
    //           <FormattedMessage id="analysis.channel.all" defaultMessage="ALL" />
    //         </Radio.Button>
    //         <Radio.Button value="online">
    //           <FormattedMessage id="analysis.channel.online" defaultMessage="Online" />
    //         </Radio.Button>
    //         <Radio.Button value="stores">
    //           <FormattedMessage id="analysis.channel.stores" defaultMessage="Stores" />
    //         </Radio.Button>
    //       </Radio.Group>
    //     </div>
    //   </div>
    // }
  >
    <div>
      {/* <h4 style={{ marginTop: 8, marginBottom: 32 }}>
        <FormattedMessage id="analysis.analysis.sales" defaultMessage="Sales" />
      </h4> */}
      <Pie
        hasLegend
        // subTitle={<FormattedMessage id="analysis.analysis.sales" defaultMessage="Sales" />}
        subTitle=""
        total={() => (
          <div>
            <span style={{ color: 'rgba(0, 0, 0, 0.427)', fontSize: '14px' }}>已对接企业数</span>
            <br />
            {salesPieData.reduce((pre, now) => now.y + pre, 0)}
          </div>
        )}
        data={salesPieData}
        // valueFormat={value => <Yuan>{value}</Yuan>}
        height={248}
        lineWidth={4}
      />
    </div>
  </Card>
);

export default ProportionSales;
