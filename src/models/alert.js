import { query } from '../services/formSelects';
import { pageParams } from '../utils/pageParams';
import * as routerPath from '../utils/routerPath';
import getMenuKeyFromUrl from '../utils/getMenuKeyFromUrl';
import { message } from 'antd';

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
        if (pathname.includes(routerPath.dealAlert) || pathname.includes(routerPath.setSetting)) {
          dispatch({
            type: 'queryData',
            payloadObj: {},
            menuKey: getMenuKeyFromUrl(pathname)
          });
        }
      });
    },
  },

  effects: {
    *queryData({ payloadObj, menuKey }, { put, call}) {
      // debugger;
      // const menuType = menuKey.split('-')[1];

      yield put({ type: 'showLoading' });

      const [menuTitle, menuType] = typeof menuKey === 'string' ? menuKey.split('-') : [];

      const { data } = yield call(query, { ...pageParams.queryParams, ...payloadObj, type: menuTitle}, menuType);

      if (typeof data === 'object' && data.success) {
        yield put({
          type: 'querySuccess',
          data,
          // apiType: menuType,
        });
      }
    },
    *deleteRecord({ payloadObj }, { put, call}) {
      // debugger;
      const messageHide = message.loading('请求中...', 9);

      const { data } = yield call(query, { payloadObj }, 'settingDel');

      if (typeof data === 'object' && data.success) {
        messageHide();

        yield put({
          type: 'querySuccess',
          data,
          // apiType: menuType,
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
