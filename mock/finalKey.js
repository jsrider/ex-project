'use strict';

// 17-06-1 用的 最终key
module.exports = {

  'GET /api/getFinalKey': function (req, res) {
    setTimeout(function () {
      res.json({
        success: 1,
        data: '1497484800000', // 2017-06-15
        message: '产品已激活'
      });
    }, 500);
  },

};
