import { getSiblings } from "../services";

export default {
  namespace: 'siblings',
  state: {
    data: [],
    keywords: ''
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, query }) => {
        if (pathname === '/main/siblings') {
          dispatch({
            type: 'init',
            payload: query
          });
        }
      });
    },
  },
  effects: {
    *init({ payload }, { put }) {
      yield put({
        type: 'search',
        payload,
      })
    },
    *search({ payload }, { call, put }) {
      const { data } = yield call(getSiblings, payload);
      console.log('data', data)
      yield put({
        type: 'upState',
        payload: {
          ...payload,
          data: data.list
        }
      })
    }
  },
  reducers: {
    upState(state, { payload }) {
      console.log('payload', payload)
      return { ...state, ...payload };
    },
  }
}