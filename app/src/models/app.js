import { login, getMyRanking } from "../services";
export default {
  namespace: 'app',
  state: {
    user: null,
    status: null,
    tabHidden: false
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
        switch(pathname){
          case '/main/home':
          case '/main/funs':
          case '/main/personal': {
            dispatch({
              type: 'upState',
              payload: {
                tabHidden: false
              }
            });
            break;
          }
          default: {
            dispatch({
              type: 'upState',
              payload: {
                tabHidden: true
              }
            });
          }
        }
      });
    }
  },
  effects: {
    *init(payload, { call, put }) {
      const { data } = yield call(login);
      const { data: status } = yield call(getMyRanking);
      localStorage.setItem('userInfo', JSON.stringify({ user: data, status }))
      yield put({
        type: 'upState',
        payload: { user: data, status }
      })
    },
    *reSetUserInfo(payload, { put, select }) {
      const { user, status } = yield select(({ app }) => app)
      if (!user || !status) {
        const info = localStorage.getItem('userInfo');
        if (info) {
          yield put({
            type: 'upState',
            payload: JSON.parse(info)
          })
        } else {
          yield put({
            type: 'init',
          })
        }
      }
    }
  },
  reducers: {
    upState(state, { payload }) {
      return { ...state, ...payload };
    }
  }
}