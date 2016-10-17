import { query } from '../services/formSelects';
import { message } from 'antd';
import lsCache from '../utils/cache';
import * as routerPath from '../utils/routerPath';

const cache = lsCache('user_login', true);

export default {

  namespace: 'userCenter',

  state: {
    login: cache.getValue() == 1 || false
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, search }) => {
        if (pathname.includes(routerPath.setSetting)) {
          dispatch({
            type: 'needLogin'
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
  },

}
