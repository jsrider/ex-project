"use strict";

import * as stationObj from './stations';
import getMonitor from './stationMonitor';
import G2 from 'g2';

const CHART_WIDTH = 932; // chart 图表总宽度
const FLOW_SPEED = 2; // 管道水流速度

// 图片引用
const static_img = {
  station: {
    src: require('../img/station.png'),
    rate: 220/145,
    width: 168
  },
  pot: {
    src: require('../img/pot.png'),
    rate: 968/1560,
    width: 80
  },
  pots: {
    src: require('../img/pots.png'),
    rate: 953/1563,
    width: 80
  },
  switch: {
    src: require('../img/switch.png'),
    rate: 542/553,
    width: 28,
  },
  switch_black: {
    src: require('../img/switch_black.png'),
    rate: 124/124,
    width: 18,
  },
  flow: {
    src: require('../img/flow.png'),
    rate: 255/853,
    width: 12,
  },
  arrow_s: {
    src: require('../img/arrow-s.png'),
    rate: 40/8,
    height: 8,
    width: 40, // 单个箭头宽度
  },
  arrow_l: {
    src: require('../img/arrow-l.png'),
    rate: 100/14,
    height: 14,
    width: 100,
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
    // lineDash: [20,10],
    lineWidth: 3,
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
 * @name 注册图形
 * x, y 为图形中心坐标
 */
const registImg = {
  // 站
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
            width,
            height,
            // rotate: '180',
            img: src
          }
        });
      }
    });
  },
  registArrowImg: (small) => {
    G2.Shape.registShape('point', `flow_arrow_${small ? 's' : 'l'}`, {
      drawShape: function(cfg, group) {
        const { x, y } = cfg;
        const { height, rate, src, width } = small ? static_img.arrow_s : static_img.arrow_l;

        group.addShape('image', {
          attrs: {
            x: x,
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
  registArrowImgLeft: (small) => {
    G2.Shape.registShape('point', `flow_arrow_${small ? 's' : 'l'}_left`, {
      drawShape: function(cfg, group) {
        const { x, y } = cfg;
        const { height, rate, src, width } = small ? static_img.arrow_s : static_img.arrow_l;

        group.addShape('image', {
          attrs: {
            x: x,
            y: y + height/2,
            width,
            height,
            rotate: '180',
            img: src
          }
        });
      }
    });
  },
  registArrowImgVertical: (small) => {
    G2.Shape.registShape('point', `flow_arrow_${small ? 's' : 'l'}_vertical`, {
      drawShape: function(cfg, group) {
        const { x, y } = cfg;
        const { height, src, width } = small ? static_img.arrow_s : static_img.arrow_l;

        group.addShape('image', {
          attrs: {
            x: x - height / 2,
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
  registArrowImgVerticalDown: (small) => {
    G2.Shape.registShape('point', `flow_arrow_${small ? 's' : 'l'}_vertical_down`, {
      drawShape: function(cfg, group) {
        const { x, y } = cfg;
        const { height, src, width } = small ? static_img.arrow_s : static_img.arrow_l;

        group.addShape('image', {
          attrs: {
            x: x + height / 2,
            y: y - height,
            width,
            height,
            rotate: '90',
            img: src
          }
        });
      }
    });
  },
  // 罐子
  registPotImg: () => {
    G2.Shape.registShape('point', 'pot', {
      drawShape: function(cfg, group) {
        const { x, y } = cfg;
        const { width, rate, src } = static_img.pot;
        const height = width / rate;

        return group.addShape('image', {
          attrs: {
            x: x - width/2,
            y: y - height/2,
            width: width,
            height,
            img: src
          }
        });
      }
    });
  },
  registPotsImg: () => {
    G2.Shape.registShape('point', 'pots', {
      drawShape: function(cfg, group) {
        const { x, y } = cfg;
        const { width, rate, src } = static_img.pots;
        const height = width / rate;

        return group.addShape('image', {
          attrs: {
            x: x - width/2,
            y: y - height/2,
            width: width,
            height,
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
  registFlowImg() {
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
  registFlowImgVertical() {
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
  all() {
    this.registArrowImg();
    this.registArrowImg(true);
    this.registArrowImgLeft();
    this.registArrowImgLeft(true);
    this.registArrowImgVertical();
    this.registArrowImgVertical(true);
    this.registArrowImgVerticalDown();
    this.registArrowImgVerticalDown(true);
    this.registStationImg();
    this.registSwitchImg();
    this.registSwitchImg(true);
    this.registSwitchImgVertical();
    this.registFlowImgVertical();
    this.registFlowImg();
  }
};


/**
 * @name 注册 管道 path
 * x, y 为图形中心坐标
 */
const registPath = {
  // x,y 起点; x2
  addShape(group, panLine, point) {

    // let point = [
    //   {type: 'L', x: x2, y: y2},
    // ];
    //
    // if (y3) {
    //   point.push(
    //     {type: 'L', x: x2, y: y3},
    //   )
    // }
    //
    //
    // if (y) {
    //   point = [
    //     {type: 'M', x: x, y: y},
    //     {type: 'L', x: x, y: y2},
    //   ].concat(point);
    // } else {
    //   point.unshift({type: 'M', x: x, y: y2})
    // }

    return group.addShape('path', {
      attrs: {
        path: pan_line.combinPoint(point),
        ...panLine
      }
    });
  },

  addArrowLine(group, panLine, { x1, y1, x2, y2, type, middleX, middleY, dataArr }) {
    let distance = 0;

    switch (type) {
      case 'center':
        if (middleX) {
          distance = x2 - x1;
          x2 = middleX + distance/2;
          x1 = middleX - distance/2;
        } else {
        }
        if (dataArr[0] > 0) {
          group.addShape('line', {
            attrs: {
              x1: middleX || x1,
              y1: middleY || y2,
              x2: x1,
              y2: y1,
              ...panLine
            }
          });
        }

        if (dataArr[1] > 0) {
          group.addShape('line', {
            attrs: {
              x1: middleX || x1,
              y1: middleY || y1,
              x2: x2,
              y2: y2,
              ...panLine
            }
          });
        }
        break;

      default:
        const needDraw = Array.isArray(dataArr) ?
          dataArr[0] > 0 :
          true;

        needDraw && group.addShape('line', {
          attrs: {
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2,
            ...panLine
          }
        });
    }
  },
  // 注册 station path small green
  stationPathSmallGreen() {
    G2.Shape.registShape('point', 'station_path_sg', {
      drawShape: function(cfg, group) {
        const { x, y } = cfg;
        const y2 = y+17;
        const x2 = x-48;
        const y3 = y+30;

        const point = [
          {type: 'M', x: x, y: y},
          {type: 'L', x: x, y: y2},
          {type: 'L', x: x2, y: y2},
          {type: 'L', x: x2, y: y3},
        ];

        return registPath.addShape(group, pan_line.smallGreen, point)
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

        const point = [
          {type: 'M', x: x, y: y},
          {type: 'L', x: x, y: y2},
          {type: 'L', x: x2, y: y2},
          {type: 'L', x: x2, y: y3},
        ];

        return registPath.addShape(group, pan_line.normal, point)
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
  fontFamily: '"Microsoft YaHei", SimSun, sans-serif, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", Hiragino Sans GB',
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
  flowContent({ dataObj, title, idx, keyArr, vertical }) {
    const name = vertical ? `flow_content${idx}_vertical` : `flow_content${idx}`;

    G2.Shape.registShape('point', name, {
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
              fontWeight: 'bold'
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
              fontWeight: 'bold'
            }
          });
        });

        // title
        if (vertical) {
          group.addShape('text', {
            attrs: {
              x: x2,
              y: y2,
              text: title,
              ...textConfig,
              fontWeight: 'bold'
            }
          });
        } else {

          group.addShape('text', {
            attrs: {
              x: x - 19,
              y: y2 + 144,
              text: title,
              ...textConfig,
              textAlign: 'center',
              fontWeight: 'bold',
            }
          });
        }

      }
    });
  },
};

/**
 * @name 绘画站点构造函数
 * setting {Object} { title, staticView, staticViewPipeline, dataView, flowView, station }
 **/
class DrawStation {
  constructor(setting) {
    for (let key in setting) {
      if (setting.hasOwnProperty(key)) {
        this[key] = setting[key];
      }
    }

    this.initStationTitle();

    if (typeof this.params === 'object') {
      this.keyArr = this.params.keyArr;

      if (Array.isArray(this.params.stationTitle)) {
        this.stationTitle = this.params.stationTitle;
      }
    }
  }
}

// 原型链方法
DrawStation.prototype = {
  // 展示 站点 数据
  dataView() {
    const { data, params } = this;
    let { keyArr } = params || {};
    const resArr = [];
    const me = this;
    const stationTitle = this.stationTitle;

    const getStation = (x, y, idx, vertical) => {
      const name = vertical ? `flow_content${idx}_vertical` : `flow_content${idx}`;

      registText.flowContent({dataObj: data[idx], title: stationTitle[idx], keyArr, idx, vertical});

      return me.getTextBySwitch(name, x, y, vertical)
    };

    const dataXY = this.getSwitchData();

    // 数据文字
    if (Array.isArray(stationTitle)) {
      for (let i = 0; i < stationTitle.length; i++) {
        registText.flowContent({dataObj: data[i], title: stationTitle[i], keyArr, idx: i, vertical: dataXY[i].vertical});

        resArr.push(getStation(dataXY[i].x, dataXY[i].y, i, dataXY[i].vertical))
      }
    }

    return resArr
  },
  /**
   *
   * @param x
   * @param y
   * @param nums 方向上 箭头个数
   * @param vertical {Boolean}
   * @param small {Boolean}
   * @param plus {Boolean} true 坐标增加方向运动
     * @returns {Array}
     */

   getFlowArrow({x, y, nums, vertical, small, plus}) {
    const me = this;
    const res = [];

    let distance = small ? static_img.arrow_s.width : static_img.arrow_l.width;
    let type = small ? 'flow_arrow_s' : 'flow_arrow_l';

    type = vertical ?
      (plus ? `${type}_vertical_down` : `${type}_vertical`) :
      (plus ? type : `${type}_left`);

    distance = vertical ? distance * 1.5 : distance;

    const plusFun = (a, b) => plus ? a + b : a - b;

    // return x + static_img.arrow_l.wid
    const val = vertical ? y : x;

    for (let i = 0; i < nums; i++) {
      const end = plusFun(me.getFlowWidth({ distance }), distance * i) / CHART_WIDTH * 100;
      const resVal = plusFun(val, end);

      if (vertical) {
        res.push(
          {type, x, y: resVal}
        )
      } else {
        res.push(
          {type, x: resVal, y}
        )
      }
    }

    return res;
  },
  getStationFlowArrow({x, y, nums}) {
    const me = this;

    const res = me.getFlowArrow({ nums, small: true, plus: true, x: x-1, y: y-13.2 });

    x -= 7.8;
    y += 2.8;

    const opt = {x, y, nums, small: true, plus: true};

    // return x + static_img.arrow_l.wid
    return res.concat(
      [
        ...me.getFlowArrow(opt),
        ...me.getFlowArrow({...opt, x: x + 1.2, y: y + 8.5, vertical: true, plus: false}),
      ]
    )
  },


  flowView() {
    const { data } = this;
    const me = this;
    const resArr = [];

    resArr.push(
      ...me.getFlowArrow({x: 12, y: 56, nums: 3, small: false, plus: true, vertical: false}),
      ...me.getFlowArrow({x: 77, y: 56, nums: 3, small: false, plus: false, vertical: false}),
      ...me.getFlowArrow({x: 55.26, y: 58, nums: 4, small: true, plus: true, vertical: true}),
    );

    for (let i = 0; i < 5; i++) {
      if (me.getFlowNumByData(data[i]) > 0) {
        resArr.push(
          ...me.getStationFlowArrow({x: 10 + i * 20, y: 20, nums: 1, plus: true}),
          ...me.getFlowArrow({x: 15.3 + i * 20, y: 7, nums: 2, small: false, plus: true, vertical: true}),
        );
      }
    }

    // 坨一汇东
    if (me.getFlowNumByData(data[5]) > 0) {
      resArr.push(
        ...me.getFlowArrow({x: 30, y: 92, nums: 4, small: false, plus: false, vertical: false}),
      );
    }

    // 镇政府
    if (me.getFlowNumByData(data[6]) > 0) {
      resArr.push(
        ...me.getFlowArrow({x: 48, y: 92, nums: 4, small: false, plus: true, vertical: false}),
      );
    }

    return resArr;
  },

  // 各个站点 名称定义
  initStationTitle() {
    const station = this.station || stationObj.zhongxinzhan;
    const stationTitleObj = getMonitor(station);

    this.title = stationTitleObj.title;
    this.stationTitle = stationTitleObj.stationTitle;
  },

  getStation(x, y) {
    return [
      {type: 'station',x, y},
      {type: 'switch_small',x: x-4,y: y+8},
      {type: 'switch_vertical',x: x-6,y: y+4},
    ]
  },

  getStationPath(x, y) {
    return [
      {type: 'station_path_sg',x, y: y+5},
      {type: 'station_path',x, y},
      {type: 'station_path_right', x, y},
    ]
  },

  getTextBySwitch(type, x, y, vertical) {
    if (vertical) {
      return {type, x: x-7, y: y-11}
    }
    return {type, x: x+7, y: y-38}
  },

  getThreeSwitchFlow(x, y, vertical) {
    if (vertical) {
      return [
        {type: 'switch_vertical',x, y: y+3},
        {type: 'flow_vertical',x, y: y+8},
        {type: 'switch_vertical',x, y: y+13},
      ]
    } else {
      return [
        {type: 'switch',x, y},
        {type: 'flow',x: x+5, y: y-1.5},
        {type: 'switch',x: x+10, y},
      ]
    }
  },

  // 获取流动箭头 当前时间宽度
  getFlowWidth({start, end, distance}) {

    const speed = FLOW_SPEED * 1000;

    let res = new Date().getTime() % speed / speed * (distance);
    // console.log(res)

    return res;
  },

  // 当前数据 瞬时流量 flow字段
  getFlowNumByData(dataObj) {
    return dataObj[this.keyArr[2]]
  },


  // x,y station 的 x,y
  registStationFlowArrow(dataObj, keyArr, idx) {
    const me = this;

    G2.Shape.registShape('point', `station_right_flow${idx}`, {
      drawShape: function({x, y}, group) {

        const y2 = y - 66;
        const y3 = y + 180;

        const xFlow = x + 49;

        let yEnd = me.getFlowWidth({ y: y2, max: y3 });

        // 瞬时流量
        const dataArr = [me.getFlowNumByData(dataObj, keyArr)];

        if (dataArr[0] > 0) {
          // 罐子左下入口流量
          const [enterX1, enterX2, enterY1, enterY2] = [x-62, x-28, y+53, y+14];
          let enterXEnd = me.getFlowWidth({ x: enterX1, max: enterX2 });

          // console.log(enterXEnd);
          let pan = { ...pan_line.flowArrow, ...{arrow: false, lineDash: parseInt(enterXEnd) % 2 === 1 ? [5, 5] : [10, 5, 5, 5]} };

          registPath.addArrowLine(group, pan, { x1: enterX1, y1: enterY1, x2: enterX1, y2: enterY2 - 1.5 });
          registPath.addArrowLine(group, pan_line.flowArrow, { x1: enterX1, y1: enterY2, x2: enterXEnd, y2: enterY2 });

          // 罐子头部出口流量
          registPath.addArrowLine(group, pan, { x1: x, y1: y, x2: x, y2: y2 });
          registPath.addArrowLine(group, pan, { x1: x - 1.5, y1: y2, x2: xFlow + 1.5, y2: y2 });
        }

        return registPath.addArrowLine(group, pan_line.flowArrow, { x1: xFlow, y1: y2, x2: xFlow, y2: yEnd, dataArr })
      }
    });
  },
};


// 所有 站  绘画方法
const stationsObj = {};

stationsObj[stationObj.zhongxinzhan] = {
  staticView() {
    const resArr = [];

    const getStation = (x, y) => {
      const y2 = y + 13;
      const x2 = x + 6;

      return [
        ...this.getStation(x, y),
        ...this.getThreeSwitchFlow(x2, y2, true),
        {type: 'switch_vertical', x: x2 + 4, y: y2 + 8},
      ]
    };

    registImg.all();

    for (let i = 0; i < 5; i++) {
      resArr.push(...getStation(10 + i * 20, 20))
    }

    return resArr.concat([
      ...this.getThreeSwitchFlow(25, 91),
      ...this.getThreeSwitchFlow(75, 91),
    ])
  },
  staticViewPipeline() {
    const resArr = [];

    const getStation = (x, y) => {

      return [
        ...this.getStationPath(x, y),
        {type: 'station_path_right2', x, y},
      ]
    };

    registPath.all();

    // 右1 管道
    G2.Shape.registShape('point', 'station_path_right', {
      drawShape: function (cfg, group) {
        const {x, y} = cfg;
        const x2 = x + 49;
        const y2 = y - 66;
        const y3 = y + 180;

        const point = [
          {type: 'M', x: x, y: y},
          {type: 'L', x: x, y: y2},
          {type: 'L', x: x2, y: y2},
          {type: 'L', x: x2, y: y3},
        ];

        return registPath.addShape(group, pan_line.normal, point)
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

        const point = [
          {type: 'M', x: x, y: y2},
          {type: 'L', x: x2, y: y2},
          {type: 'L', x: x2, y: y3},
        ];

        return registPath.addShape(group, pan_line.normal, point)
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

        const point = [
          {type: 'M', x: x, y: y2},
          {type: 'L', x: x2, y: y2},
        ];

        return registPath.addShape(group, pan_line.normal, point)
      }
    });
    // 底2 底1 之间 管道
    G2.Shape.registShape('point', 'station_path_bottom1_2', {
      drawShape: function (cfg, group) {
        let {x, y} = cfg;

        x = 515;

        const x2 = x;
        const y2 = y + 180;
        const y3 = y + 360;
        // const y3 = y+180;

        const point = [
          {type: 'M', x: x, y: y2},
          {type: 'L', x: x2, y: y2},
          {type: 'L', x: x2, y: y3},
        ];

        return registPath.addShape(group, pan_line.normal, point)
      }
    });


    for (let i = 0; i < 5; i++) {
      resArr.push(...getStation(10 + i * 20, 20, i))
    }

    return resArr.concat([
      {type: 'station_path_bottom', x: 10, y: 20},
      {type: 'station_path_bottom', x: 10, y: 56},
      {type: 'station_path_bottom1_2', x: 10, y: 20},
    ])
  },
  dataView() {
    const { data, params } = this;
    const { keyArr } = params || {};
    const resArr = [];

    const stationTitle = this.stationTitle;

    const getStation = (x, y, idx) => {
      registText.flowContent({dataObj: data[idx], title: stationTitle[idx], keyArr, idx, vertical: true});

      return {type: `flow_content${idx}_vertical`,x, y}
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
      {type: 'flow_content5',x: 33, y: 53},
      {type: 'flow_content6',x: 83, y: 53},
    ])
  },
};

stationsObj[stationObj.tuoyizhan] = {
  getSwitchData() {
    const [x1, x2, x3] = [10, 40, 70];
    const [y1, y2, y3, y4] = [30, 60, 89, 92];

    return [
      {x: x2, y: y1},
      {x: x3, y: y1},
      {x: x3, y: y2},
      {x: x3, y: y4},
      {x: x2, y: y2},
      {x: x2, y: y4},
      {x: x1, y: y2},
      {x: x1, y: y3},
    ];
  },
  staticView() {
    let resArr = [];
    const y1 = 30;
    const me = this;

    const getStation = (x, y) => {

      return [
        ...me.getStation(x, y),
      ]
    };

    const switchDataXY = this.getSwitchData();

    registImg.all();
    registImg.registPotsImg();

    resArr.push(...getStation(10, 20));


    for (let el of switchDataXY) {
      resArr = resArr.concat([...me.getThreeSwitchFlow(el.x, el.y)])
    }

    return resArr.concat([
      {type: 'pots', x: 95, y: y1 + 4.6},
    ])
  },
  staticViewPipeline() {
    const resArr = [];
    const me = this;

    const getStation = (x, y) => {

      return [
        ...me.getStationPath(x, y),
      ]
    };

    registPath.all();

    // 上1 管道
    G2.Shape.registShape('point', 'station_path_right', {
      drawShape: function (cfg, group) {
        const {x, y} = cfg;
        const x2 = x + 59;
        const y2 = y - 66;
        const y3 = y + 55;
        const x3 = x2 + 700;

        const point = [
          {type: 'M', x: x, y: y},
          {type: 'L', x: x, y: y2},
          {type: 'L', x: x2, y: y2},
          {type: 'L', x: x2, y: y3},
          {type: 'L', x: x3, y: y3},
        ];

        return registPath.addShape(group, pan_line.normal, point)
      }
    });
    // 罐子 管道
    G2.Shape.registShape('point', 'pots_path', {
      drawShape: function (cfg, group) {
        const {x, y} = cfg;
        const x2 = x - 60;
        const y2 = y + 115;
        const x3 = x2 - 780;

        const point = [
          {type: 'M', x: x, y: y},
          {type: 'L', x: x2, y: y},
          {type: 'L', x: x2, y: y2},
          {type: 'L', x: x3, y: y2},
        ];

        return registPath.addShape(group, pan_line.normal, point)
      }
    });
    // 罐子 管道 右
    G2.Shape.registShape('point', 'pots_path_right', {
      drawShape: function (cfg, group) {
        const {x, y} = cfg;

        const x2 = x + 300;
        const y2 = y + 160;
        const x3 = x - 300;

        const point = [
          {type: 'M', x: x, y: y},
          {type: 'L', x: x, y: y2},
          {type: 'L', x: x2, y: y2},
          {type: 'L', x: x3, y: y2},
        ];

        return registPath.addShape(group, pan_line.normal, point)
      }
    });
    // 罐子 管道 左
    G2.Shape.registShape('point', 'pots_path_left', {
      drawShape: function (cfg, group) {
        const {x, y} = cfg;

        const xDis = 190;
        const y2 = y + 145;
        const x3 = x - xDis;

        const point = [
          {type: 'M', x: x, y: y},
          {type: 'L', x: x, y: y2},
          {type: 'L', x: x3, y: y2},
        ];

        return registPath.addShape(group, pan_line.normal, point)
      }
    });

    resArr.push(...getStation(10, 20));

    return resArr.concat([
      {type: 'pots_path', x: 95, y: 38},
      {type: 'pots_path_right', x: 60, y: 61},
      {type: 'pots_path_left', x: 25, y: 61},
    ])
  },
  flowView() {
    const { data } = this;
    const me = this;
    const resArr = [];

    resArr.push(
      // ...me.getFlowArrow({x: 5, y: 63, nums: 7, plus: false}),
      ...me.getFlowArrow({x: 60, y: 65, nums: 4, small: true, plus: true, vertical: true}),
    );

    // 坨一产气
    if (me.getFlowNumByData(data[0]) > 0) {
      resArr.push(
        ...me.getStationFlowArrow({x: 10, y: 20, nums: 1, plus: true }),
        ...me.getFlowArrow({x: 16.35, y: 7, nums: 3, small: true, plus: true, vertical: true}),
        ...me.getFlowArrow({x: 16, y: 31, nums: 3, small: false, plus: true, vertical: false}),
      );
    }

    // 轻烃进口
    if (me.getFlowNumByData(data[1]) > 0) {
      resArr.push(
        ...me.getFlowArrow({x: 50, y: 31, nums: 3, small: false, plus: true, vertical: false}),
      );
    }

    // 轻烃出口
    if (me.getFlowNumByData(data[2]) > 0) {
      resArr.push(
        ...me.getFlowArrow({x: 88.6, y: 40, nums: 3, small: true, plus: true, vertical: true}),
        ...me.getFlowArrow({x: 79, y: 61, nums: 2, small: false, plus: false, vertical: false}),
      );
    }

    // 去宁海
    if (me.getFlowNumByData(data[3]) > 0) {
      resArr.push(
        ...me.getFlowArrow({x: 60, y: 93, nums: 2, small: false, plus: true, vertical: false}),
      );
    }

    // 坨一外供
    if (me.getFlowNumByData(data[4]) > 0) {
      resArr.push(
        ...me.getFlowArrow({x: 45, y: 61, nums: 3, small: false, plus: false, vertical: false}),
      );
    }

    // 坨一自用
    if (me.getFlowNumByData(data[5]) > 0) {
      resArr.push(
        ...me.getFlowArrow({x: 48, y: 93, nums: 2, small: false, plus: false, vertical: false}),
      );
    }

    // 坨一汇东
    if (me.getFlowNumByData(data[6]) > 0) {
      resArr.push(
        ...me.getFlowArrow({x: 23, y: 61, nums: 2, small: false, plus: false, vertical: false}),
      );
    }

    // 镇政府
    if (me.getFlowNumByData(data[7]) > 0) {
      resArr.push(
        ...me.getFlowArrow({x: 25, y: 65, nums: 3, small: true, plus: true, vertical: true}),
        ...me.getFlowArrow({x: 12, y: 90, nums: 4, small: true, plus: false, vertical: false}),
      );
    }


    return resArr;
  },

};


stationsObj[stationObj.tuoerzhan] = {
  getSwitchData() {
    const [x1, x2, x3, x4, x5] = [21, 37, 50, 63, 78];
    const [y1, y2] = [30, 75];

    return [
      {x: x3, y: y1},
      {x: x1, y: y2},
      {x: x2, y: y2},
      {x: x4, y: y2},
      {x: x5, y: y2},
    ];
  },
  staticView() {
    let resArr = [];
    const me = this;

    const switchDataXY = this.getSwitchData();

    const getStation = (x, y) => {

      return [
        ...me.getStation(x, y),
      ]
    };

    registImg.all();
    registImg.registPotImg();

    resArr.push(...getStation(10, 20));

    for (let el of switchDataXY) {
      resArr = resArr.concat([...me.getThreeSwitchFlow(el.x, el.y)])
    }

    return resArr.concat([
      {type: 'pot', x: 55, y: 76.6},
    ])
  },
  staticViewPipeline() {
    const resArr = [];
    const me = this;

    const getStation = (x, y) => {

      return [
        ...me.getStationPath(x, y),
        {type: 'station_path_right2', x, y},
      ]
    };

    registPath.all();

    // 上1 管道
    G2.Shape.registShape('point', 'station_path_right', {
      drawShape: function (cfg, group) {
        const {x, y} = cfg;
        const x2 = x + 59;
        const y2 = y - 66;
        const y3 = y + 55;
        const x3 = x2 + 700;

        const point = [
          {type: 'M', x: x, y: y},
          {type: 'L', x: x, y: y2},
          {type: 'L', x: x2, y: y2},
          {type: 'L', x: x2, y: y3},
          {type: 'L', x: x3, y: y3},
        ];

        return registPath.addShape(group, pan_line.normal, point)
      }
    });

    // 上2 管道
    G2.Shape.registShape('point', 'station_path_right2', {
      drawShape: function (cfg, group) {
        const {x, y} = cfg;
        const x2 = x + 59;
        const y2 = y + 280;
        const x3 = x2 + 700;

        const point = [
          {type: 'M', x: x2, y: y},
          {type: 'L', x: x2, y: y2},
          {type: 'L', x: x3, y: y2},
        ];

        return registPath.addShape(group, pan_line.normal, point)
      }
    });

    resArr.push(...getStation(10, 20));

    return resArr
  },
  flowView() {
    const { data } = this;
    const me = this;
    const resArr = [];

    // resArr.push(
      // ...me.getFlowArrow({x: 5, y: 63, nums: 7, plus: false}),
      // ...me.getFlowArrow({x: 60, y: 65, nums: 4, small: false, plus: true, vertical: true}),
    // );

    // station
    resArr.push(
      ...me.getStationFlowArrow({x: 10, y: 20, nums: 1, plus: true }),
      ...me.getFlowArrow({x: 16.4, y: 5, nums: 1, small: false, plus: true, vertical: true}),
      ...me.getFlowArrow({x: 16, y: 31, nums: 2, small: false, plus: true, vertical: false}),
    );

    // 坨二自用
    if (me.getFlowNumByData(data[0]) > 0) {
      resArr.push(
        ...me.getFlowArrow({x: 50, y: 31, nums: 3, small: false, plus: true, vertical: false}),
      );
    }

    // 坨二产气
    if (me.getFlowNumByData(data[1]) > 0) {
      resArr.push(
        ...me.getFlowArrow({x: 16.4, y: 28, nums: 2, small: false, plus: true, vertical: true}),
        ...me.getFlowArrow({x: 16.4, y: 76, nums: 1, small: false, plus: true, vertical: false}),
      );
    }

    // 轻烃进口
    if (me.getFlowNumByData(data[2]) > 0) {
      resArr.push(
        ...me.getFlowArrow({x: 31.4, y: 76, nums: 1, small: false, plus: true, vertical: false}),
      );
    }

    // 轻烃进口
    if (me.getFlowNumByData(data[3]) > 0) {
      resArr.push(
        ...me.getFlowArrow({x: 57.4, y: 76, nums: 1, small: false, plus: true, vertical: false}),
      );
    }

    // 轻烃进口
    if (me.getFlowNumByData(data[4]) > 0) {
      resArr.push(
        ...me.getFlowArrow({x: 72.4, y: 76, nums: 1, small: false, plus: true, vertical: false}),
      );
    }

    return resArr;
  },
};

stationsObj[stationObj.tuosanzhan] = {
  getSwitchData() {
    const [x1, x2, x3, x4] = [21, 52, 63, 73];
    const [y1, y2, y3, y4] = [20, 30, 62, 92];

    return [
      {x: x1, y: y3 - 4, vertical: false},
      {x: x1, y: y4, vertical: false},
      {x: x1, y: y2, vertical: false},
      {x: x2, y: y1 - 13, vertical: true},
      {x: x4, y: y3, vertical: false},
      {x: x3, y: y2 + 5, vertical: true},
      {x: x4, y: y4, vertical: false},
      {x: 92.15, y: y1 - 13, vertical: true},
    ];
  },
  staticView() {
    let resArr = [];
    const me = this;

    const switchDataXY = this.getSwitchData();

    const getStation = (x, y) => {

      return [
        ...me.getStation(x, y),
      ]
    };

    registImg.all();
    registImg.registPotImg();

    resArr.push(...getStation(10, 20));

    for (let el of switchDataXY) {
      resArr = resArr.concat([...me.getThreeSwitchFlow(el.x, el.y, el.vertical)])
    }

    return resArr.concat([
      {type: 'switch_vertical', x: 40.7, y: 61},
    ])
  },
  staticViewPipeline() {
    const resArr = [];
    const me = this;

    const getStation = (x, y) => {

      return [
        ...me.getStationPath(x, y),
      ]
    };

    registPath.all();

    // 上1 管道
    G2.Shape.registShape('point', 'station_path_right', {
      drawShape: function (cfg, group) {
        const {x, y} = cfg;
        const x2 = x + 59;
        const y2 = y - 66;
        const y3 = y + 55;
        const x3 = x2 + 700;
        const y4 = y - 150;

        const point = [
          {type: 'M', x: x, y: y},
          {type: 'L', x: x, y: y2},
          {type: 'L', x: x2, y: y2},
          {type: 'L', x: x2, y: y3},
          {type: 'L', x: x3, y: y3},
          {type: 'L', x: x3, y: y4},
        ];

        return registPath.addShape(group, pan_line.normal, point)
      }
    });

    // 左下1 管道
    G2.Shape.registShape('point', 'path_left1', {
      drawShape: function (cfg, group) {
        const {x, y} = cfg;
        const x2 = x - 280;
        const y2 = y + 140;
        const y3 = y2 + 170;

        const x21 = x2 + 50;
        const y21 = y2 + 50;

        const point = [
          {type: 'M', x: x, y: y},
          {type: 'L', x: x, y: y2},
          {type: 'L', x: x2, y: y2},
          {type: 'M', x: x21, y: y2},
          {type: 'L', x: x21, y: y21},
          {type: 'L', x: x, y: y21},
          {type: 'L', x: x, y: y2},
          {type: 'M', x: x, y: y2},
          {type: 'L', x: x+50, y: y2},
          {type: 'L', x: x+50, y: y3},
          {type: 'L', x: x2, y: y3},
        ];

        return registPath.addShape(group, pan_line.normal, point)
      }
    });

    // 右下1 管道
    G2.Shape.registShape('point', 'path_right1', {
      drawShape: function (cfg, group) {
        const {x, y} = cfg;
        const x2 = x + 280;
        const y2 = y + 160;
        const y3 = y2 + 150;

        const point = [
          {type: 'M', x: x, y: y},
          {type: 'L', x: x, y: y2},
          {type: 'L', x: x2, y: y2},
          {type: 'M', x: x, y: y2},
          {type: 'L', x: x, y: y3},
          {type: 'L', x: x2, y: y3},
        ];

        return registPath.addShape(group, pan_line.normal, point)
      }
    });

    // 上左 管道
    G2.Shape.registShape('point', 'path_top_left', {
      drawShape: function (cfg, group) {
        const {x, y} = cfg;
        const y2 = y - 150;

        const point = [
          {type: 'M', x: x, y: y},
          {type: 'L', x: x, y: y2},
        ];

        return registPath.addShape(group, pan_line.normal, point)
      }
    });

    resArr.push(...getStation(10, 20));

    return resArr.concat([
      {type: 'path_left1', x: 40, y: 31},
      {type: 'path_right1', x: 62.3, y: 31},
      {type: 'path_top_left', x: 51.3, y: 31},
      // {type: 'path_top_left', x: 91.3, y: 31.8},
    ])
  },

  flowView() {
    const { data } = this;
    const me = this;
    const resArr = [];

    resArr.push(
      ...me.getFlowArrow({x: 38, y: 31, nums: 4, small: false, plus: true, vertical: false}),
      ...me.getFlowArrow({x: 62.3, y: 53, nums: 2, small: false, plus: true, vertical: true}),
      ...me.getFlowArrow({x: 40, y: 33, nums: 1, small: false, plus: true, vertical: true}),
      ...me.getFlowArrow({x: 38, y: 69, nums: 1, small: false, plus: false, vertical: false}),
    );

    // 坨三供轻烃
    if (me.getFlowNumByData(data[0]) > 0) {
      resArr.push(
        ...me.getFlowArrow({x: 29, y: 59, nums: 2, small: false, plus: false, vertical: false}),
      );
    }

    // 坨三稳定
    if (me.getFlowNumByData(data[1]) > 0) {
      resArr.push(
        ...me.getFlowArrow({x: 46.7, y: 59, nums: 1, small: true, plus: false, vertical: false}),
        ...me.getFlowArrow({x: 45.35, y: 90, nums: 1, small: false, plus: false, vertical: true}),
        ...me.getFlowArrow({x: 10, y: 93, nums: 2, small: false, plus: true, vertical: false}),
      );
    }

    // 坨三产气
    if (me.getFlowNumByData(data[2]) > 0) {
      resArr.push(
        ...me.getStationFlowArrow({x: 10, y: 20, nums: 1, plus: true}),
        ...me.getFlowArrow({x: 16.35, y: 7, nums: 3, small: true, plus: true, vertical: true}),
        ...me.getFlowArrow({x: 16, y: 31, nums: 2, small: false, plus: true, vertical: false}),
      );
    }

    // 坨三自用
    if (me.getFlowNumByData(data[3]) > 0) {
      resArr.push(
        ...me.getFlowArrow({x: 51.3, y: 31, nums: 1, small: false, plus: false, vertical: true}),
      );
    }

    // 看守所
    if (me.getFlowNumByData(data[4]) > 0) {
      resArr.push(
        ...me.getFlowArrow({x: 62, y: 63, nums: 2, small: false, plus: true, vertical: false}),
      );
    }

    // 坨三外供
    if (me.getFlowNumByData(data[5]) > 0) {
      resArr.push(
        ...me.getFlowArrow({x: 62.3, y: 31, nums: 1, small: false, plus: true, vertical: true}),
      );
    }

    // 殡仪馆
    if (me.getFlowNumByData(data[6]) > 0) {
      resArr.push(
        ...me.getFlowArrow({x: 62, y: 93, nums: 2, small: false, plus: true, vertical: false}),
      );
    }

    // 坨三外输
    if (me.getFlowNumByData(data[7]) > 0) {
      resArr.push(
        ...me.getFlowArrow({x: 91.45, y: 31, nums: 1, small: false, plus: false, vertical: true}),
      );
    }

    return resArr;
  },
};

stationsObj[stationObj.tuosizhan] = {
  getSwitchData() {
    const [x1, x2, x3] = [10, 30, 65];
    const [y1, y2, y3, y4] = [30, 62, 91, 96];

    return [
      {x: x2, y: y1},
      {x: x3, y: y1},
      {x: x3, y: y2},
      {x: x2, y: y2},
      {x: x2, y: y3},
    ];
  },
  staticView() {
    let resArr = [];
    const y1 = 30;
    const me = this;

    const getStation = (x, y) => {

      return [
        ...me.getStation(x, y),
      ]
    };

    const switchDataXY = this.getSwitchData();

    registImg.all();
    registImg.registPotsImg();

    resArr.push(...getStation(10, 20));


    for (let el of switchDataXY) {
      resArr = resArr.concat([...me.getThreeSwitchFlow(el.x, el.y)])
    }

    return resArr.concat([
      {type: 'pots', x: 95, y: y1 + 4.6},
    ])
  },
  staticViewPipeline() {
    const resArr = [];
    const me = this;

    const getStation = (x, y) => {

      return [
        ...me.getStationPath(x, y),
      ]
    };

    registPath.all();

    // 上1 管道
    G2.Shape.registShape('point', 'station_path_right', {
      drawShape: function (cfg, group) {
        const {x, y} = cfg;
        const x2 = x + 59;
        const y2 = y - 66;
        const y3 = y + 55;
        const x3 = x2 + 700;

        const point = [
          {type: 'M', x: x, y: y},
          {type: 'L', x: x, y: y2},
          {type: 'L', x: x2, y: y2},
          {type: 'L', x: x2, y: y3},
          {type: 'L', x: x3, y: y3},
        ];

        return registPath.addShape(group, pan_line.normal, point)
      }
    });
    // 罐子 管道
    G2.Shape.registShape('point', 'pots_path', {
      drawShape: function (cfg, group) {
        const {x, y} = cfg;
        const x2 = x - 60;
        const y2 = y + 125;
        const x3 = x2 - 780;

        const point = [
          {type: 'M', x: x, y: y},
          {type: 'L', x: x2, y: y},
          {type: 'L', x: x2, y: y2},
          {type: 'L', x: x3, y: y2},
        ];

        return registPath.addShape(group, pan_line.normal, point)
      }
    });
    // 罐子 管道 左
    G2.Shape.registShape('point', 'pots_path_left', {
      drawShape: function (cfg, group) {
        const {x, y} = cfg;

        const xDis = 440;
        const y2 = y + 145;
        const x3 = x - xDis;

        const point = [
          {type: 'M', x: x, y: y},
          {type: 'L', x: x, y: y2},
          {type: 'L', x: x3, y: y2},
        ];

        return registPath.addShape(group, pan_line.normal, point)
      }
    });

    resArr.push(...getStation(10, 20));

    return resArr.concat([
      {type: 'pots_path', x: 95, y: 38},
      // {type: 'pots_path_right', x: 50, y: 63},
      {type: 'pots_path_left', x: 52, y: 63},
    ])
  },
  flowView() {
    const { data } = this;
    const me = this;
    const resArr = [];


    // 坨四产气
    if (me.getFlowNumByData(data[0]) > 0) {
      resArr.push(
        ...me.getStationFlowArrow({x: 10, y: 20, nums: 1, plus: true}),
        ...me.getFlowArrow({x: 16.35, y: 7, nums: 3, small: true, plus: true, vertical: true}),
        ...me.getFlowArrow({x: 16, y: 31, nums: 3, small: false, plus: true, vertical: false}),
      );
    }

    // 轻烃进口
    if (me.getFlowNumByData(data[1]) > 0) {
      resArr.push(
        ...me.getFlowArrow({x: 48, y: 31, nums: 3, small: false, plus: true, vertical: false}),
      );
    }

    // 轻烃出口
    if (me.getFlowNumByData(data[2]) > 0) {
      resArr.push(
        ...me.getFlowArrow({x: 68, y: 63, nums: 3, small: false, plus: false, vertical: false}),
        ...me.getFlowArrow({x: 88.6, y: 38.5, nums: 3, small: true, plus: true, vertical: true}),
      );
    }


    // 坨四自用
    if (me.getFlowNumByData(data[3]) > 0) {
      resArr.push(
        ...me.getFlowArrow({x: 30, y: 63, nums: 3, small: false, plus: false, vertical: false}),
      );
    }

    // 去总外输
    if (me.getFlowNumByData(data[4]) > 0) {
      resArr.push(
        ...me.getFlowArrow({x: 52, y: 63, nums: 1, small: false, plus: true, vertical: true}),
        ...me.getFlowArrow({x: 30, y: 92, nums: 3, small: false, plus: false, vertical: false}),
      );
    }

    return resArr;
  },
};

stationsObj[stationObj.tuowuzhan] = {
  getSwitchData() {
    const [x1, x2, x3, x4] = [10, 30, 60, 80];
    const [y1, y2, y3] = [30, 62, 91];

    return [
      {x: x1, y: y2},
      {x: x2, y: y1},
      {x: x2, y: y2},
      {x: x3, y: y2},
      {x: x4, y: y2},
      {x: x4, y: y1},
      {x: x4, y: y3},
    ];
  },
  staticView() {
    let resArr = [];
    const me = this;

    const getStation = (x, y) => {

      return [
        ...me.getStation(x, y),
        {type: 'pot', x: 50, y: 63.5},
      ]
    };

    const switchDataXY = this.getSwitchData();

    registImg.all();
    registImg.registPotImg();

    resArr.push(...getStation(10, 20));


    for (let el of switchDataXY) {
      resArr = resArr.concat([...me.getThreeSwitchFlow(el.x, el.y)])
    }

    return resArr
  },
  staticViewPipeline() {
    const resArr = [];
    const me = this;

    const getStation = (x, y) => {

      return [
        ...me.getStationPath(x, y),
      ]
    };

    registPath.all();

    // 上1 管道
    G2.Shape.registShape('point', 'station_path_right', {
      drawShape: function (cfg, group) {
        const {x, y} = cfg;
        const x2 = x + 59;
        const y2 = y - 66;
        const y3 = y + 55;
        const x3 = x2 + 800;

        const point = [
          {type: 'M', x: x, y: y},
          {type: 'L', x: x, y: y2},
          {type: 'L', x: x2, y: y2},
          {type: 'L', x: x2, y: y3},
          {type: 'L', x: x3, y: y3},
        ];

        return registPath.addShape(group, pan_line.normal, point)
      }
    });
    // 罐子 管道
    G2.Shape.registShape('point', 'pots_path_left', {
      drawShape: function (cfg, group) {
        const {x, y} = cfg;
        const x2 = x - 660;
        const y2 = y + 160;

        const point = [
          {type: 'M', x: x, y: y},
          {type: 'L', x: x, y: y2},
          {type: 'L', x: x2, y: y2},
        ];

        return registPath.addShape(group, pan_line.normal, point)
      }
    });
    // 罐子 管道 右
    G2.Shape.registShape('point', 'pots_path_right', {
      drawShape: function (cfg, group) {
        const {x, y} = cfg;

        const y2 = y + 160;
        const y3 = y2 + 145;
        const x2 = x + 280;
        // const x3 = x - 240;

        const point = [
          {type: 'M', x: x, y: y2},
          {type: 'L', x: x2, y: y2},
          {type: 'M', x: x, y: y2},
          {type: 'L', x: x, y: y3},
          {type: 'L', x: x2, y: y3},
          // {type: 'L', x: x3, y: y2},
        ];

        return registPath.addShape(group, pan_line.normal, point)
      }
    });

    resArr.push(...getStation(10, 20));

    return resArr.concat([
      {type: 'pots_path_left', x: 75, y: 31},
      {type: 'pots_path_right', x: 75, y: 31},
      // {type: 'pots_path_left', x: 25, y: 63},
    ])
  },

  flowView() {
    const { data } = this;
    const me = this;
    const resArr = [];

    resArr.push(
      ...me.getFlowArrow({x: 75, y: 33, nums: 1, plus: true, vertical: true}),
    );

    // 坨三来气
    if (me.getFlowNumByData(data[0]) > 0) {
      resArr.push(
        ...me.getFlowArrow({x: 7, y: 63, nums: 1, small: false, plus: true, vertical: false}),
      );
    }

    // 坨五产气
    if (me.getFlowNumByData(data[1]) > 0) {
      resArr.push(
        ...me.getStationFlowArrow({x: 10, y: 20, nums: 1, plus: true}),
        ...me.getFlowArrow({x: 16.35, y: 7, nums: 3, small: true, plus: true, vertical: true}),
        ...me.getFlowArrow({x: 16, y: 31, nums: 5, small: false, plus: true, vertical: false}),
      );
    }

    // 轻烃进口
    if (me.getFlowNumByData(data[2]) > 0) {
      resArr.push(
        ...me.getFlowArrow({x: 25, y: 63, nums: 1, small: false, plus: true, vertical: false}),
      );
    }

    // 轻烃出口
    if (me.getFlowNumByData(data[3]) > 0) {
      resArr.push(
        ...me.getFlowArrow({x: 55, y: 63, nums: 1, small: false, plus: true, vertical: false}),
      );
    }

    // 垦化
    if (me.getFlowNumByData(data[4]) > 0) {
      resArr.push(
        ...me.getFlowArrow({x: 75, y: 63, nums: 2, small: false, plus: true, vertical: false}),
      );
    }

    // 坨五外输
    if (me.getFlowNumByData(data[5]) > 0) {
      resArr.push(
        ...me.getFlowArrow({x: 77, y: 31, nums: 1, small: false, plus: true, vertical: false}),
      );
    }

    // 坨五备用
    if (me.getFlowNumByData(data[6]) > 0) {
      resArr.push(
        ...me.getFlowArrow({x: 75, y: 63, nums: 1, small: false, plus: true, vertical: true}),
        ...me.getFlowArrow({x: 75, y: 92, nums: 2, small: false, plus: true, vertical: false}),
      );
    }

    return resArr;
  },
};

stationsObj[stationObj.tuoliuzhan] = {
  getSwitchData() {
    const [x1, x2] = [30, 65];
    const [y1, y2, y3] = [30, 62, 66];

    return [
      {x: x1, y: y1},
      {x: x2, y: y3},
      {x: x2, y: y1},
      {x: x1, y: y2},
    ];
  },
  staticView() {
    let resArr = [];
    const me = this;

    const getStation = (x, y) => {

      return [
        ...me.getStation(x, y),
        {type: 'switch_vertical', x: 85.7, y: 45},
      ]
    };

    const switchDataXY = this.getSwitchData();

    registImg.all();
    registImg.registPotsImg();

    resArr.push(...getStation(10, 20));


    for (let el of switchDataXY) {
      resArr = resArr.concat([...me.getThreeSwitchFlow(el.x, el.y)])
    }

    return resArr
  },
  staticViewPipeline() {
    const resArr = [];
    const me = this;

    const getStation = (x, y) => {

      return [
        ...me.getStationPath(x, y),
      ]
    };

    registPath.all();

    // 上1 管道
    G2.Shape.registShape('point', 'station_path_right', {
      drawShape: function (cfg, group) {
        const {x, y} = cfg;
        const x2 = x + 59;
        const y2 = y - 66;
        const y3 = y + 55;
        const x3 = x2 + 700;

        const point = [
          {type: 'M', x: x, y: y},
          {type: 'L', x: x, y: y2},
          {type: 'L', x: x2, y: y2},
          {type: 'L', x: x2, y: y3},
          {type: 'L', x: x3, y: y3},
        ];

        return registPath.addShape(group, pan_line.normal, point)
      }
    });
    // 罐子 管道
    G2.Shape.registShape('point', 'pots_path_left', {
      drawShape: function (cfg, group) {
        const {x, y} = cfg;
        const x2 = x - 360;
        const y2 = y + 160;

        const point = [
          {type: 'M', x: x, y: y},
          {type: 'L', x: x, y: y2},
          {type: 'L', x: x2, y: y2},
        ];

        return registPath.addShape(group, pan_line.normal, point)
      }
    });
    // 罐子 管道 右
    G2.Shape.registShape('point', 'pots_path_right', {
      drawShape: function (cfg, group) {
        const {x, y} = cfg;

        const y2 = y + 180;
        const x2 = x - 320;
        // const x3 = x - 240;

        const point = [
          {type: 'M', x: x, y: y},
          {type: 'L', x: x, y: y2},
          {type: 'L', x: x2, y: y2},
          // {type: 'L', x: x3, y: y2},
        ];

        return registPath.addShape(group, pan_line.normal, point)
      }
    });

    resArr.push(...getStation(10, 20));

    return resArr.concat([
      {type: 'pots_path_left', x: 53, y: 31},
      {type: 'pots_path_right', x: 85, y: 31},
      // {type: 'pots_path_left', x: 25, y: 63},
    ])
  },
  flowView() {
    const { data } = this;
    const me = this;
    const resArr = [];

    // 坨六产气
    if (me.getFlowNumByData(data[0]) > 0) {
      resArr.push(
        ...me.getStationFlowArrow({x: 10, y: 20, nums: 1, plus: true}),
        ...me.getFlowArrow({x: 16.35, y: 7, nums: 3, small: true, plus: true, vertical: true}),
        ...me.getFlowArrow({x: 16, y: 31, nums: 3, small: false, plus: true, vertical: false}),
      );
    }

    // 鲁胜
    if (me.getFlowNumByData(data[1]) > 0) {
      resArr.push(
        ...me.getFlowArrow({x: 85, y: 64, nums: 1, small: false, plus: false, vertical: true}),
        ...me.getFlowArrow({x: 56, y: 67, nums: 2, small: false, plus: true, vertical: false}),
      );
    }

    // 坨六外输
    if (me.getFlowNumByData(data[2]) > 0) {
      resArr.push(
        ...me.getFlowArrow({x: 50, y: 31, nums: 3, small: false, plus: true, vertical: false}),
      );
    }
    // 坨六自用
    if (me.getFlowNumByData(data[3]) > 0) {
      resArr.push(
        ...me.getFlowArrow({x: 53, y: 31, nums: 1, small: false, plus: true, vertical: true}),
        ...me.getFlowArrow({x: 33, y: 63, nums: 3, small: false, plus: false, vertical: false}),
      );
    }

    return resArr;
  },
};

stationsObj[stationObj.ninghaizhan] = {
  getSwitchData() {
    const [x1, x2, x3, x4] = [10, 20, 50, 70];
    const [y1, y2, y3] = [30, 62, 91, 96];

    return [
      {x: x1, y: y3},
      {x: x2, y: y1},
      {x: x3, y: y1},
      {x: x4, y: y2},
      {x: x4, y: y1},
      {x: x4, y: y3},
    ];
  },
  staticView() {
    let resArr = [];
    const y1 = 30;
    const me = this;

    const getStation = (x, y) => {

      return [
        ...me.getStation(x, y),
      ]
    };

    const switchDataXY = this.getSwitchData();

    registImg.all();
    registImg.registPotsImg();

    resArr.push(...getStation(10, 20));


    for (let el of switchDataXY) {
      resArr = resArr.concat([...me.getThreeSwitchFlow(el.x, el.y)])
    }

    return resArr.concat([
      {type: 'pots', x: 40, y: y1 + 4.6},
    ])
  },
  staticViewPipeline() {
    const resArr = [];
    const me = this;

    const getStation = (x, y) => {

      return [
        ...me.getStationPath(x, y),
      ]
    };

    registPath.all();

    // 上1 管道
    G2.Shape.registShape('point', 'station_path_right', {
      drawShape: function (cfg, group) {
        const {x, y} = cfg;
        const x2 = x + 59;
        const y2 = y - 66;
        const y3 = y + 55;
        const x3 = x2 + 700;

        const point = [
          {type: 'M', x: x, y: y},
          {type: 'L', x: x, y: y2},
          {type: 'L', x: x2, y: y2},
          {type: 'L', x: x2, y: y3},
          {type: 'L', x: x3, y: y3},
        ];

        return registPath.addShape(group, pan_line.normal, point)
      }
    });
    // 罐子 管道
    G2.Shape.registShape('point', 'pots_path', {
      drawShape: function (cfg, group) {
        const {x, y} = cfg;
        const x2 = x - 60;
        const y2 = y + 270;
        const x3 = x2 - 780;

        const point = [
          {type: 'M', x: x, y: y},
          {type: 'L', x: x2, y: y},
          {type: 'L', x: x2, y: y2},
          {type: 'L', x: x3, y: y2},
        ];

        return registPath.addShape(group, pan_line.normal, point)
      }
    });
    // 罐子 管道 右
    G2.Shape.registShape('point', 'pots_path_right', {
      drawShape: function (cfg, group) {
        const {x, y} = cfg;

        const y2 = y + 306;
        const x2 = x + 250;
        const yM = y + 159;
        // const x3 = x - 240;

        const point = [
          {type: 'M', x: x, y: y},
          {type: 'L', x: x, y: y2},
          {type: 'L', x: x2, y: y2},
          {type: 'M', x: x, y: yM},
          {type: 'L', x: x2, y: yM},
          // {type: 'L', x: x3, y: y2},
        ];

        return registPath.addShape(group, pan_line.normal, point)
      }
    });

    resArr.push(...getStation(10, 20));

    return resArr.concat([
      {type: 'pots_path', x: 40, y: 38},
      {type: 'pots_path_right', x: 65, y: 31},
      // {type: 'pots_path_left', x: 25, y: 63},
    ])
  },

  flowView() {
    const { data } = this;
    const me = this;
    const resArr = [];

    resArr.push(
      ...me.getFlowArrow({x: 65, y: 32, nums: 1, small: false, plus: true, vertical: true}),
    );

    // 宁海稳定
    if (me.getFlowNumByData(data[0]) > 0) {
      resArr.push(
        ...me.getFlowArrow({x: 33.55, y: 76, nums: 2, small: false, plus: false, vertical: true}),
        ...me.getFlowArrow({x: 0, y: 92, nums: 2, small: false, plus: true, vertical: false}),
      );
    }

    // 宁海产气
    if (me.getFlowNumByData(data[1]) > 0) {
      resArr.push(
        ...me.getStationFlowArrow({x: 10, y: 20, nums: 1, plus: true}),
        ...me.getFlowArrow({x: 16.35, y: 7, nums: 3, small: true, plus: true, vertical: true}),
        ...me.getFlowArrow({x: 16, y: 31, nums: 1, small: false, plus: true, vertical: false}),
      );
    }

    // 轻烃出口
    if (me.getFlowNumByData(data[2]) > 0) {
      resArr.push(
        ...me.getFlowArrow({x: 45, y: 31, nums: 1, small: false, plus: true, vertical: false}),
      );
    }

    // 宁海自用
    if (me.getFlowNumByData(data[3]) > 0) {
      resArr.push(
        ...me.getFlowArrow({x: 63, y: 62.8, nums: 2, small: false, plus: true, vertical: false}),
      );
    }

    // 发电
    if (me.getFlowNumByData(data[4]) > 0) {
      resArr.push(
        ...me.getFlowArrow({x: 63, y: 31, nums: 2, small: false, plus: true, vertical: false}),
      );
    }

    // 坨一来气
    if (me.getFlowNumByData(data[5]) > 0) {
      resArr.push(
        ...me.getFlowArrow({x: 65, y: 92, nums: 1, small: false, plus: false, vertical: true}),
        ...me.getFlowArrow({x: 83, y: 92.2, nums: 2, small: false, plus: false, vertical: false}),
      );
    }

    return resArr;
  },
};



export default function (setting) {
  const { station } = setting;

  return new DrawStation({
    ...stationsObj[station],
    ...setting,
  })
};
