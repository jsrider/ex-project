import { query } from '../services/formSelects';
import { pageParams } from '../utils/pageParams';
import * as routerPath from '../utils/routerPath';
import getMenuKeyFromUrl from '../utils/getMenuKeyFromUrl';

export default {
  namespace: 'flowChart',

  state: {
    init: false,
    loading: false,
    flowData: {
      title: '中心站流程图',
      data: []
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, search }) => {
        if (pathname.includes(routerPath.liuchengTu)) {
          const station = search.match(/station=([^\/]*)/i)[1];

          // pageParams.addQueryParams({station});

          // dispatch({
          //   type: 'setStation',
          //   station
          // });
          dispatch({
            type: 'queryData',
            // payloadObj: pageParams.queryParams,
            // menuKey: getMenuKeyFromUrl(pathname),
            station
          });
        }
      });
    },
  },

  effects: {
    *queryData({ station }, { put, call}) {
      // debugger;
      // const menuType = menuKey.split('-')[1];

      yield put({ type: 'showLoading', station });

      // const [menuTitle, menuType] = typeof menuKey === 'string' ? menuKey.split('-') : [];

      const { data } = yield call(query, { station }, 'flowChart');

      if (typeof data === 'object' && data.success) {
        yield put({
          type: 'querySuccess',
          data,
          // apiType: menuType,
        });
      }
    },
  },

  reducers: {
    showLoading(state, { station }) {
      return { ...state, loading: true, station, init: false };
    },
    querySuccess(state, { data }) {

      return { ...state, loading: false, flowData: data.data, init: true };
    },
  },
};
