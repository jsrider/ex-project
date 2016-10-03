'use strict';

const groupArr = ['one', 'two', 'three', 'four', 'five'];
const groupArrCN = ['一', '二', '三', '四', '五'];
const keyArr = ['template', 'pressure', 'flow', 'total', 'tolerance'];

const getData = () => {
  const data = [];

  for (let i = 0; i < 10; i++) {
    let res = {
      key: i,
      time: '11: 10',
    };

    for (let gi = 0; gi < 5; gi++) {
      for (let el of keyArr) {
        res[el + groupArr[gi]] = Math.ceil(Math.random() * 100);
      }
    }

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
            groupArr,
            groupArrCN,
            keyArr
          }
        },
        message: ''
      });
    }, 500);
  },

};
