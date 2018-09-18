import { getTop, getAciveInfo } from '../services';

export default {
  namespace: 'home',
  state: {
    top: null,
    info: null,
    ranking: null
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/main/home') {
          dispatch({
            type: 'init',
          });
        }
      });
    },
  },
  effects: {
    *init(payload, { call, put, all }) {
      // TODO 优化请求调用次数
      const [{data: top}, {data: info}] = yield all([
        call(getTop, 20),
        call(getAciveInfo),
      ]);
      yield put({
        type: 'upState',
        payload: {
          top, info
        }
      })
    },
  },
  reducers: {
    upState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
