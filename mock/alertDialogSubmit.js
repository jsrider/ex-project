'use strict';

module.exports = {

  'GET /api/alertDialogSubmit': function (req, res) {
    setTimeout(function () {
      res.json({
        success: 1,
        data: {
          alert: 0, // 1 显示报警, 0:不报警
        },
        message: ''
      });
    }, 500);
  },

};
