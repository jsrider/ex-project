import React, { PropTypes } from 'react';
import { Select, Button, Form } from 'antd';
import styles from './index.less';
import { Link } from 'dva/router';
import G2 from 'g2';

let chartCvs = {};
let chartWidth = 0;
const CHART_ID = 'c1';

function FormLayout(props) {
  console.log('ChartLayout', props);

  // const { location, dispatch } = props;
  const { chartData, loading } = props.pageData;

  const drawChart = (dataObj) => {
    // debugger;

    Object.keys(dataObj).forEach((dataKey, index) => {
      const { data, config } = dataObj[dataKey];
      const { guideLine, guideRect, guideTag, height } = config;

      if (!(Array.isArray(data) && data.length)) {
        return;
      }

      if (chartCvs[dataKey]) {
        chartCvs[dataKey].destroy();
        // } else {
      //   chartCvs[dataKey].clear();
      }
      chartCvs[dataKey] = new G2.Chart({
        id: 'c1',
        width: chartWidth || (chartWidth = document.getElementById(CHART_ID).offsetWidth) || 800,
        height,
        plotCfg: {
          margin: [20, 80, 100, 80]
        }
      });

      chartCvs[dataKey].source(data, {
        time: {
          type: 'time',
          mask: ' HH:MM',
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
      chartCvs[dataKey].legend(false);
      chartCvs[dataKey].line().position('time*value').color('darkred').shape('smooth').size(2);
      chartCvs[dataKey].point().position('time*value').color('darkred').shape('name', ['circle', 'rect', 'diamond']).size(4);
      chartCvs[dataKey].render();
    })

  };

  loading || chartData.data && drawChart(chartData.data);

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
