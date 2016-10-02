import dva from 'dva';

export default {
  namespace: 'sideMenu',
  state: {},
  reducers: {
    click(state, action) {
      console.log('sideMenu: ', state, action);

      return { ...state }
    },
  },
};
