import { routerRedux } from 'dva/router';
import API from '@/api';
import Util from '@/util';
import { message } from 'antd';
const { handleLocalStorage } = Util;

export default {
  namespace: 'system',
  state: {
    collapsed: false,
  },
  effects: {
    *login({ payload }, { call, put }) {
      const res = yield call(API.login, payload);
      if (res) {
        const { code, msg } = res;
        if (code === 200) {
          const { token } = res;
          handleLocalStorage
            .setItem('_TOKEN', token, 3 * 3600 * 1000)
            .setItem('username', payload.username);
          yield put(routerRedux.push('/home'));
        } else if (code === 500) {
          message.error(msg);
        }
      }
    },
    *logout(_, { call }) {
      yield call(API.logout);
      handleLocalStorage.removeItem('_TOKEN');
    },
  },
  reducers: {
    toggleMenu(state, { payload }) {
      return {
        ...state,
        collapsed: payload,
      };
    },
  },
  subscriptions: {
    setupHistory({ history }) {
      history.listen(location => {
        //这里可以获取当前变化的history路径以及参数，hash所有值，这样就可以在路由地址变化后做处理
      });
    },
  },
};