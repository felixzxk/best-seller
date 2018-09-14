import { getFuns } from '../services';

export default {
  namespace: 'funs',
  state: {
    list: [],
    isLoading: false,
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
      yield put({
        type: 'load',
      });
    },
    *load(payload, { call, put }) {
      yield put({
        type: 'upState',
        payload: { isLoading: true },
      });
      try {
        const { data } = yield call(getFuns);
        yield put({
          type: 'upState',
          payload: { ...data, isLoading: false },
        });
      } catch (e) {} finally {
        yield put({
          type: 'upState',
          payload: { isLoading: false },
        });
      }
    },
  },
  reducers: {
    upState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
