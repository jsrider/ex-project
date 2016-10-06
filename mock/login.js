'use strict';

module.exports = {

  'GET /api/login': function (req, res) {
    setTimeout(function () {
      res.json({
        success: 1,
        data: '',
        message: '密码不正确!'
      });
    }, 500);
  },

};
