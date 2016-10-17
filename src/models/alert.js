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
        pageSize: 10,
        total: 20,
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

      if (typeof data === 'object' && data.success == 1) {
        yield put({
          type: 'querySuccess',
          data,
          current: payloadObj.current || 1
          // apiType: menuType,
        });
      } else {
        if (typeof data === 'object' && typeof data.message === 'string') {
          message.error(data.message);
        } else {
          message.error('请求失败,请确保网络通畅,接口正确!');
        }
        yield put({
          type: 'timeOut',
        });
      }
    },
    *operateRecord({ payloadObj, opType }, { put, call}) {
      // debugger;
      const messageHide = message.loading('请求中...', 9);

      const { data } = yield call(query, { payloadObj, type: opType }, 'setting');

      if (typeof data === 'object' && data.success == 1) {
        messageHide();

        yield put({
          type: 'querySuccess',
          data,
          // apiType: menuType,
        });
      } else {
        if (typeof data === 'object' && typeof data.message === 'string') {
          message.error(data.message);
        } else {
          message.error('请求失败,请确保网络通畅,接口正确!');
        }
        yield put({
          type: 'timeOut',
        });
      }
    },
  },

  reducers: {
    showLoading(state) {
      return { ...state, loading: true };
    },
    timeOut(state) {
      return { ...state, loading: false };
    },
    querySuccess(state, { data, current }) {
      const res = {};

      res.tableData = {
        ...state.tableData,
        ...data.data,
      };

      res.tableData.pagination.current = current;

      return { ...state, loading: false, ...res };
    },
  },
};
