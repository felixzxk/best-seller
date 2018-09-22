import mockjs from 'mockjs';

export default {
  'GET /api/getAciveInfo': mockjs.mock({
    data: {
      id: '@natural(10000,99999)', // 活动id
      name: '感恩有你，xx好外勤', // 活动名称
      createTime: '2018-09-09 12:12:12', // 活动创建时间
      endTime: '2018-11-30 23:59:59', // 预定结束时间
      startTime: '2018-09-09 00:00:00', // 预开始时间
      imgUrl: '', // 活动宣传图
      status: 1, // 1 正常, 0 失效
    },
  }),
  'GET /api/getTop': mockjs.mock({
    'data|20': [
      {
        id: '@natural(10000,99999)',
        name: '@cname',
        avatar: '@image(300x300)',
        'ranking|+1': 1,
        'count|100-499': 499,
        areaText: '@city(true) @county',
      },
    ],
  }),
  'GET /api/getMyRanking': mockjs.mock({
    data: {
      count: 55, // 已获票数,
      ranking: 129, // 当前名次
    },
  }),
  'GET /api/getFuns': mockjs.mock({
    data: {
      'list|30': [
        {
          id: '@natural(10000,99999)',
          name: '@cname',
          avatar: '@image(64x64)',
          mobile: '13@natural(0,9)@string(number, 8)',
          voteTime: '2018-09-@natural(1,14) @time',
        },
      ],
      page: 1,
      pageSize: 10,
    },
  }),
  'POST /api/seller/login': mockjs.mock({
    data: {
      area: [], //省市区的id列表['', '', '']
      areaText: '@city(true) @county', //地区名称
      name: '@cname', // 姓名
      mobile: '13@natural(0,9)@string(number, 8)', // 手机号
      idCard: '412133198809098888', // 身份证号
      workNo: '2312312', // 工号
      createTime: '@datetime', // 创建时间YYYY-MM-DD HH:mm:ss
      id: '@natural(10000,99999)', // 业务员id
      avatar: '@image(64x64)', // 头像链接,
      role: 'seller', // seller 业务员, customer 客户
      status: 0, // 0 未投票, 1 已投票,
      token: '', // token
    },
  }),
  'GET /api/siblings': mockjs.mock({
    data: {
      'list|6': [
        {
          id: '@natural(10000,99999)', // 业务员id
          name: '@cname',
          count: '@natural(0,999)',
          ranking: '@natural(1,9999)',
          avatar: '@image(96x96)',
          areaText: '@city(true) @county', //地区名称
        }
      ]
    }
  }) 
};
