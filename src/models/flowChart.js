import { query } from '../services/formSelects';
import { pageParams } from '../utils/pageParams';
import * as routerPath from '../utils/routerPath';
import getMenuKeyFromUrl from '../utils/getMenuKeyFromUrl';
import { message } from 'antd';

export default {
  namespace: 'flowChart',

  state: {
    init: false,
    loading: false,
    flowData: {
      // title: '中心站流程图',
      data: []
    },
    flowChartMonitorData: {},
    monitorSubmitSuccess: false,
    monitor: '',
    station: '',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, search }) => {
        if (pathname.includes(routerPath.liuchengTu) || pathname === routerPath.index) {
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

      yield put({ type: 'showLoading', station });

      // const [menuTitle, menuType] = typeof menuKey === 'string' ? menuKey.split('-') : [];

      const { data } = yield call(query, { station }, 'flowChart');

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

    *queryMonitorData({ station, monitor }, { put, call}) {
      // debugger;

      const { data } = yield call(query, { station, monitor }, 'flowChartDialog');

      if (typeof data === 'object' && data.success == 1) {
        yield put({
          type: 'queryMonitorSuccess',
          data,
          monitor,
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
    *monitorSubmit({ values }, { put, call}) {
      // debugger;

      const { data } = yield call(query, values, 'flowChartDialogSubmit');
      //
      if (typeof data === 'object' && data.success == 1) {
        message.success('修改成功!', 4);

        yield put({
          type: 'submitSuccess',
          // data,
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
    showLoading(state, { station }) {
      return { ...state, loading: true, station, init: false };
    },
    timeOut(state) {
      return { ...state, loading: false };
    },
    querySuccess(state, { data }) {

      return { ...state, loading: false, flowData: data.data, init: true, monitorSubmitSuccess: false };
    },
    queryMonitorSuccess(state, { data, monitor }) {

      return { ...state, flowChartMonitorData: data.data, monitorSubmitSuccess: true, monitor };
    },
    submitSuccess(state, { data }) {

      return { ...state, monitorSubmitSuccess: false };
    },
  },
};
