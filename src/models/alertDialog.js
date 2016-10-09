import { query } from '../services/formSelects';

export default {

  namespace: 'alertDialog',

  state: {
    title: '报警l!',
    alert: 0,
    data: [],
    params: {},
    pagination: {
      current: 1,
      pageSize: 10,
      total: 20,
    }
  },


  effects: {
    *fetchAlertDialog({ payload }, { put, call}) {
      // debugger;
      const { data } = yield call(query, payload, 'alertDialog');
      //
      if (typeof data === 'object' && data.success) {

        yield put({
          type: 'fetchSuccess',
          data,
          // apiType: menuType,
        });
      }
    },
    *fetchDialogSubmit({ values }, { put, call}) {
      // debugger;
      const { data } = yield call(query, values, 'alertDialogSubmit');
      //
      if (typeof data === 'object' && data.success) {

        yield put({
          type: 'fetchSuccess',
          data,
          // apiType: menuType,
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
    fetchSuccess(state, { data }) {

      return { ...state, ...data.data };
    },
  },

}
