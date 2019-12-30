export default {
  list: [
    {
      key: 0,
      no: 'YC00000001',
      sj: '2019-01-01 12:00:00',
      url: 'com.grandhonor.fina.controller',
      name: 'NullPointerException',
      func: 'doSave',
      status: '0',
    },
    {
      key: 1,
      no: 'YC00000002',
      sj: '2019-01-01 12:00:00',
      url: 'com.grandhonor.fina.config',
      name: 'ClassCastException',
      func: 'addResourceHandlers',
      status: '1',
    },
    {
      key: 2,
      no: 'YC00000003',
      sj: '2019-01-01 12:00:00',
      url: 'com.grandhonor.fina.utils',
      name: 'ArrayIndexOutOfBoundsException',
      func: 'formatDate',
      status: '1',
    },
  ],
  pagination: {
    total: 3,
    pageSize: 10,
    current: 1,
  },
};
