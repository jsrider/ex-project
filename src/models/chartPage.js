import { query } from '../services/formSelects';
import { pageParams } from '../utils/pageParams';

export default {
  namespace: 'chartPage',

  state: {
    init: false,
    loading: true,
    chartData: {},
    tableData: {
      pagination: {
        current: 1,
        pageSize: 10
      }
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname.includes('chart')) {
          dispatch({
            type: 'queryData',
            payloadObj: pageParams.queryParams,
            apiType: 'chart'
          });
        } else if (location.pathname.includes('table')) {
          dispatch({
            type: 'queryData',
            payloadObj: pageParams.queryParams,
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

      const { data } = yield call(query, { ...pageParams.queryParams, ...payloadObj }, apiType);

      if (typeof data === 'object' && data.success) {
        yield put({
          type: 'querySuccess',
          data,
          apiType,
        });
      }
    },
  },

  reducers: {
    showLoading(state) {
      return { ...state, loading: true };
    },
    querySuccess(state, { data, apiType }) {
      const res = {};

      res[`${apiType}Data`] = {
        ...state[`${apiType}Data`],
        ...data.data
      };

      return { ...state, loading: false, ...res };
    },
  },
};
