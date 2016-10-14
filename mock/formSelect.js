'use strict';

module.exports = {

  'GET /api/select': function (req, res) {
    setTimeout(function () {
      res.json({
        success: 1,
        data: {
          monitor_point: {
            label: '检测点',
              init: 'all',
              data: [
              {
                title: '总览',
                value: 'all'
              },
              {
                title: '坨一站',
                value: 'yi'
              },
              {
                title: '坨二站',
                value: 'er'
              },
              {
                title: '坨三站',
                value: 'san'
              },
            ]
          },
        },
        message: ''
      });
    }, 500);
  },

};
