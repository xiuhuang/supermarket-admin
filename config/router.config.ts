export default [
  {
    path: '/organize',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      {
        path: '/organize',
        redirect: '/organize/product',
      },
      {
        path: '/organize/product',
        icon: 'gold',
        name: '产品管理',
        routes: [
          {
            path: '/organize/product',
            redirect: '/organize/product/info',
          },
          {
            name: '产品列表',
            path: '/organize/product/info',
            component: './organize/product/info',
          },
          {
            name: '产品详情',
            path: '/organize/product/info/detail/:no',
            component: './organize/product/info/detail',
            hideInMenu: true,
          },
          {
            name: '上架产品',
            path: '/organize/product/push',
            component: './organize/product/push',
          },
          // {
          //   name: '产品统计',
          //   path: '/organize/product/total',
          //   component: './404',
          // },
        ],
      },
      {
        path: '/organize/risk',
        icon: 'property-safety',
        name: '风险管理',
        routes: [
          {
            name: '信用查询',
            path: '/organize/risk/search',
            component: './organize/risk/search',
          },
          {
            name: '征信报告记录',
            path: '/organize/risk/notes',
            component: './organize/risk/notes',
          },
        ],
      },
      {
        path: '/organize/demand',
        icon: 'container',
        name: '需求管理',
        routes: [
          {
            name: '意向我的需求',
            path: '/organize/demand/my',
            component: './organize/demand/my',
          },
          {
            name: '需求详情',
            path: '/organize/demand/my/detail/:no',
            component: './organize/demand/my/detail',
            hideInMenu: true,
          },
          {
            name: '待对接需求',
            path: '/organize/demand/todo',
            component: './organize/demand/todo',
          },
          {
            name: '需求详情',
            path: '/organize/demand/todo/detail/:no',
            component: './organize/demand/todo/detail',
            hideInMenu: true,
          },
        ],
      },
      {
        path: '/organize/complaint',
        icon: 'bulb',
        name: '投诉管理',
        routes: [
          {
            name: '投诉信息',
            path: '/organize/complaint/info',
            component: './organize/complaint/info',
          },
          {
            name: '投诉详情',
            path: '/organize/complaint/info/detail/:no',
            component: './organize/complaint/info/detail',
            hideInMenu: true,
          },
          {
            name: '发起投诉',
            path: '/organize/complaint/push',
            component: './organize/complaint/push',
          },
        ],
      },
      {
        path: '/organize/center',
        icon: 'home',
        name: '机构中心',
        routes: [
          {
            name: '机构信息',
            path: '/organize/center/info',
            component: './organize/center/info',
          },
          {
            name: '密码修改',
            path: '/organize/center/pwd',
            component: './organize/center/changepwd',
          },
        ],
      },
    ],
  },
  {
    path: '/ga',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      {
        path: '/ga',
        redirect: '/ga/enterprise',
      },
      {
        path: '/ga/enterprise',
        icon: 'bank',
        name: '企业管理',
        routes: [
          {
            path: '/ga/enterprise',
            redirect: '/ga/enterprise/info',
          },
          {
            name: '企业信息',
            path: '/ga/enterprise/info',
            component: './ga/enterprise/info',
          },
          {
            name: '企业详情',
            path: '/ga/enterprise/info/detail/:no',
            component: './ga/enterprise/info/detail',
            hideInMenu: true,
          },
          {
            name: '企业审核',
            path: '/ga/enterprise/examine',
            component: './ga/enterprise/info/examine',
          },
          {
            name: '企业详情',
            path: '/ga/enterprise/examine/detail/:no',
            component: './ga/enterprise/info/detail',
            hideInMenu: true,
          },
        ],
      },
      {
        path: '/ga/institution',
        icon: 'home',
        name: '金融机构管理',
        component: './ga/institution',
      },
      {
        name: '机构详情',
        path: '/ga/institution/detail/:no',
        component: './ga/institution/detail',
        hideInMenu: true,
      },
      {
        path: '/ga/trade',
        icon: 'transaction',
        name: '交易管理',
        routes: [
          {
            name: '交易监控',
            path: '/ga/trade/monitoring',
            component: './ga/trade/monitoring',
          },
          {
            name: '成果管理',
            path: '/ga/trade/results',
            component: './ga/trade/results',
          },
        ],
      },
      {
        path: '/ga/complaint',
        icon: 'bulb',
        name: '投诉管理',
        routes: [
          {
            name: '企业投诉',
            path: '/ga/complaint/enterprise',
            component: './ga/complaint',
          },
          {
            name: '企业详情',
            path: '/ga/complaint/enterprise/detail/:no',
            component: './ga/complaint/detail',
            hideInMenu: true,
          },
          {
            name: '机构投诉',
            path: '/ga/complaint/institution',
            component: './ga/complaint/ins',
          },
          {
            name: '机构详情',
            path: '/ga/complaint/institution/detail/:no',
            component: './ga/complaint/insDetail',
            hideInMenu: true,
          },
        ],
      },
      {
        path: '/ga/exception',
        icon: 'exception',
        name: '日志管理',
        routes: [
          {
            name: '征信查询日志',
            path: '/ga/exception/search',
            component: './ga/exception/search',
          },
          {
            name: '企业详情',
            path: '/ga/exception/search/detail/:no',
            component: './ga/exception/search/detail',
            hideInMenu: true,
          },
          {
            name: '操作日志',
            path: '/ga/exception/operate',
            component: './ga/exception/search/operate',
          },
          {
            name: '异常日志',
            path: '/ga/exception/debug',
            component: './ga/exception/debug',
          },
          {
            name: '日志详情',
            path: '/ga/exception/debug/detail/:no',
            component: './ga/exception/debug/detail',
            hideInMenu: true,
          },
          {
            name: '登录日志',
            path: '/ga/exception/login',
            component: './ga/exception/debug/login',
          },
        ],
      },
      {
        path: '/ga/home',
        icon: 'container',
        name: '主页管理',
        routes: [
          {
            name: '常见问题管理',
            path: '/ga/home/question',
            component: './ga/home/question',
          },
          {
            name: '问题详情',
            path: '/ga/home/question/detail/:no',
            component: './ga/home/question/detail',
            hideInMenu: true,
          },
          {
            name: '留言管理',
            path: '/ga/home/message',
            component: './ga/home/message',
          },
          {
            name: '留言详情',
            path: '/ga/home/message/detail/:no',
            component: './ga/home/message/detail',
            hideInMenu: true,
          },
          {
            name: '政策指南管理',
            path: '/ga/home/policy',
            component: './ga/home/policy',
          },
          {
            name: '政策指南详情',
            path: '/ga/home/policy/detail/:no',
            component: './ga/home/policy/detail',
            hideInMenu: true,
          },
        ],
      },
      {
        path: '/ga/authorization',
        icon: 'security-scan',
        name: '权限管理',
        routes: [
          {
            name: '用户管理',
            path: '/ga/authorization/user',
            component: './ga/authorization/user',
          },
          {
            name: '用户详情',
            path: '/ga/authorization/user/detail/:no',
            component: './ga/authorization/user/detail',
            hideInMenu: true,
          },
          {
            name: '角色管理',
            path: '/ga/authorization/rule',
            component: './ga/authorization/rule',
          },
          {
            name: '角色详情',
            path: '/ga/authorization/rule/detail/:no',
            component: './ga/authorization/rule/detail',
            hideInMenu: true,
          },
          {
            name: '部门管理',
            path: '/ga/authorization/department',
            component: './ga/authorization/department',
          },
          {
            name: '权限管理',
            path: '/ga/authorization/manage',
            component: './ga/authorization/manage',
          },
        ],
      },
    ],
  },
  {
    path: '/user',
    component: '../layouts/UserLayout',
    authority: ['admin', 'user', 'guest'],
    routes: [
      {
        path: '/user',
        redirect: '/user/login',
      },
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
      {
        component: '404',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      {
        path: '/',
        redirect: '/needs/my',
      },
      {
        path: '/needs',
        icon: 'container',
        name: '需求管理',
        routes: [
          {
            name: '我的需求',
            path: '/needs/my',
            component: './needs/my-needs',
          },
          {
            name: '发布需求',
            path: '/needs/push',
            component: './needs/push-needs',
          },
        ],
      },
      {
        path: '/product',
        icon: 'gold',
        name: '金融产品查询',
        component: './product',
      },
      {
        name: '产品详情',
        path: '/product/detail/:no',
        component: './product/detail',
        hideInMenu: true,
      },
      {
        name: '产品申请',
        path: '/product/apply',
        component: './product/apply',
        hideInMenu: true,
      },
      {
        path: '/evalution',
        icon: 'smile',
        name: '评价管理',
        routes: [
          {
            name: '待评价',
            path: '/evalution/todo',
            component: './evalution/todo',
          },
          {
            name: '我的评价',
            path: '/evalution/my',
            component: './evalution/my',
          },
          {
            name: '投诉详情',
            path: '/evalution/my/detail/:no',
            component: './evalution/my/detail',
            hideInMenu: true,
          },
          {
            name: '收到的评价',
            path: '/evalution/get',
            component: './evalution/get',
          },
          {
            name: '投诉详情',
            path: '/evalution/get/detail/:no',
            component: './evalution/get/detail',
            hideInMenu: true,
          },
        ],
      },
      {
        path: '/complaint',
        icon: 'bulb',
        name: '投诉管理',
        routes: [
          {
            name: '投诉信息',
            path: '/complaint/info',
            component: './complaint/info',
          },
          {
            name: '投诉详情',
            path: '/complaint/info/detail/:no',
            component: './complaint/info/detail',
            hideInMenu: true,
          },
          {
            name: '发起投诉',
            path: '/complaint/push',
            component: './complaint/push',
          },
        ],
      },
      {
        path: '/business',
        icon: 'bank',
        name: '企业中心',
        routes: [
          {
            name: '企业信息',
            path: '/business/info',
            component: './business/info',
          },
          {
            name: '修改密码',
            path: '/business/changepwd',
            component: './business/changepwd',
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
