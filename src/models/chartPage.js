import { query } from '../services/formSelects';

export default {
  namespace: 'chartPage',

  state: {
    loading: true,
    chartData: []
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname.indexOf('chart') > -1) {
          dispatch({
            type: 'queryData',
            payloadObj: location.query
          });
        }
      });
    },
  },

  effects: {
    *queryData({ payloadObj }, { put, call}) {
      // debugger;

      yield put({ type: 'showLoading' });

      const { data } = yield call(query, payloadObj);

      if (typeof data === 'object' && data.success) {
        yield put({
          type: 'querySuccess',
          data
        });
      }
    },
  },

  reducers: {
    showLoading(state) {
      return { ...state, loading: true };
    },
    querySuccess(state, { data }) {
      return { ...state, loading: false, chartData: data.data };
    },
  },
};
