import { query } from '../services/formSelects';
import { pageParams } from '../utils/pageParams';
import getMenuKeyFromUrl from '../utils/getMenuKeyFromUrl';

export default {
  namespace: 'pageData',

  state: {
    init: false,
    loading: true,
    chartData: {},
    station: '',
    tableData: {
      pagination: {
        current: 1,
        pageSize: 10
      }
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, search }) => {
        if (pathname.includes('chart') || pathname.includes('table')) {
          dispatch({
            type: 'queryData',
            payloadObj: pageParams.queryParams,
            menuKey: getMenuKeyFromUrl(pathname),
            station: search.match(/station=([^\/]*)/i)[1]
          });
        }
      });
    },
  },

  effects: {
    *queryData({ payloadObj, apiType, menuKey, station }, { put, call}) {
      // debugger;
      // const menuType = menuKey.split('-')[1];

      yield put({ type: 'showLoading', station });

      const [menuTitle, menuType] = typeof menuKey === 'string' ? menuKey.split('-') : ['', apiType];

      const { data } = yield call(query, { ...pageParams.queryParams, ...payloadObj, type: menuTitle, station}, menuType);

      if (typeof data === 'object' && data.success) {
        yield put({
          type: 'querySuccess',
          data,
          apiType: menuType,
        });
      }
    },
  },

  reducers: {
    showLoading(state, { station }) {
      return { ...state, loading: true, station };
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
