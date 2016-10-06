import React, { PropTypes } from 'react';
import { Select, Button, Form } from 'antd';
import { Link } from 'dva/router';
import styles from './index.less';
import G2 from 'g2';

let chartCvs = {};
let chartWidth = 0;
const CHART_ID = 'flowChart';
const img = {
  station: {
    src: require('../../img/station.png'),
    rate: 1364/1718,
    width: 80
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
    width: 20,
  },
  switch_black: {
    src: require('../../img/switch_black.png'),
    rate: 124/124,
    width: 20,
  },
  flow: {
    src: require('../../img/flow.png'),
    rate: 255/853,
    width: 40,
  }
};

/**
 * @name 注册 站 的图形
 * x, y 为图形中心坐标
 */
const registStationImg = () => {
  G2.Shape.registShape('point', 'station', {
    drawShape: function(cfg, group) {
      const { x, y } = cfg;
      const { width, rate, src } = img.station;
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
};

/**
 * @name 注册 开关 的图形
 * x, y 为图形中心坐标
 * @params small { Boolean }
 */
const registSwitchImg = (small) => {

  G2.Shape.registShape('point', small ? 'switch-small' : 'switch', {
    drawShape: function(cfg, group) {
      const { x, y } = cfg;
      let { width, rate, src } = img.switch;

      width = small ? width / 2 : width;

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
};
/**
 * @name 注册 开关 的图形 —— 垂直方向
 * x, y 为图形中心坐标
 */
const registSwitchImgVertical = () => {
  G2.Shape.registShape('point', 'switch-vertical', {
    drawShape: function(cfg, group) {
      const { x, y } = cfg;
      const { width, rate, src } = img.switch;
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
};

/**
 * @name 注册 开关 黑色 的图形
 * x, y 为图形中心坐标
 */
const registSwitchBlackImg = () => {
  G2.Shape.registShape('point', 'switch_black', {
    drawShape: function(cfg, group) {
      const { x, y } = cfg;
      const { width, rate, src } = img.switch_black;
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
};
/**
 * @name 注册 流量计 的图形
 * x, y 为图形中心坐标
 */
const registFlowImg = () => {
  G2.Shape.registShape('point', 'flow', {
    drawShape: function(cfg, group) {
      const { x, y } = cfg;
      const { width, rate, src } = img.flow;
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
};

const drawChart = (dataObj) => {
  // debugger;

  registStationImg();
  registSwitchImg();
  registSwitchImg(true);
  registSwitchImgVertical();
  registFlowImg();

  function combine(Command, x, y) {
    return Command + ' ' + x + ' ' + y;
  }
  // 自定义condition 的图形
  G2.Shape.registShape('point', 'condition', {
    drawShape: function(cfg, group) {
      var x = cfg.x;
      var y = cfg.y;
      var width = 50;
      var height = 50;
      var path = '';
      path += combine('M', x, y - height / 2);
      path += combine('L', x - width / 2, y);
      path += combine('L', x, y + height / 2);
      path += combine('L', x + width / 2, y);
      path += 'z';
      var shape = group.addShape('path', {
        attrs: {
          path: path,
          fill: '#fff',
          stroke: 'black' // 可以直接设置颜色 cfg.color，也可以使用映射
        }
      });
      return shape;
    }
  });
  var nodes = [// 节点信息：类别、ID，位置 x,y
    {name: '',type: 'station',x: 10,y: 20},
    {name: '',type: 'switch-small',x: 6,y: 27},
    {name: '',type: 'switch-vertical',x: 5,y: 25},
    {name: '',type: 'flow',x: 20,y: 25},
    {name: '',type: 'station',x: 30,y: 20},
    {name: '',type: 'station',x: 50,y: 20},
    {name: '',type: 'station',x: 70,y: 20},
    {name: '',type: 'station',x: 90,y: 20},
  ];
  // var edges = [
  //   {source: '0', target: '1'},
  //   {source: '1', target: '2'},
  //   {source: '2', target: '3'},
  //   {source: '3', target: '4.1'},
  //   {source: '3', target: '4.2'},
  //   {source: '4.1', target: '5'},
  //   {source: '4.2', target: '5'},
  //   {source: '5', target: '6'}
  // ];
  var Stat = G2.Stat;
  var chart = new G2.Chart({
    id: CHART_ID,
    width: chartWidth || (chartWidth = document.getElementById(CHART_ID).offsetWidth) || 800,
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
  // 首先绘制 edges，点要在边的上面
  // 创建单独的视图
  // var edgeView = chart.createView();
  // edgeView.source(edges, defs);
  // edgeView.coord().reflect(); // 从上到下
  // edgeView.axis(false);
  // edgeView.tooltip(false);
  // // Stat.link 方法会生成 ..x, ..y的字段类型，数值范围是 0-1
  // edgeView.edge()
  //   .position(Stat.link('source*target',nodes))
  //   .color('#ccc');
  // 创建节点视图
  var nodeView = chart.createView();
  nodeView.coord().reflect(); // 从上到下
  nodeView.axis(false);
  nodeView.source(nodes, defs);
  nodeView.point().position('x*y').color('steelblue')
    .shape('type', function(val) {
      return val;
    })
    .label('name', {
      offset: 0,
      labelEmit: true
    })
    .tooltip('name');

  // 添加辅助图片
  // nodeView.guide().image([50, 10], [55, 15], {
  //   src: img.station, // 图片路径
  //   // width: 1405, // 宽度，可以不设置，如果设置了end，此属性无效
  //   // height: 1841 // 高度，可以不设置，如果设置了end，此属性无效
  // });

  chart.render();

};

function FlowChart(props) {
  console.log('FlowChartLayout', props);

  // const { location, dispatch } = props;
  const { flowData, loading, init } = props.pageData;

  loading || (init && drawChart(flowData.data));
  // loading || flowData.data && drawChart(flowData.data);

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
