'use strict';

const keyArr = ['tmplate', 'pressure', 'flow', 'totalFlow'];
// 中心站
// const stationTitle = ['坨五接收', '坨二接收', '坨三接收', '坨四接收', '坨六接收', '去汽车二队', '去总外输'];

// 坨一站
// const stationTitle = ['坨一产气', '轻烃进口', '轻烃出口', '去宁海', '坨一外供', '坨一自用', '坨一汇东', '镇政府'];
// 坨二站
const stationTitle = ['坨二自用', '坨二产气', '轻烃进口', '轻烃出口', '坨二外输'];

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
            stationTitle,
            keyArr,
            alert: 1 // 1报警 0 不报警
          }
        },
        message: ''
      });
    }, 500);
  },

};
