import { query } from '../services/formSelects';

export default {
  namespace: 'chartPage',

  state: {
    loading: true,
    chartData: {}
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname.includes('chart')) {
          dispatch({
            type: 'queryData',
            payloadObj: location.query,
            apiType: 'chart'
          });
        } else if (location.pathname.includes('table')) {
          dispatch({
            type: 'queryData',
            payloadObj: location.query,
            apiType: 'table'
          });
        }
      });
    },
  },

  effects: {
    *queryData({ payloadObj, apiType }, { put, call}) {
      // debugger;

      yield put({ type: 'showLoading' });

      const { data } = yield call(query, payloadObj, apiType);

      if (typeof data === 'object' && data.success) {
        yield put({
          type: 'querySuccess',
          data,
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
