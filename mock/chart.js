'use strict';

module.exports = {

  'GET /api/chart': function (req, res) {
    setTimeout(function () {
      res.json({
        success: 1,
        data: {
          title: '总览日曲线',
          chartData: {
            template: {
              data: [
                {name: '温度', time: '2015-03-01T12:00:00.000Z', value: 0},
                {name: '温度', time: '2015-03-01T13:30:00.000Z', value: 1.28},
                {name: '温度', time: '2015-03-01T14:00:00.000Z', value: 2.5},
                {name: '温度', time: '2015-03-01T15:30:00.000Z', value: 3.2},
                {name: '温度', time: '2015-03-01T16:00:00.000Z', value: 4},
                {name: '温度', time: '2015-03-01T17:00:00.000Z', value: 5.8},
                {name: '温度', time: '2015-03-01T18:00:00.000Z', value: 6.4},
                {name: '温度', time: '2015-03-01T19:00:00.000Z', value: 7.28},
                {name: '温度', time: '2015-03-01T20:00:00.000Z', value: 8.88},
                {name: '温度', time: '2015-03-01T21:00:00.000Z', value: 9.1},
              ],
              config: {
                height: 220,
              }
            },
            pressure: {
              data:[
                {name: '压力', time: '2015-03-01T12:00:00.000Z', value: 0},
                {name: '压力', time: '2015-03-01T13:30:00.000Z', value: 300},
                {name: '压力', time: '2015-03-01T14:00:00.000Z', value: 500.5},
                {name: '压力', time: '2015-03-01T15:30:00.000Z', value: 900.2},
                {name: '压力', time: '2015-03-01T16:00:00.000Z', value: 1000},
                {name: '压力', time: '2015-03-01T17:00:00.000Z', value: 1235.8},
                {name: '压力', time: '2015-03-01T18:00:00.000Z', value: 1326.4},
                {name: '压力', time: '2015-03-01T19:00:00.000Z', value: 1522.28},
                {name: '压力', time: '2015-03-01T20:00:00.000Z', value: 1799.88},
                {name: '压力', time: '2015-03-01T21:00:00.000Z', value: 1800.1},
              ],
              config: {
                height: 220,
              }
            },
            flow: {
              data:[
                {name: '瞬时流量', time: '2015-03-01T12:00:00.000Z', value: 70},
                {name: '瞬时流量', time: '2015-03-01T13:30:00.000Z', value: 71.28},
                {name: '瞬时流量', time: '2015-03-01T14:00:00.000Z', value: 74.5},
                {name: '瞬时流量', time: '2015-03-01T15:30:00.000Z', value: 79.2},
                {name: '瞬时流量', time: '2015-03-01T16:00:00.000Z', value: 80},
                {name: '瞬时流量', time: '2015-03-01T17:00:00.000Z', value: 83.8},
                {name: '瞬时流量', time: '2015-03-01T18:00:00.000Z', value: 88.4},
                {name: '瞬时流量', time: '2015-03-01T19:00:00.000Z', value: 90.28},
                {name: '瞬时流量', time: '2015-03-01T20:00:00.000Z', value: 95.88},
                {name: '瞬时流量', time: '2015-03-01T21:00:00.000Z', value: 100.111},
              ],
              config: {
                height: 220,
              }
            },
          }
        },
        message: ''
      });
    }, 500);
  },

};
