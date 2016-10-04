// 页面全局参数
export const pageParams = {
  queryParams: {},
  addQueryParams: (params) => {
    pageParams.queryParams = {
      ...pageParams.queryParams,
      ...params
    };
  },
};
