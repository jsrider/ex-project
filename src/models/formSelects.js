import { query } from '../services/formSelects';
import * as routerPath from '../utils/routerPath';
import { message } from 'antd';

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
    timeOut(state) {
      return { ...state, loading: false };
    },
    querySuccess(state, { data }) {

      return { ...state, ...data.data };
    },
  },
};
