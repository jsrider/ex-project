'use strict';

module.exports = {

  'GET /api/flowChartDialogSubmit': function (req, res) {
    setTimeout(function () {
      res.json({
        success: 1,
        data: '',
        message: ''
      });
    }, 500);
  },

};
