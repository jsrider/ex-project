import { query } from '../services/formSelects';
import { message } from 'antd';
import lsCache from '../utils/cache';
import * as routerPath from '../utils/routerPath';

const cache = lsCache('user_login', true);
const cacheKey = lsCache('user_key', false);
const alertTime = 1480521600000; // key value 12-1
const deadLineTime = 1483056000000; // 12-30
const finalKeyTime = 1496275200000; // 17-6-1

export default {

  namespace: 'userCenter',

  state: {
    login: cache.getValue() == 1 || false,
    needKey: false
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, search }) => {
        if (pathname.includes(routerPath.setSetting)) {
          dispatch({
            type: 'needLogin'
          })
        }

        if (new Date().getTime() < finalKeyTime && new Date().getTime() > alertTime && cacheKey.getValue() != alertTime) {
          dispatch({
            type: 'getKeyFile'
          })
        }
        if (new Date().getTime() > finalKeyTime && cacheKey.getValue() != finalKeyTime) {
          dispatch({
            type: 'getFinalKeyFile'
          })
        }
      });
    },
  },

  effects: {
    *loginFetch({ values, menuKey }, { put, call}) {
      // debugger;
      const menuType = menuKey.split('-')[1];

      // const [menuTitle, menuType] = typeof menuKey === 'string' ? menuKey.split('-') : [];

      const { data } = yield call(query, { password: values.password }, `${menuType === 'setting' ? 'setting' : 'alert'}Login`);
      //
      if (typeof data === 'object' && data.success == 1) {
        message.success('密码验证成功!', 4);

        cache.setValue('1');

        yield put({
          type: 'loginSuccess',
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
    *getKeyFile({ key }, { put, call}) {

      const { data } = yield call(query, {}, 'getKey');
      // debugger;

      if (typeof data === 'object' && data.success == 1 && data.data == alertTime) {
        cacheKey.setValue(alertTime);
      } else {
        if (typeof data === 'object' && typeof data.message === 'string') {
          alert(`error key msg: ${data.message}`);
        } else {
          alert('需要试用期激活码!')
        }

        //  deadLine
        if (new Date().getTime() > deadLineTime) {
          yield put({
            type: 'needKey'
          });
          alert('需要试用期激活码!')
        }
      }
    },
    *getFinalKeyFile({ key }, { put, call}) {

      const { data } = yield call(query, {}, 'getFinalKey');
      // debugger;

      if (typeof data === 'object' && data.success == 1 && data.data == finalKeyTime) {
        cacheKey.setValue(finalKeyTime);
      } else {
        if (typeof data === 'object' && typeof data.message === 'string') {
          alert(`error key msg: ${data.message}`);
        } else {
          alert('需要产品最终激活码!')
        }

        yield put({
          type: 'needKey'
        });
      }
    },
  },

  reducers: {
    timeOut(state) {
      return { ...state, loading: false };
    },
    loginSuccess(state) {
      return { ...state, login: true };
    },
    needLogin(state) {
      return { ...state, login: false };
    },
    needKey(state) {
      return { ...state, needKey: true };
    },
  },

}
