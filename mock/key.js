'use strict';

// 11-20 用的key
module.exports = {

  'GET /api/getKey': function (req, res) {
    setTimeout(function () {
      res.json({
        success: 1,
        data: '1479600000000',
        // data: '1478441969010',  11-20
        message: '产品已激活'
      });
    }, 500);
  },

};
