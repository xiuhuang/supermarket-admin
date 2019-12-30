export default {
  title: '贷款渠道:',
  itemList: [
    {
      title: '不限',
      id: 0,
      list: [
        {
          title: '贷款期限:',
          itemList: [
            {
              title: '不限',
              id: 0,
            },
            {
              title: '6个月及以下',
              id: 6,
              isCal: 1,
              key: 'fprLoanDate',
            },
            {
              title: '12个月及以下',
              id: 12,
              isCal: 1,
              key: 'fprLoanDate',
            },
            {
              title: '36个月及以下',
              id: 36,
              isCal: 1,
              key: 'fprLoanDate',
            },
            {
              title: '36个月及以上',
              id: 36.00001,
              isCal: 2,
              key: 'fprLoanDateTo',
            },
          ],
          current: 0,
        },
        {
          title: '担保方式:',
          itemList: [
            {
              title: '不限',
              id: 0,
            },
            {
              title: '抵押',
              id: '0',
            },
            {
              title: '质押',
              id: '1',
            },
            {
              title: '信保基金',
              id: '2',
            },
            {
              title: '一般保证',
              id: '3',
            },
            {
              title: '信用',
              id: '4',
            },
          ],
          current: 0,
          key: 'fprGuatype',
        },
        {
          title: '贷款额度:',
          itemList: [
            {
              title: '不限',
              id: 0,
            },
            {
              title: '100万及以下',
              id: 1000000,
              isCal: 1,
              key: 'fprLoanAmt',
            },
            {
              title: '200万及以下',
              id: 2000000,
              isCal: 1,
              key: 'fprLoanAmt',
            },
            {
              title: '300万及以下',
              id: 3000000,
              isCal: 1,
              key: 'fprLoanAmt',
            },
            {
              title: '500万及以下',
              id: 5000000,
              isCal: 1,
              key: 'fprLoanAmt',
            },
            {
              title: '500万及以上',
              id: 5000000.01,
              isCal: 2,
              key: 'fprLoanAmtTo',
            },
          ],
          current: 0,
        },
      ],
    },
    {
      title: '银行',
      id: '000001',
      list: [
        {
          title: '贷款期限:',
          itemList: [
            {
              title: '不限',
              id: 0,
            },
            {
              title: '6个月及以下',
              id: 6,
              isCal: 1,
              key: 'fprLoanDate',
            },
            {
              title: '12个月及以下',
              id: 12,
              isCal: 1,
              key: 'fprLoanDate',
            },
            {
              title: '36个月及以下',
              id: 36,
              isCal: 1,
              key: 'fprLoanDate',
            },
            {
              title: '36个月及以上',
              id: 36.00001,
              isCal: 2,
              key: 'fprLoanDateTo',
            },
          ],
          current: 0,
        },
        {
          title: '担保方式:',
          itemList: [
            {
              title: '不限',
              id: 0,
            },
            {
              title: '抵押',
              id: '0',
            },
            {
              title: '质押',
              id: '1',
            },
            {
              title: '信保基金',
              id: '2',
            },
            {
              title: '一般保证',
              id: '3',
            },
            {
              title: '信用',
              id: '4',
            },
          ],
          current: 0,
          key: 'fprGuatype',
        },
        {
          title: '贷款额度:',
          itemList: [
            {
              title: '不限',
              id: 0,
            },
            {
              title: '100万及以下',
              id: 1000000,
              isCal: 1,
              key: 'fprLoanAmt',
            },
            {
              title: '200万及以下',
              id: 2000000,
              isCal: 1,
              key: 'fprLoanAmt',
            },
            {
              title: '300万及以下',
              id: 3000000,
              isCal: 1,
              key: 'fprLoanAmt',
            },
            {
              title: '500万及以下',
              id: 5000000,
              isCal: 1,
              key: 'fprLoanAmt',
            },
            {
              title: '500万及以上',
              id: 5000000.01,
              isCal: 2,
              key: 'fprLoanAmtTo',
            },
          ],
          current: 0,
        },
      ],
    },
    {
      title: '担保公司',
      id: '000004',
      list: [
        {
          title: '融资担保期限:',
          itemList: [
            {
              title: '不限',
              id: 0,
            },
            {
              title: '6个月及以下',
              id: 6,
              isCal: 1,
              key: 'fprLoanDate',
            },
            {
              title: '12个月及以下',
              id: 12,
              isCal: 1,
              key: 'fprLoanDate',
            },
            {
              title: '36个月及以下',
              id: 36,
              isCal: 1,
              key: 'fprLoanDate',
            },
            {
              title: '36个月及以上',
              id: 36.00001,
              isCal: 2,
              key: 'fprLoanDateTo',
            },
          ],
          current: 0,
        },
        {
          title: '产品类型:',
          itemList: [
            {
              title: '不限',
              id: 0,
            },
            {
              title: '信用担保类产品',
              id: '1',
            },
            {
              title: '非信用担保类产品',
              id: '2',
            },
          ],
          current: 0,
          key: 'fprProductType',
        },
        {
          title: '融资担保额度:',
          itemList: [
            {
              title: '不限',
              id: 0,
            },
            {
              title: '100万及以下',
              id: 1000000,
              isCal: 1,
              key: 'fprLoanAmt',
            },
            {
              title: '200万及以下',
              id: 2000000,
              isCal: 1,
              key: 'fprLoanAmt',
            },
            {
              title: '300万及以下',
              id: 3000000,
              isCal: 1,
              key: 'fprLoanAmt',
            },
            {
              title: '500万及以下',
              id: 5000000,
              isCal: 1,
              key: 'fprLoanAmt',
            },
            {
              title: '500万及以上',
              id: 5000000.01,
              isCal: 2,
              key: 'fprLoanAmtTo',
            },
          ],
          current: 0,
        },
      ],
    },
    {
      title: '保险公司',
      id: '000006',
      list: [
        {
          title: '承保期限:',
          itemList: [
            {
              title: '不限',
              id: 0,
            },
            {
              title: '6个月及以下',
              id: 6,
              isCal: 1,
              key: 'fprLoanDate',
            },
            {
              title: '12个月及以下',
              id: 12,
              isCal: 1,
              key: 'fprLoanDate',
            },
            {
              title: '36个月及以下',
              id: 36,
              isCal: 1,
              key: 'fprLoanDate',
            },
            {
              title: '36个月及以上',
              id: 36.00001,
              isCal: 2,
              key: 'fprLoanDateTo',
            },
          ],
          current: 0,
        },
        {
          title: '产品类型:',
          itemList: [
            {
              title: '不限',
              id: 0,
            },
            {
              title: '信用担保类产品',
              id: '1',
            },
            {
              title: '非信用担保类产品',
              id: '2',
            },
          ],
          current: 0,
          key: 'fprProductType',
        },
        {
          title: '承保额度:',
          itemList: [
            {
              title: '不限',
              id: 0,
            },
            {
              title: '100万及以下',
              id: 1000000,
              isCal: 1,
              key: 'fprLoanAmt',
            },
            {
              title: '200万及以下',
              id: 2000000,
              isCal: 1,
              key: 'fprLoanAmt',
            },
            {
              title: '300万及以下',
              id: 3000000,
              isCal: 1,
              key: 'fprLoanAmt',
            },
            {
              title: '500万及以下',
              id: 5000000,
              isCal: 1,
              key: 'fprLoanAmt',
            },
            {
              title: '500万及以上',
              id: 5000000.01,
              isCal: 2,
              key: 'fprLoanAmtTo',
            },
          ],
          current: 0,
        },
      ],
    },
  ],
  current: 0,
  key: 'financeTypeNo',
};
