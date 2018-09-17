import { login } from "../services";
export default {
  namespace: 'app',
  state: {
    user: null
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/') {
          dispatch({
            type: 'init'
          });
        } else {
          dispatch({ type: 'reSetUserInfo' });
        }
      });
    }
  },
  effects: {
    *init(payload, { call, put }) {
      const { data } = yield call(login);
      console.log(data);
      yield put({
        type: 'upState',
        payload: { user: data }
      })
    }
  },
  reducers: {
    upState(state, { payload }) {
      return { ...state, ...payload };
    }
  }
}