import React, { PropTypes } from 'react';
import { Select, Button, Form } from 'antd';
import styles from './index.less';
import { Link } from 'dva/router';
import G2 from 'g2';

let chartCvs = {};
let chartWidth = 0;
const CHART_ID = 'c1';
let reloadTimer = null;
const axisConfig = {
  position: 'bottom', // 设置坐标轴的显示位置，可取值 top bottom left right
  // formatter: function(dimValue) {
  //   return (dimValue / 1000).toFixed(0) + 'k';
  // }, // 回调函数，用于格式化坐标轴上显示的文本信息
  line: {
    lineWidth: 1, // 设置线的宽度
    stroke: '#2E2E2E' //  设置线的颜色
  }, // 设置坐标轴线的样式，如果值为 null，则不显示坐标轴线 图形属性
  labels: {
    label: {
      textAlign: 'center', // 文本对齐方向，可取值为： left center right
      fill: '#2E2E2E', //文本的颜色
      fontSize: '12', // 文本大小
      fontWeight: 'bold' // 文本粗细
    }, // 设置坐标轴文本的显示样式，如果值为 null，则不显示坐标轴文本 文本属性
    // autoRotate: true // 是否需要自动旋转
  },
  title: {
    fontSize: '12',
    textAlign: 'center',
    fill: '#2E2E2E',
    fontWeight: 'bold'
  }, // 坐标轴标题设置，如果值为 null，则不显示标题 文本属性
  // tickLine: {
  //   lineWidth: 1,
  //   stroke: '#ccc',
  //   value: 5,
  // }, // 坐标点对应的线，null 不显示 图形属性
  // titleOffset: 45, // 设置标题距离轴线的距离
  // labelOffset: 20, // 标轴文本距离轴线的距离
  // grid: {
  //   line: {
  //     stroke: '#d9d9d9',
  //     lineWidth: 1,
  //     lineDash: [4, 4]
  //   }, // 代表栅格线的类型，line polygon circle 只能选择一种 图形属性
  //   minorLine: 0, // 次要线的配置项
  //   minorCount: 0, // 2个Grid线中间的次要线的数目
  //   odd: {
  //     fill: 'red'
  //   }, // 如果值为 null，则不显示。栅格内部的奇数背景 图形属性
  //   even: {
  //     fill: 'red'
  //   } //  如果值为 null，则不显示。栅格内部的偶数背景 图形属性
  // }, // 坐标轴栅格线的配置信息，默认只有左边的坐标轴带有栅格线，null 为不显示。
  // gridAlign: 'start'// 栅格的位置跟坐标点(tick)的对齐方式，当前仅支持 start和middle
};

function FormLayout(props) {
  console.log('ChartLayout', props);

  // const { location, dispatch } = props;
  const { chartData, loading } = props.pageData;

  const drawChart = (dataObj) => {
    // debugger;
    for (let key in chartCvs) {
      if (chartCvs.hasOwnProperty(key)) {
        if (chartCvs[key]) {
          chartCvs[key].destroy();
        }
      }
    }

    Object.keys(dataObj).forEach((dataKey, index) => {
      const { data, config } = dataObj[dataKey];
      const { guideLine, guideRect, guideTag, height, formatDate } = config;

      if (!(Array.isArray(data) && data.length)) {
        return;
      }

      chartCvs[dataKey] = new G2.Chart({
        id: 'c1',
        width: chartWidth || (chartWidth = document.getElementById(CHART_ID) && document.getElementById(CHART_ID).offsetWidth) || 952,
        height,
        plotCfg: {
          margin: [20, 80, 100, 80]
        }
      });

      chartCvs[dataKey].source(data, {
        time: {
          type: 'time',
          mask: formatDate || 'mm-dd HH:MM',
          alias: '时间',
        },
        value: {
          alias: data[0].name
        }
      });

      guideLine && chartCvs[dataKey].guide().line(guideLine.start, guideLine.end, {
        fill: guideLine.color,
        fillOpacity: guideLine.opacity
      });

      guideRect && chartCvs[dataKey].guide().rect(guideRect.start, guideRect.end, {
        fill: guideRect.color,
        fillOpacity: guideRect.opacity
      });

      guideTag && chartCvs[dataKey].guide().tag(guideTag.start, guideTag.end, guideTag.tag);
      // chartCvs[dataKey].guide().rect(['2015-03-01T12:00:00.000Z', 6], ['2015-03-01T20:00:00.000Z', 10], {
      //   fill: '#810043',
      //   fillOpacity: 0.4
      // });
      // chartCvs[dataKey].guide().tag(['2015-03-01T18:00:00.000Z', 6], ['2015-03-01T19:00:00.000Z', 10], '红色区域为报警值');

      chartCvs[dataKey].axis('value', {
        ...axisConfig,
        position: 'left'
      });
      chartCvs[dataKey].axis('time', axisConfig);

      chartCvs[dataKey].legend(false);
      chartCvs[dataKey].line().position('time*value').color('darkred').shape('smooth').size(2);
      chartCvs[dataKey].point().position('time*value').color('darkred').shape('name', ['circle', 'rect', 'diamond']).size(4);
      chartCvs[dataKey].render();
    })

  };

  try {
    loading || chartData.data && drawChart(chartData.data);
  } catch (e) {
    console.log('error:', e);
    reloadTimer = window.setTimeout(() => {drawChart(chartData.data)}, 500);
    // location.reload();
  }

  return (
    <div>
      <h1 className={styles.title}>{chartData.title}</h1>
    </div>
  )
}

FormLayout.propTypes = {
  location: PropTypes.object,
  pageData: PropTypes.object.isRequired
};

export default FormLayout;
