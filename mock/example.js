'use strict';

module.exports = {

  'GET /api/example': function (req, res) {
    setTimeout(function () {
      res.json({
        error: 0,
        data: ['foo', 'bar'],
        message: ''
      });
    }, 500);
  },

};
