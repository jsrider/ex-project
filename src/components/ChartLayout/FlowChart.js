import React, { PropTypes } from 'react';
import { Select, Button, Form } from 'antd';
import { Link } from 'dva/router';
import styles from './index.less';
import G2 from 'g2';
import * as stationObj from '../../utils/stations';
import * as routerPath from '../../utils/routerPath';
import drawStations from '../../utils/drawStation';

const CHART_WIDTH = 932; // chart 图表总宽度
const CHART_HEIGHT = 500;
const GET_DATA_TIMER = 300000; // 获取数据时间间隔
const CHART_ID = 'flowChart';

// 站点数据默认字段
const stationKeyArrDefault = ['tmplate', 'pressure', 'flow', 'totalFlow'];

// 获取站点默认数据
const getStationDefautlData = () => {
  const data = [];

  for (let i = 0; i < 10; i++) {
    let res = {};

    stationKeyArrDefault.forEach(el => res[el] = 0);

    data.push(res);
  }

  return data;
};

// 获取 station 标题

const getStationTitle = (station) => {
  let title;

  switch (station) {
    case stationObj.zhongxinzhan:
      title = '中心站流程图';
      break;

    case stationObj.tuoyizhan:
      title = '坨一站流程图';
      break;

    case stationObj.tuoerzhan:
      title = '坨二站流程图';
      break;

    case stationObj.tuosanzhan:
      title = '坨三站流程图';
      break;

    case stationObj.tuosizhan:
      title = '坨四站流程图';
      break;

    case stationObj.tuowuzhan:
      title = '坨五站流程图';
      break;

    case stationObj.tuoliuzhan:
      title = '坨六站流程图';
      break;

    case stationObj.ninghaizhan:
      title = '宁海站流程图';
      break;
  }

  return title;
};


// x,y的范围是0-100
// 因为边的统计函数生成的数据范围默认是0-1，所以需要设置范围是 0-100 统一起点、边的数据范围
const defs = {
  x: {min: 0,max:100},
  y: {min: 0, max:100},
  '..x': {min: 0,max:100},
  '..y': {min: 0,max:100}
};

const initView = (nodeView, nodes) => {
  if (!nodeView) {
    return ;
  }
  nodeView.coord().reflect(); // 从上到下
  nodeView.axis(false);
  nodeView.source(nodes, defs);
  nodeView.point().position('x*y')
    .shape('type', function(val) {
      return val;
    });
};

let drawFlowTimer = null;
let reloadTimer = null;
let getDataTimer = null;
let chart = null;

const drawChart = (data, station) => {
  // debugger;
  chart && chart.destroy();

  const flowData = data;
    // {
    //   data: getStationDefautlData(),
    //   params: {
    //     keyArr: stationKeyArrDefault
    //   }
    // };

  const drawStation = drawStations({
    station,
    ...flowData,
  });

  const nodes = drawStation.staticView();
  const nodesPipeline = drawStation.staticViewPipeline();
  const nodesData = drawStation.dataView(flowData);
  const nodesFlow = drawStation.flowView(flowData);
  // var Stat = G2.Stat;
  chart = new G2.Chart({
    id: CHART_ID,
    // width: CHART_WIDTH || (CHART_WIDTH = document.getElementById(CHART_ID).offsetWidth) || 800,
    animate: false,
    width: CHART_WIDTH,
    height: CHART_HEIGHT,
    plotCfg: {
      margin: [0,0]
    }
  });
  // 不显示title
  chart.tooltip({
    title: null
  });
  // 创建 管道 视图
  const pipelineView = chart.createView();

  // 创建管道 流动 视图
  const flowView = nodesFlow.length && chart.createView();

  // 创建节点视图
  const nodeView = chart.createView();

  // 创建可变数据视图
  const dataView = chart.createView();

  // function stop() {
  //   if (requestId) {
  //     window.cancelRequestAnimationFrame(requestId);
  //     requestId = undefined;
  //   }
  // }
  const drawFlow = () => {
    flowView.changeData(drawStation.flowView(flowData));

    // window.setTimeout(drawFlow, 100);
  };

  // drawFlowTimer && window.cancelAnimationFrame(drawFlowTimer);
  // if (!drawFlowTimer) {
  //   drawFlowTimer = window.requestAnimationFrame(drawFlow);
  // }

  drawFlowTimer && clearInterval(drawFlowTimer);
  drawFlowTimer = flowView && window.setInterval(drawFlow, 100);

  initView(pipelineView, nodesPipeline);
  initView(flowView, nodesFlow);
  initView(nodeView, nodes);
  initView(dataView, nodesData);
  // drawFlow();

  chart
    .tooltip(false)
    .render();

  reloadTimer && window.clearInterval(reloadTimer);

  return drawStation;
};

function FlowChart(props) {
  console.log('FlowChartLayout', props);

  const { dispatch } = props;
  const { flowData, loading, station } = props.pageData;

  const getDataInterval = () => {
    if (!window.location.hash.includes(routerPath.liuchengTu)) {
      return window.clearInterval(getDataTimer);
    }

    dispatch({
      type: 'flowChart/queryData',
      station
    })
  };

  window.clearInterval(getDataTimer);
  getDataTimer = window.setInterval(getDataInterval, GET_DATA_TIMER);

  try {
    loading || flowData && drawChart(flowData, station)
  } catch (e) {
    console.log('error:', e);
    reloadTimer = window.setTimeout(() => {drawChart(flowData, station)}, 500);
    // location.reload();
  }

  return (
    <div>
      <h1 className={styles.title}>{flowData.title || getStationTitle(station)}</h1>
    </div>
  )
}

FlowChart.propTypes = {
  location: PropTypes.object,
  pageData: PropTypes.object.isRequired
};

export default FlowChart;
