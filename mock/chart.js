'use strict';

module.exports = {

  'GET /api/chart': function (req, res) {
    setTimeout(function () {
      res.json({
        error: 1,
        data: ['foo', 'bar'],
        message: ''
      });
    }, 500);
  },

};
