'use strict';

const keyArr = ['tmplate', 'pressure', 'flow', 'totalFlow'];
// 中心站
// const stationTitle = ['坨五接收', '坨二接收', '坨三接收', '坨四接收', '坨六接收', '去汽车二队', '去总外输'];

// 坨一站
// const stationTitle = ['坨一产气', '轻烃进口', '轻烃出口', '去宁海', '坨一外供', '坨一自用', '坨一汇东', '镇政府'];
// 坨二站
// const stationTitle = ['坨二自用', '坨二产气', '轻烃进口', '轻烃出口', '坨二外输'];
// 坨三站
const stationTitle = ['坨三供轻烃', '坨三稳定', '坨三产气', '坨三自用', '看守所', '坨三外供', '殡仪馆', '坨三外输'];
// 坨四站
// const stationTitle = ['坨四产气', '轻烃进口', '轻烃出口', '坨四自用', '去总外输'];
// 坨五站
// const stationTitle = ['坨三来气', '坨五产气', '轻烃进口', '轻烃出口', '垦化', '坨五外输', '坨五备用'];
// 坨六站
// const stationTitle = ['坨六产气', '鲁胜', '坨六外输', '坨六自用'];
// 宁海站
// const stationTitle = ['宁海稳定', '宁海产气', '轻烃出口', '宁海自用', '发电', '坨一来气'];

const getData = () => {
  const data = [];

  for (let i = 0; i < 10; i++) {
    let res = {};

    keyArr.forEach(el => res[el] = Math.ceil(Math.random() * 100));

    data.push(res);
  }

  // data[2].flow = 0;
  // data[6].flow = 0;

  // console.log(data);
  return data;

};

module.exports = {

  'GET /api/flowChart': function (req, res) {
    setTimeout(function () {
      res.json({
        success: 1,
        data: {
          // title: '中心站流程图', // 可传,不传 用页面默认标题
          data: getData(),
          // data: [],
          params: {
            // stationTitle, // 可传,不传 用页面默认站点名称
            keyArr,
            alert: 1 // 1报警 0 不报警
          }
        },
        message: ''
      });
    }, 500);
  },

};
