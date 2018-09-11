
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
  effects: {},
  reducers: {
    upState(state, { payload }) {
      return { ...state, ...payload };
    }
  }
}