import { getSiblings } from "../services";

export default {
  namespace: 'siblings',
  state: {
    data: [],
    keywords: '',
    searchValue: '',
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, query }) => {
        if (pathname === '/main/siblings') {
          dispatch({
            type: 'init',
            payload: query.keywords,
          });
        }
      });
    },
  },
  effects: {
    *init({ payload }, { put, all }) {
      yield all([
        put({
          type: 'upState',
          payload: { searchValue: payload },
        }),
        put({
          type: 'search',
          payload,
        })
      ])
    },
    *search({ payload }, { call, put }) {
      const { data } = yield call(getSiblings, { keywords: payload });
      yield put({
        type: 'upState',
        payload: {
          keywords: payload,
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