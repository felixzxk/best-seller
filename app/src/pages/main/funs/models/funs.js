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
    *init(payload, { put, select }) {
      const { list } = yield select(({ funs }) => funs);
      if (list.length < 1) {
        yield put({
          type: 'load',
        });
      }
    },
    *load({ payload }, { call, put, select }) {
      yield put({
        type: 'upState',
        payload: { isLoading: true },
      });
      const { list: _list = [] } = yield select(({ funs }) => funs);
      try {
        const {
          data: { list, ...other },
        } = yield call(getFuns);
        const newData = { list: [..._list, ...list], ...other, isLoading: false };
        if (payload && payload.refresh) {
          newData.list = list;
        }
        yield put({
          type: 'upState',
          payload: newData,
        });
      } catch (e) {
      } finally {
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
