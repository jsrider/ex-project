'use strict';

const keyArr = ['value', 'setup', 'setdown', 'switch'];
const keyArrCN = ['检测量', '上限', '下限', '开关'];

const getData = () => {
  const data = [];

  for (let i = 0; i < keyArr.length; i++) {
    let res = {
      value: keyArrCN[i],
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
            keyArrCN,
            setting: {
              switch: {
                modifyType: 'radio', // radio: 单选框; select: 下拉框
                modifyValue: '开,关', // 多个值用逗号分隔
                modifyText: '开,关', // value 对应的中文值你
                title: '开关'
              },
              id: {
                disabled: 1, // 1 禁止用户修改
                title: 'ID'
              }
            }
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
