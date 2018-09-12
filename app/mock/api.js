import mockjs from 'mockjs';

export default {
  'GET /api/getResult': mockjs.mock({
    info: {
      id: '@natural(10000,99999)', // 活动id
      name: 'xxx公司感恩有你， 最好外勤评选活动', // 活动名称
      createTime: '2018-09-09 12:12:12', // 活动创建时间
      endTime: '2018-11-30 23:59:59', // 预定结束时间
      startTime: '2018-09-09 00:00:00', // 预开始时间
      imgUrl: '', // 活动宣传图
      status: 1, // 1 正常, 0 失效
    },
    'global|20': [{
      id: '@natural(10000,99999)',
      name: '@cname',
      avatar: '@image(300x300)',
      'ranking|+1': 1,
      'count|100-499': 499,
      areaText: '@city(true) @county'
    }],
    personal: {
      count: 55, // 已获票数,
      ranking: 129, // 当前名次
    }
  })
}