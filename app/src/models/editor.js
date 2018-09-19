import { login } from '../services';
export default {
  namespace: 'editor',
  state: {
    data: {},
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/edit') {
          dispatch({
            type: 'init',
          });
        }
      });
    },
  },
  effects: {
    *init(payload, { call, put }) {
      const { data } = yield call(login);
      yield put({
        type: 'upState',
        payload: { data },
      });
    },
  },
  reducers: {
    upState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
