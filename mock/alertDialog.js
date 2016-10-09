'use strict';

const keyArr = ['altime', 'site', 'check', 'exception', 'value'];
const keyArrCN = ['报警时间', '站点', '检测点', '异常量', '数值'];

const getData = () => {
  const data = [];

  for (let i = 0; i < 50; i++) {
    let res = {
      altime: '10:' + Math.ceil(Math.random() * 60),
      site: Math.ceil(Math.random() * 100),
      check: '西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号',
      exception: Math.ceil(Math.random() * 100),
      value: Math.ceil(Math.random() * 100),
    };

    data.push(res);
  }

  // console.log(data);
  return data;

};

module.exports = {

  'GET /api/alertDialog': function (req, res) {
    setTimeout(function () {
      res.json({
        success: 1,
        data: {
          title: '报警!',
          alert: 1, // 1 显示报警, 0:不报警
          data: getData(),
          params: {
            // width: "1500",
            keyArr,
            keyArrCN
          },
          pagination: {
            pageSize: 10,
            total: 90,
          }
        },
        message: ''
      });
    }, 500);
  },

};
