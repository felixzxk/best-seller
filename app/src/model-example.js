export default {
  namespace: 'funs',
  state: {},
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
    *init(payload, {call, put}){

    }
  },
  reducers: {
    upState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
}