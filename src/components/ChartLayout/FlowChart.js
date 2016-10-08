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
    stroke: '#ffc000',
    // lineDash: [50, 2]
  },

  // 流动箭头
  flowArrow: {
    lineDash: [20,10],
    // lineWidth: 2,
    arrow: true,
    lineJoin: 'round',
    // stroke: '#0ce60c'
    stroke: 'r (0.5, 0.5, 1) 0:#ffaa00 0.5:#00ffff 1:#11aacc'
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

        return group.addShape('image', {
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

        return group.addShape('image', {
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

        return group.addShape('image', {
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
  //       return group.addShape('image', {
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

        return group.addShape('image', {
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

        return group.addShape('image', {
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
    ];

    if (y3) {
      point.push(
        {type: 'L', x: x2, y: y3},
      )
    }


    if (y) {
      point = [
        {type: 'M', x: x, y: y},
        {type: 'L', x: x, y: y2},
      ].concat(point);
    } else {
      point.unshift({type: 'M', x: x, y: y2})
    }

    return group.addShape('path', {
      attrs: {
        path: pan_line.combinPoint(point),
        ...panLine
      }
    });
  },

  addArrowLine(group, panLine, { x1, y1, x2, y2 }) {
    const middleX = (x2 - x1) / 2;

    group.addShape('line', {
      attrs: {
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2,
        ...panLine
      }
    });

    // group.addShape('line', {
    //   attrs: {
    //     x1: middleX,
    //     y1: y1,
    //     x2: x2,
    //     y2: y2,
    //     ...panLine
    //   }
    // });
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
  flowContent({ dataObj, title, idx, keyArr }) {
    G2.Shape.registShape('point', `flow_content${idx}`, {
      drawShape: function(cfg, group) {
        const { x, y } = cfg;
        // debugger;
        const distanceY = 20;
        const x2 = x + 4;
        const x3 = x - 20;
        const y2 = y + 65;
        // const y3 = y2 + distanceY;
        // const y4 = y3 + distanceY;
        // const y5 = y4 + distanceY;
        // const y6 = y5 + distanceY;

        const flagArr = [unicodeText.template, 'KPa', `${unicodeText.m3}/h`, unicodeText.m3];

        keyArr.map((el, i) => {
          let targetY = y2 + distanceY * (i+1);

          group.addShape('text', {
            attrs: {
              x: x3,
              y: targetY,
              text: dataObj[el] || '0',
              ...textConfig,
              fill: 'blue',
            }
          });

          // 单位
          group.addShape('text', {
            attrs: {
              x: x2-15,
              y: targetY,
              text: flagArr[i],
              ...textConfig,
              textAlign: 'left',
            }
          });
        });

        group.addShape('text', {
          attrs: {
            x: x2,
            y: y2,
            text: title,
            ...textConfig,
          }
        });

        // group.addShape('rect', {
        //   attrs: {
        //     x: x2 - 60,
        //     y: y2 - 5,
        //     width: 80,
        //     height: 110,
        //     stroke: 'blue'
        //   }
        // });
      }
    });
  },
};

// 站 公共部分
const drawCommon = {

  getStation: (x, y) => {
    const y2 = y+5;

    return [
      {type: 'station_path_sg',x, y: y+5},
      {type: 'station_path',x, y},
      {type: 'station',x, y},
      {type: 'switch_small',x: x-4,y: y+8},
      {type: 'switch_vertical',x: x-6,y: y+4},
    ]
  },

  getThreeSwitch: (x, y) => {
    return [
      {type: 'switch',x, y},
      {type: 'flow',x: x+5, y: y-1.5},
      {type: 'switch',x: x+10, y},
    ]
  },

  getThreeSwitchFlow: (x, y) => {
    return [
      {type: 'switch_vertical',x, y: y+3},
      {type: 'flow_vertical',x, y: y+8},
      {type: 'switch_vertical',x, y: y+13},
    ]
  }
};

// 所有 站  绘画方法
const drawStation = {
  center: {
    staticView() {
      const resArr = [];

      const getStation = (x, y) => {
        const y2 = y + 13;
        const x2 = x + 6;

        return [
          {type: 'station_path_right', x, y},
          {type: 'station_path_right2', x, y},
          ...drawCommon.getStation(x, y),
          ...drawCommon.getThreeSwitchFlow(x2, y2),
          {type: 'switch_vertical', x: x2 + 4, y: y2 + 8},
        ]
      };

      registImg.all();
      registPath.all();

      // 右1 管道
      G2.Shape.registShape('point', 'station_path_right', {
        drawShape: function (cfg, group) {
          const {x, y} = cfg;
          const x2 = x + 49;
          const y2 = y - 66;
          const y3 = y + 180;

          return registPath.addShape(group, pan_line.normal, {x, y, x2, y2, y3})
        }
      });
      // 右2 管道
      G2.Shape.registShape('point', 'station_path_right2', {
        drawShape: function (cfg, group) {
          let {x, y} = cfg;

          x = x + 52;

          const x2 = x + 34.5;
          const y2 = y + 60;
          const y3 = y + 180;

          return registPath.addShape(group, pan_line.normal, {x, x2, y2, y3})
        }
      });
      // 底1 管道
      G2.Shape.registShape('point', 'station_path_bottom', {
        drawShape: function (cfg, group) {
          let {x, y} = cfg;

          x = x + 15;

          const x2 = x + 850;
          const y2 = y + 180;
          // const y3 = y+180;

          return registPath.addShape(group, pan_line.normal, {x, x2, y2})
        }
      });
      // 底2 底1 之间 管道
      G2.Shape.registShape('point', 'station_path_bottom1_2', {
        drawShape: function (cfg, group) {
          let {x, y} = cfg;

          x = 500;

          const x2 = x;
          const y2 = y + 180;
          const y3 = y + 360;
          // const y3 = y+180;

          return registPath.addShape(group, pan_line.normal, {x, x2, y2, y3})
        }
      });


      for (let i = 0; i < 5; i++) {
        resArr.push(...getStation(10 + i * 20, 20, i))
      }

      return resArr.concat([
        {type: 'station_path_bottom', x: 10, y: 20},
        {type: 'station_path_bottom', x: 10, y: 56},
        {type: 'station_path_bottom1_2', x: 10, y: 20},
        ...drawCommon.getThreeSwitch(25, 91),
        ...drawCommon.getThreeSwitch(75, 91),
      ])
    },
    dataView({ data, params }) {
      const { stationTitle, keyArr } = params || {};
      const resArr = [];

      const getStation = (x, y, idx) => {
        registText.flowContent({dataObj: data[idx], title: stationTitle[idx], keyArr, idx});

        return {type: `flow_content${idx}`,x, y}
      };

      // 底部文字
      registText.flowContent({dataObj: data[5], title: stationTitle[5], keyArr, idx: 5});
      registText.flowContent({dataObj: data[6], title: stationTitle[6], keyArr, idx: 6});

      if (Array.isArray(stationTitle)) {
        for (let i = 0; i < stationTitle.length; i++) {
          resArr.push(getStation(10 + i*20, 20, i))
        }
      }

      return resArr.concat([
        {type: 'flow_content5',x: 33, y: 50},
        {type: 'flow_content6',x: 83, y: 50},
      ])
    },
    flowView({ data, params }) {
      const { stationTitle, keyArr } = params || {};
      const resArr = [];

      // 底1 管道 流动
      G2.Shape.registShape('point', 'station_path_bottom_flow', {
        drawShape: function(cfg, group) {
          let { x, y } = cfg;
          const speed = 2;

          x = x+15;

          let x2 = new Date().getTime() % ((chartWidth - x) * speed);
          // console.log(x2)

          if (x2 < x + 50 || x2 > chartWidth) {
            x2 = chartWidth;
          }

          // const x2 = x+ 850 * percent;
          const y2 = y+180;
          // const y3 = y+180;

          return registPath.addArrowLine(group, pan_line.flowArrow, { x1: x, y1: y2, x2, y2 })
        }
      });

      return resArr.concat([
        {type: 'station_path_bottom_flow', x: 10, y: 20},
        {type: 'station_path_bottom_flow', x: 10, y: 56},
      ])
    }
  },
};

const drawChart = (data) => {
  // debugger;

  const nodes = drawStation.center.staticView();
  const nodesData = drawStation.center.dataView(data);
  const nodesFlow = drawStation.center.flowView(data);
  // var Stat = G2.Stat;
  var chart = new G2.Chart({
    id: CHART_ID,
    // width: chartWidth || (chartWidth = document.getElementById(CHART_ID).offsetWidth) || 800,
    animate: false,
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
  const defs = {
    x: {min: 0,max:100},
    y: {min: 0, max:100},
    '..x': {min: 0,max:100},
    '..y': {min: 0,max:100}
  };
  // 创建节点视图
  const nodeView = chart.createView();
  nodeView.coord().reflect(); // 从上到下
  nodeView.axis(false);
  nodeView.source(nodes, defs);
  nodeView.point().position('x*y')
    .shape('type', function(val) {
      return val;
    });

  // 创建管道 流动 视图
  const flowView = chart.createView();

  flowView.coord().reflect();
  flowView.axis(false);
  flowView.source(nodesFlow, defs);
  flowView.point().position('x*y')
    .shape('type', function(val) {
      return val;
    });

  const drawFlow = () => {
    flowView.changeData(drawStation.center.flowView(data));
    // window.requestAnimationFrame(drawFlow);
    // window.setTimeout(drawFlow, 100);
  };
  window.setInterval(drawFlow, 100);

  //
  // drawFlow();

  // 创建可变数据视图
  const dataView = chart.createView();

  dataView.coord().reflect();
  dataView.axis(false);
  dataView.source(nodesData, defs);
  dataView.point().position('x*y')
    .shape('type', function(val) {
      return val;
    });

  chart
    .tooltip(false)
    .render();

};

function FlowChart(props) {
  console.log('FlowChartLayout', props);

  // const { location, dispatch } = props;
  const { flowData, loading } = props.pageData;

  try {
    loading || Array.isArray(flowData.data) && drawChart(flowData);
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
