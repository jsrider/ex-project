import React from 'react';
import * as stationObj from '../../utils/stations';
import getMonitor from '../../utils/stationMonitor';

// import * as routerPath from '../utils/routerPath';
const stationBtns = {};

stationBtns[stationObj.zhongxinzhan] = [
  {x: 133, y: 275},
  {x: 320, y: 275},
  {x: 507, y: 275},
  {x: 694, y: 275},
  {x: 880, y: 275},
  {x: 290, y: 503},
  {x: 750, y: 503},
];

stationBtns[stationObj.tuoyizhan] = [
  {x: 425, y: 198},
  {x: 704, y: 198},
  {x: 144, y: 349},
  {x: 425, y: 349},
  {x: 704, y: 349},
  {x: 425, y: 510},
  {x: 704, y: 510},
  {x: 144, y: 494},
];

stationBtns[stationObj.tuoerzhan] = [
  {x: 518, y: 198},
  {x: 247, y: 425},
  {x: 397, y: 425},
  {x: 639, y: 425},
  {x: 778, y: 425},
];

const Page = (props) => {

  const { dispatch, pageData } = props;
  const { station } = pageData;
  const stationBtnsArr = stationBtns[station];

  console.log('FlowChartClick', props);

  return (
    <div>
      {
        stationBtnsArr.map((el, i) => {
          return <a href="javascript:;" key={i} onClick={() => {
            dispatch({
              type: 'flowChart/queryMonitorData',
              station,
              monitor: getMonitor(station).stationTitle[i]
            });
          }} style={{
            position: 'absolute',
            left: el.x,
            top: el.y,
            width: '40px',
            height: '40px',
            background: 'red',
          }}>{getMonitor(station).stationTitle[i]}</a>
        })
      }
    </div>
  );
};

// export default Products;
export default Page;

