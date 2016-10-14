'use strict';

module.exports = {

  'GET /api/settingLogin': function (req, res) {
    setTimeout(function () {
      res.json({
        success: 1,
        data: '',
        message: '密码不正确!'
      });
    }, 500);
  },

  'GET /api/alertLogin': function (req, res) {
    setTimeout(function () {
      res.json({
        success: 1,
        data: '',
        message: '密码正确!'
      });
    }, 500);
  },

};
