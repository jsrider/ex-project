'use strict';

const groupArr = ['one', 'two', 'three', 'four', 'five'];
const groupArrCN = ['一', '二', '三', '四', '五'];
const keyArr = ['template', 'pressure', 'flow', 'total', 'tolerance'];
const widthArr = [100, 100, 100, 100, 0]; // 0 自适应
const keyArrCN = {
  template: '温度',
  pressure: '压力',
  flow: '流量',
  total: '累积',
  tolerance: '气量'
};

const getData = () => {
  const data = [];

  for (let i = 0; i < 50; i++) {
    let res = {
      time: '11: 10',
    };

    for (let gi = 0; gi < 5; gi++) {
      for (let el of keyArr) {
        res[groupArr[gi] + el] = Math.ceil(Math.random() * 100)
          + '<font color="red" >red font</font><br/><strong >strong font</strong>';
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
            width: "3000",
            groupArr,
            groupArrCN,
            keyArr,
            widthArr,
            keyArrCN
          },
          pagination: {
            pageSize: 20,
            total: 70,
          }
        },
        message: ''
      });
    }, 500);
  },

};
