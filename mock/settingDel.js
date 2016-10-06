'use strict';

const keyArr = ['id', 'setup', 'setdown', 'switch'];
const keyArrCN = ['ID', '上限', '下限', '开关'];

const getData = () => {
  const data = [];

  for (let i = 0; i < 40; i++) {
    let res = {
      setup: Math.ceil(Math.random() * 100),
      setdown: Math.ceil(Math.random() * 100),
      switch: '开',
      id: i,
    };

    data.push(res);
  }

  // console.log(data);
  return data;

};

module.exports = {

  'GET /api/settingDel': function (req, res) {
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
                modifyValue: '1,0', // 多个值用逗号分隔
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
            pageSize: 10
          }
        },
        message: ''
      });
    }, 500);
  },

};
