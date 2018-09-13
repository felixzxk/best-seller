import { getFuns } from '../services';

export default {
  namespace: 'funs',
  state: {
    list: [],
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/main/funs') {
          dispatch({
            type: 'init',
          });
        }
      });
    },
  },
  effects: {
    *init(payload, { call, put }) {
      const { data } = yield call(getFuns);
      yield put({
        type: 'upState',
        payload: data,
      });
    },
  },
  reducers: {
    upState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
