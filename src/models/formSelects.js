import { query } from '../services/formSelects';
import * as routerPath from '../utils/routerPath';

export default {
  namespace: 'formSelects',

  state: {},

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, search }) => {
        if (pathname.includes(routerPath.dealAlert) || pathname.includes(routerPath.setSetting) || pathname.includes('chart')) {
          const station = search && search.match(/station=([^\/]*)/i)[1] || 'zhongxinzhan';

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

      // const [menuTitle, menuType] = typeof menuKey === 'string' ? menuKey.split('-') : [];

      const { data } = yield call(query, { station }, 'select');

      if (typeof data === 'object' && data.success == 1) {
        yield put({
          type: 'querySuccess',
          data,
          // apiType: menuType,
        });
      }
    },
  },

  reducers: {
    querySuccess(state, { data }) {

      return { ...state, ...data.data };
    },
  },
};
