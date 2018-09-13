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
        },
      ],
      page: 1,
      pageSize: 10, 
    }
  })
};
