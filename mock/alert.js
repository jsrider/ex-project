'use strict';

const groupArr = ['one', 'two', 'three', 'four', 'five'];
const groupArrCN = ['一', '二', '三', '四', '五'];
const keyArr = ['altime', 'site', 'check', 'exception', 'dealtime', 'dealpeople', 'dealmsg'];
const keyArrCN = {
  altime: '报警时间',
  site: '站点',
  check: '检测点',
  exception: '异常量',
  dealtime: '处理时间',
  dealpeople: '处理人',
  dealmsg: '处理信息'
};

const getData = () => {
  const data = [];

  for (let i = 0; i < 50; i++) {
    let res = {
      altime: '10:' + Math.ceil(Math.random() * 60),
      site: Math.ceil(Math.random() * 100),
      check: '西湖区湖底公园1号',
      exception: Math.ceil(Math.random() * 100),
      dealtime: Math.ceil(Math.random() * 100),
      dealpeople: 'xxx',
      dealmsg: 'sss'+Math.ceil(Math.random() * 100),
    };

    data.push(res);
  }

  // console.log(data);
  return data;

};

module.exports = {

  'GET /api/table': function (req, res) {
    setTimeout(function () {
      res.json({
        success: 1,
        data: {
          title: '总览日曲线',
          data: getData(),
          params: {
            width: "1500",
            groupArr,
            groupArrCN,
            keyArr,
            keyArrCN
          },
          pagination: {
            current: 1,
            pageSize: 20
          }
        },
        message: ''
      });
    }, 500);
  },

};
