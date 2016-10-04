import React, { PropTypes } from 'react';
import { Select, Button, Form } from 'antd';
import styles from './index.less';
import { Link } from 'dva/router';
import G2 from 'g2';

let chartCvs = {};
let chartDom = null;

function FormLayout(props) {
  console.log('ChartLayout', props);

  // const { location, dispatch } = props;
  const { chartData, loading } = props.chartPage;

  const drawChart = (dataObj) => {
    // debugger;
    chartDom = chartDom || document.getElementById('c1');

    Object.keys(dataObj).forEach((dataKey, index) => {
      const { data, config } = dataObj[dataKey];

      if (!(Array.isArray(data) && data.length)) {
        return;
      }

      if (!chartCvs[dataKey]) {
        chartCvs[dataKey] = new G2.Chart({
          id: 'c1',
          width: chartDom.offsetWidth,
          height: config.height,
          plotCfg: {
            margin: [20, 80, 100, 80]
          }
        });
      } else {
        chartCvs[dataKey].clear();
      }

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
      chartCvs[dataKey].guide().line(['2015-03-01T12:00:00.000Z',5], ['2015-03-01T20:00:00.000Z',5],);
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
  chartPage: PropTypes.object.isRequired
};

export default FormLayout;
