import React, { PropTypes } from 'react';
import { Select, Button, Form } from 'antd';
import { Link } from 'dva/router';
import styles from './index.less';
import G2 from 'g2';

let chartCvs = {};
let chartWidth = 932;
const CHART_ID = 'flowChart';
const static_img = {
  station: {
    src: require('../../img/station.png'),
    rate: 220/145,
    width: 168
  },
  pot: {
    src: require('../../img/pot.png'),
    rate: 968/1560,
    width: 80
  },
  pots: {
    src: require('../../img/pots.png'),
    rate: 953/1563,
    width: 80
  },
  switch: {
    src: require('../../img/switch.png'),
    rate: 542/553,
    width: 28,
  },
  switch_black: {
    src: require('../../img/switch_black.png'),
    rate: 124/124,
    width: 18,
  },
  flow: {
    src: require('../../img/flow.png'),
    rate: 255/853,
    width: 12,
  }
};

// path 画笔
function combine(Command, x, y) {
  return Command + ' ' + x + ' ' + y;
}
const pan_line = {
  smallGreen: {
    lineWidth: 3,
    lineJoin: 'round',
    stroke: '#0ce60c'
  },
  normal: {
    lineWidth: 7,
    lineJoin: 'round',
    stroke: '#ffc000'
  },
  combinPoint: (point) => {
    return point.map(el => combine(el.type, el.x, el.y)).join('')
  }
};

/**
 * @name 注册 图形
 * x, y 为图形中心坐标
 */
const registImg = {
  registStationImg: () => {
    G2.Shape.registShape('point', 'station', {
      drawShape: function(cfg, group) {
        const { x, y } = cfg;
        const { width, rate, src } = static_img.station;
        const height = width / rate;

        return group.addShape('image', { // 由于开始的点设置了透明度，所以会显示连接线
          attrs: {
            x: x - width/2,
            y: y - height/2,
            width: width,
            height,
            // rotate: '180',
            img: src
          }
        });
      }
    });
  },
  // 注册 开关 的图形
  registSwitchImg: (small) => {
    G2.Shape.registShape('point', small ? 'switch_small' : 'switch', {
      drawShape: function(cfg, group) {
        const { x, y } = cfg;
        let { width, rate, src } = static_img.switch;

        width = small ? width / 2 : width;

        const height = width / rate;

        return group.addShape('image', { // 由于开始的点设置了透明度，所以会显示连接线
          attrs: {
            x: x - width/2,
            y: y - height/2 -2,
            width,
            height,
            // rotate: '180',
            img: src
          }
        });
      }
    });
  },
  registSwitchImgVertical: () => {
    G2.Shape.registShape('point', 'switch_vertical', {
      drawShape: function(cfg, group) {
        const { x, y } = cfg;
        const { width, rate, src } = static_img.switch;
        const height = width / rate;

        return group.addShape('image', { // 由于开始的点设置了透明度，所以会显示连接线
          attrs: {
            x: x - width,
            y: y + height,
            width,
            height,
            rotate: '-90',
            img: src
          }
        });
      }
    });
  },
  // 黑色开关, 用于无流量数据情况
  // registSwitchBlackImg: () => {
  //   G2.Shape.registShape('point', 'switch_black', {
  //     drawShape: function(cfg, group) {
  //       const { x, y } = cfg;
  //       const { width, rate, src } = static_img.switch_black;
  //       const height = width / rate;
  //
  //       return group.addShape('image', { // 由于开始的点设置了透明度，所以会显示连接线
  //         attrs: {
  //           x: x - width/2,
  //           y: y - height/2,
  //           width,
  //           height,
  //           // rotate: '180',
  //           img: src
  //         }
  //       });
  //     }
  //   });
  // },
  // 注册 流量计 的图形
  registFlowImg: () => {
    G2.Shape.registShape('point', 'flow', {
      drawShape: function(cfg, group) {
        const { x, y } = cfg;
        const { width, rate, src } = static_img.flow;
        const height = width / rate;

        return group.addShape('image', { // 由于开始的点设置了透明度，所以会显示连接线
          attrs: {
            x: x - width/2,
            y: y - height/2,
            width,
            height,
            // rotate: '180',
            img: src
          }
        });
      }
    });
  },
  registFlowImgVertical: () => {
    G2.Shape.registShape('point', 'flow_vertical', {
      drawShape: function(cfg, group) {
        const { x, y } = cfg;
        const { width, rate, src } = static_img.flow;
        const height = width / rate;

        return group.addShape('image', { // 由于开始的点设置了透明度，所以会显示连接线
          attrs: {
            x: x - 3.3*width,
            y: y + height/2,
            width,
            height,
            rotate: '-90',
            img: src
          }
        });
      }
    });
  },
  all: () => {
    registImg.registStationImg();
    registImg.registSwitchImg();
    registImg.registSwitchImg(true);
    registImg.registSwitchImgVertical();
    registImg.registFlowImgVertical();
    registImg.registFlowImg();
  }
};


/**
 * @name 注册 管道 path
 * x, y 为图形中心坐标
 */
const registPath = {
  // x,y 起点; x2
  addShape(group, panLine, { x, y, x2, y2, y3 }) {

    let point = [
      {type: 'L', x: x2, y: y2},
      {type: 'L', x: x2, y: y3},
    ];

    if (y) {
      point = [
        {type: 'M', x: x, y: y},
        {type: 'L', x: x, y: y2},
      ].concat(point);
    } else {
      point.unshift({type: 'M', x: x, y: y2})
    }

    return group.addShape('path', { // 由于开始的点设置了透明度，所以会显示连接线
      attrs: {
        path: pan_line.combinPoint(point),
        ...panLine
      }
    });
  },
  // 注册 station path small green
  stationPathSmallGreen() {
    G2.Shape.registShape('point', 'station_path_sg', {
      drawShape: function(cfg, group) {
        const { x, y } = cfg;
        const y2 = y+17;
        const x2 = x-48;
        const y3 = y+30;

        return registPath.addShape(group, pan_line.smallGreen, { x, y, x2, y2, y3 })
      }
    });
  },
  stationPath() {
    G2.Shape.registShape('point', 'station_path', {
      drawShape: function(cfg, group) {
        const { x, y } = cfg;
        const x2 = x-62;
        const y2 = y+14;
        const y3 = y+53;

        return registPath.addShape(group, pan_line.normal, { x, y, x2, y2, y3 })
      }
    });
  },
  all() {
    this.stationPathSmallGreen();
    this.stationPath();
  }
};

/**
 * @name 注册 管道 path
 * x, y 为图形中心坐标
 */
const textConfig = {
  // fontFamily: 'Hiragino Sans GB',
  fontSize: 14,
  textAlign: 'right',
  textBaseline: 'top',
  fill: 'black',
  // stroke: 'blue'
};

const unicodeText = {
  template: '\u2103',
  m3: 'm\u00B3',
};

const registText = {
  flowContent() {
    G2.Shape.registShape('point', 'flow_content', {
      drawShape: function(cfg, group) {
        const { x, y } = cfg;
        // debugger;
        const distanceY = 20;
        const x2 = x + 4;
        const x3 = x - 30;
        const y2 = y + 65;
        const y3 = y2 + distanceY;
        const y4 = y3 + distanceY;
        const y5 = y4 + distanceY;
        const y6 = y5 + distanceY;

        group.addShape('text', { // 由于开始的点设置了透明度，所以会显示连接线
          attrs: {
            x: x2,
            y: y2,
            text: '坨五站接收',
            ...textConfig,
          }
        });
        // 温度
        group.addShape('text', { // 由于开始的点设置了透明度，所以会显示连接线
          attrs: {
            x: x3,
            y: y3,
            text: '0',
            ...textConfig,
            fill: 'blue',
          }
        });
        group.addShape('text', { // 由于开始的点设置了透明度，所以会显示连接线
          attrs: {
            x: x2,
            y: y3,
            text: unicodeText.template,
            ...textConfig,
          }
        });
        // 压力
        group.addShape('text', { // 由于开始的点设置了透明度，所以会显示连接线
          attrs: {
            x: x3,
            y: y4,
            text: '0',
            ...textConfig,
            fill: 'blue',
          }
        });
        group.addShape('text', { // 由于开始的点设置了透明度，所以会显示连接线
          attrs: {
            x: x2,
            y: y4,
            text: 'KPa',
            ...textConfig,
          }
        });
        // 瞬时流量
        group.addShape('text', { // 由于开始的点设置了透明度，所以会显示连接线
          attrs: {
            x: x3,
            y: y5,
            text: '0',
            ...textConfig,
            fill: 'blue',
          }
        });
        group.addShape('text', { // 由于开始的点设置了透明度，所以会显示连接线
          attrs: {
            x: x2,
            y: y5,
            text: `${unicodeText.m3}/h`,
            ...textConfig,
          }
        });
        // 流量
        group.addShape('text', { // 由于开始的点设置了透明度，所以会显示连接线
          attrs: {
            x: x3,
            y: y6,
            text: '0',
            ...textConfig,
            fill: 'blue',
          }
        });
        group.addShape('text', { // 由于开始的点设置了透明度，所以会显示连接线
          attrs: {
            x: x2,
            y: y6,
            text: unicodeText.m3,
            ...textConfig,
          }
        });
      }
    });
  },
};

// 站 公共部分
const draCommon = {

  getStation: (x, y) => {
    const y2 = y+5;

    return [
      {name: '',type: 'station_path_sg',x, y: y+5},
      {name: '',type: 'station_path',x, y},
      {name: '',type: 'station',x, y},
      {name: '',type: 'switch_small',x: x-4,y: y+8},
      {name: '',type: 'switch_vertical',x: x-6,y: y+4},
    ]
  },

  getThreeSwitchFlow: (x, y) => {
    return [
      {name: '',type: 'switch_vertical',x, y: y+3},
      {name: '',type: 'flow_vertical',x, y: y+8},
      {name: '',type: 'switch_vertical',x, y: y+13},
    ]
  }
};

// 所有 站  绘画方法
const drawStation = {
  center: (data) => {
    const getStation = (x, y) => {
      const y2 = y+10;
      const x2 = x+6;

      return [
        {name: '',type: 'station_path_right',x, y},
        {name: '',type: 'station_path_right2',x, y},
        ...draCommon.getStation(x, y),
        ...draCommon.getThreeSwitchFlow(x2, y2),
        {name: '',type: 'switch_vertical',x: x2+4, y: y2+11},
        {name: 'my text',type: 'flow_content',x, y},
      ]
    };

    registImg.all();
    registPath.all();
    registText.flowContent();

    // 右1 管道
    G2.Shape.registShape('point', 'station_path_right', {
      drawShape: function(cfg, group) {
        const { x, y } = cfg;
        const x2 = x+49;
        const y2 = y-66;
        const y3 = y+160;

        return registPath.addShape(group, pan_line.normal, { x, y, x2, y2, y3 })
      }
    });
    // 右2 管道
    G2.Shape.registShape('point', 'station_path_right2', {
      drawShape: function(cfg, group) {
        let { x, y } = cfg;

        x = x+52;

        const x2 = x+34.5;
        const y2 = y+60;
        const y3 = y+160;

        return registPath.addShape(group, pan_line.normal, { x, x2, y2, y3 })
      }
    });

    return [
      ...getStation(10, 20),
      ...getStation(30, 20),
      ...getStation(50, 20),
      ...getStation(70, 20),
      ...getStation(90, 20),
    ];
  }
};

const drawChart = (dataArr) => {
  // debugger;

  var nodes = drawStation.center(dataArr);
  // var Stat = G2.Stat;
  var chart = new G2.Chart({
    id: CHART_ID,
    // width: chartWidth || (chartWidth = document.getElementById(CHART_ID).offsetWidth) || 800,
    width: chartWidth,
    height: 500,
    plotCfg: {
      margin: [0,0]
    }
  });
  // 不显示title
  chart.tooltip({
    title: null
  });
  // x,y的范围是0-100
  // 因为边的统计函数生成的数据范围默认是0-1，所以需要设置范围是 0-100 统一起点、边的数据范围
  var defs = {
    x: {min: 0,max:100},
    y: {min: 0, max:100},
    '..x': {min: 0,max:100},
    '..y': {min: 0,max:100}
  };
  // 创建节点视图
  var nodeView = chart.createView();
  nodeView.coord().reflect(); // 从上到下
  nodeView.axis(false);
  nodeView.source(nodes, defs);
  nodeView.point().position('x*y').color('steelblue')
    .shape('type', function(val) {
      return val;
    })
    // .legend(false);

  // .label('name', {
  //   offset: 0,
  //   labelEmit: true
  // });

  chart.render();

};

function FlowChart(props) {
  console.log('FlowChartLayout', props);

  // const { location, dispatch } = props;
  const { flowData, loading, init } = props.pageData;

  try {
    loading || Array.isArray(flowData.data) && drawChart(flowData.data);
  } catch (e) {
    // alert(e.Message);
  }

  return (
    <div>
      <h1 className={styles.title}>{flowData.title}</h1>
    </div>
  )
}

FlowChart.propTypes = {
  location: PropTypes.object,
  pageData: PropTypes.object.isRequired
};

export default FlowChart;
