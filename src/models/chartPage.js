import { query } from '../services/formSelects';

export default {
  namespace: 'chartPage',
  state: {
    loading: false,
  },
  effects: {
    *'queryData'({ payloadObj }, { put, call}) {
      debugger;

      yield put({ type: 'showLoading' });

      const { data } = yield call(query, payloadObj);

      if (data && !data.error) {
        yield put({
          type: 'querySuccess',
          data
        });
      }
    },
  },
  reducers: {
    showLoading(state) {
      return { ...state, loading: true };
    },
    querySuccess(state) {
      return { ...state, loading: false };
    },
  },
};
