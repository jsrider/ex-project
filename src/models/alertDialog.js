import { query } from '../services/formSelects';
import { message } from 'antd';

export default {

  namespace: 'alertDialog',

  state: {
    title: '报警l!',
    alert: 0,
    data: [],
    params: {},
    pagination: {
      current: 1,
      pageSize: 1,
      total: 20,
    }
  },


  effects: {
    *fetchAlertDialog({ payload }, { put, call}) {
      // debugger;
      const { data } = yield call(query, payload, 'alertDialog');
      //
      if (typeof data === 'object' && data.success == 1) {

        yield put({
          type: 'fetchSuccess',
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
    *fetchDialogSubmit({ values }, { put, call}) {
      // debugger;
      const { data } = yield call(query, values, 'alertDialogSubmit');
      //
      if (typeof data === 'object' && data.success == 1) {

        yield put({
          type: 'fetchSuccess',
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
    *closeDialog({}, { put, call}) {
      // debugger;
      yield put({
        type: 'close',
        // apiType: menuType,
      });
    },

  },

  reducers: {
    close(state) {
      return { ...state, alert: 0 }
    },
    timeOut(state) {
      return { ...state, loading: false };
    },
    fetchSuccess(state, { data }) {

      return { ...state, ...data.data };
    },
  },

}
