import { query } from '../services/formSelects';
import { message } from 'antd';

const audioSrcLoc = 'http://' + location.host + '/alarm_sound.mp3';
const audioSrc = 'http://sm01.alicdn.com/L1/272/6837/static/web/chitu/others/alarm_sound.mp3';
const audio = new Audio(audioSrcLoc);

audio.onerror = () => {
  audio.src = audioSrc
};

// console.log( audio);
audio.loop = true;
// audio.play();

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
      const { data } = yield call(query, payload, 'alertDialog');
      //
      if (typeof data === 'object' && data.success == 1 && data.data && data.data.alert == 1) {

        audio.play();

        setTimeout(() => {
          audio.pause()
        }, data.data.params && data.data.params.audioTimer || 15000);

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
