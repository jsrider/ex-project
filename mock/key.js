'use strict';

module.exports = {

  'GET /api/getKey': function (req, res) {
    setTimeout(function () {
      res.json({
        success: 1,
        data: '1476756501601',
        message: '产品已激活'
      });
    }, 500);
  },

};
