import { query } from '../services/formSelects';
import { pageParams } from '../utils/pageParams';
import getMenuKeyFromUrl from '../utils/getMenuKeyFromUrl';
import { message } from 'antd';

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
    showLoading(state, { station }) {
      return { ...state, loading: true, station };
    },
    timeOut(state) {
      return { ...state, loading: false };
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
