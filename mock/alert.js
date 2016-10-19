'use strict';

const keyArr = ['altime', 'site', 'check', 'exception', 'value', 'dealtime', 'dealpeople', 'dealmsg'];
const keyArrCN = ['报警时间', '站点', '检测点', '异常量', '数值', '处理时间', '处理人', '处理信息'];
const widthArr = [150, 100, 100, 80, 100, 100, 100, 0]; // 0 自适应

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

  'GET /api/alert': function (req, res) {
    setTimeout(function () {
      res.json({
        success: 1,
        data: {
          // title: '总览日曲线',
          data: getData(),
          params: {
            // width: "1500",
            keyArr,
            keyArrCN,
            widthArr
          },
          pagination: {
            pageSize: 20,
            total: 90,
          }
        },
        message: ''
      });
    }, 500);
  },

};
