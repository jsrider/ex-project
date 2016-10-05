import { query } from '../services/formSelects';
import { pageParams } from '../utils/pageParams';
import getMenuKeyFromUrl from '../utils/getMenuKeyFromUrl';

export default {
  namespace: 'pageData',

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
      history.listen(({pathname}) => {
        if (pathname.includes('chart') || pathname.includes('table')) {
          dispatch({
            type: 'queryData',
            payloadObj: pageParams.queryParams,
            menuKey: getMenuKeyFromUrl(pathname)
          });
        }
      });
    },
  },

  effects: {
    *queryData({ payloadObj, apiType, menuKey }, { put, call}) {
      // debugger;
      // const menuType = menuKey.split('-')[1];

      yield put({ type: 'showLoading' });

      const [menuTitle, menuType] = typeof menuKey === 'string' ? menuKey.split('-') : ['', apiType];

      const { data } = yield call(query, { ...pageParams.queryParams, ...payloadObj, type: menuTitle}, menuType);

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
