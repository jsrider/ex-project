'use strict';

const keyArr = ['setup', 'setdown', 'switch'];
const keyArrCN = ['上限', '下限', '开关'];

const getData = () => {
  const data = [];

  for (let i = 0; i < 50; i++) {
    let res = {
      setup: Math.ceil(Math.random() * 100),
      setdown: Math.ceil(Math.random() * 100),
      switch: '开',
    };

    data.push(res);
  }

  // console.log(data);
  return data;

};

module.exports = {

  'GET /api/setting': function (req, res) {
    setTimeout(function () {
      res.json({
        success: 1,
        data: {
          // title: '总览日曲线',
          data: getData(),
          params: {
            // width: "1500",
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
