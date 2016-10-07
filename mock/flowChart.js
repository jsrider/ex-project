'use strict';

const keyArr = ['tmplate', 'pressure', 'flow', 'totalFlow'];

const getData = () => {
  const data = [];

  for (let i = 0; i < 10; i++) {
    let res = {};

    keyArr.forEach(el => res[el] = Math.ceil(Math.random() * 100));

    data.push(res);
  }

  // console.log(data);
  return data;

};

module.exports = {

  'GET /api/flowChart': function (req, res) {
    setTimeout(function () {
      res.json({
        success: 1,
        data: {
          title: '中心站流程图',
          data: getData(),
          params: {
            alert: 1 // 1报警 0 不报警
          }
        },
        message: ''
      });
    }, 500);
  },

};
