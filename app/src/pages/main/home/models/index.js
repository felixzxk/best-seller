import { getResult } from "../services";

export default {
  namespace: 'home',
  state: {
    data: null
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/main/home') {
          dispatch({
            type: 'init'
          });
        }
      });
    }
  },
  effects: {
    *init(payload, {call}){
      const {data} = yield call(getResult)
      console.log(data)
    }
  },
  reducers: {
    upState(state, { payload }) {
      return { ...state, ...payload };
    }
  }
}