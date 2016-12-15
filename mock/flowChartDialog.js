'use strict';

const keyArr = ['model', 'manufactureDate', 'manufactureNumber', 'time', 'backTime', 'nextTime', 'useStatus', 'tips'];
const keyArrCN = ['型号', '出厂日期', '出厂编号', '标定时间', '取回时间', '下次标定时间', '使用现状', '备注'];

module.exports = {

  'GET /api/flowChartDialog': function (req, res) {
    setTimeout(function () {
      res.json({
        success: 1,
        data: {
          title: '传感器详情',
          params: {
            // width: "1500",
            keyArr,
            options: {
              model: 'AAA',
              manufactureDate: '2000/1/1',
              manufactureNumber: '10000001',
              time: '2000/1/2',
              backTime: '2001/1/3',
              nextTime: '2004/1/4',
              useStatus: '正常',
              tips: '备注'
            },
            setting: {
              model: {
                disabled: 1, // 1 禁止用户修改
                title: keyArrCN[0]
              },
              manufactureDate: {
                title: keyArrCN[1],
                modifyType: 'date'
              },
              manufactureNumber: {
                title: keyArrCN[2],
              },
              time: {
                title: keyArrCN[3],
                modifyType: 'date'
              },
              backTime: {
                title: keyArrCN[4],
                modifyType: 'date'
              },
              nextTime: {
                title: keyArrCN[5],
                modifyType: 'date'
              },
              useStatus: {
                modifyType: 'radio', // radio: 单选框; select: 下拉框
                modifyValue: '正常,故障,其他', // 多个值用逗号分隔
                modifyText: '正常,故障,其他', // value 对应的中文值你
                title: keyArrCN[6]
              },
              tips: {
                modifyType: 'textarea', // radio: 单选框; select: 下拉框
                title: keyArrCN[7],
              },
            }
          },
        },
        message: ''
      });
    }, 500);
  },

};
