import { query } from '../services/formSelects';
import { pageParams } from '../utils/pageParams';
import * as routerPath from '../utils/routerPath';

export default {
  namespace: 'alertPageData',

  state: {
    init: false,
    loading: true,
    tableData: {
      pagination: {
        current: 1,
        pageSize: 10
      }
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname.includes(routerPath.dealAlert)) {
          dispatch({
            type: 'queryData',
            payloadObj: {},
            menuKey: routerPath.dealAlert
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
    querySuccess(state, { data }) {
      const res = {};

      res.tableData = {
        ...state.tableData,
        ...data.data
      };

      return { ...state, loading: false, ...res };
    },
  },
};
