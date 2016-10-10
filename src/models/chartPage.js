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
          const station = search.match(/station=([^\/]*)/i)[1];

          pageParams.addQueryParams({station});

          dispatch({
            type: 'queryData',
            payloadObj: pageParams.queryParams,
            menuKey: getMenuKeyFromUrl(pathname),
            station
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

      const { data } = yield call(query, { ...pageParams.queryParams, ...payloadObj, type: menuTitle }, menuType);

      if (typeof data === 'object' && data.success == 1) {
        yield put({
          type: 'querySuccess',
          data,
          apiType: menuType,
          current: payloadObj.current || 1,
        });
      }
    },
  },

  reducers: {
    showLoading(state, { station }) {
      return { ...state, loading: true, station };
    },
    querySuccess(state, { data, apiType, current }) {
      const res = {};

      res[`${apiType}Data`] = {
        ...state[`${apiType}Data`],
        ...data.data
      };

      current > 1 && (res.tableData.pagination.current = current);

      return { ...state, loading: false, ...res };
    },
  },
};
