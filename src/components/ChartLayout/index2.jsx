import React, { PropTypes } from 'react';
import { Select, Button, Form } from 'antd';
import styles from './index.less';
import { Link } from 'dva/router';
import G2 from 'g2';

let chartCvs = {};
let chartWidth = 0;
const CHART_ID = 'c1';
let reloadTimer = null;

class ChartLayout extends React.Component {

  componentDidMount() {
    this.chart = new G2.Chart({
      id: 'c1',
      width: chartWidth || (chartWidth = document.getElementById(CHART_ID) && document.getElementById(CHART_ID).offsetWidth) || 952,
      height: 220,
      plotCfg: {
        margin: [20, 80, 100, 80]
      }
    });
  }

  drawChart() {
  // debugger;
    const { chartData } = this.props.pageData;
    const dataObj = chartData.data;

    Object.keys(dataObj).forEach((dataKey, index) => {
      const { data, config } = dataObj[dataKey];
      const { guideLine, guideRect, guideTag, height, formatDate } = config;

      if (!(Array.isArray(data) && data.length)) {
        return;
      }

      if (chartCvs[dataKey]) {
        chartCvs[dataKey].destroy();
        // } else {
        //   chartCvs[dataKey].clear();
      }

      chartCvs[dataKey].source(data, {
        time: {
          type: 'time',
          mask: formatDate || 'mm-dd hh:mm',
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

  }

  render () {
    console.log('ChartLayout', this.props);

    // const { location, dispatch } = props;
    const { chartData, loading } = this.props.pageData;

    try {
      loading || chartData.data && this.chart && this.drawChart();
    } catch (e) {
      console.log('error:', e);
      reloadTimer = window.setTimeout(() => {this.drawChart()}, 500);
      // location.reload();
    }

    return (
      <div>
        <h1 className={styles.title}>{chartData.title}</h1>
      </div>
    )
  }
}


ChartLayout.propTypes = {
  location: PropTypes.object,
  pageData: PropTypes.object.isRequired
};

export default ChartLayout;
