'use strict';


module.exports = {

  'GET /api/settingSubmit': function (req, res) {
    setTimeout(function () {
      res.json({
        success: 1,
        data: '',
        message: ''
      });
    }, 500);
  },

};
