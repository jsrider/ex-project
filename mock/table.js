'use strict';

const getData = () => {
  const data = [];

  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      time: '10: 10',
      template: Math.ceil(Math.random() * 100),
      pressure: Math.ceil(Math.random() * 100),
      flow: Math.ceil(Math.random() * 100),
      total: Math.ceil(Math.random() * 100),
      tolerance: Math.ceil(Math.random() * 100),
    })
  }

  return data;
};

module.exports = {

  'GET /api/table': function (req, res) {
    setTimeout(function () {
      res.json({
        success: 1,
        data: {
          title: '总览日曲线',
          chartData: {
            "一": {
              data: getData(),
            },
            "二": {
              data: getData(),
            },
            "三": {
              data: getData(),
            },
            "四": {
              data: getData(),
            },
            "五": {
              data: getData(),
            },
            "六": {
              data: getData(),
            },
          }
        },
        message: ''
      });
    }, 500);
  },

};
