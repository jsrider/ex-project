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
  {x: 704, y: 349},
  {x: 704, y: 510},
  {x: 425, y: 349},
  {x: 425, y: 510},
  {x: 144, y: 349},
  {x: 144, y: 494},
];

stationBtns[stationObj.tuoerzhan] = [
  {x: 518, y: 198},
  {x: 247, y: 348},
  {x: 397, y: 348},
  {x: 639, y: 348},
  {x: 778, y: 348},
  {x: 247, y: 504},
];

stationBtns[stationObj.tuosanzhan] = [
  {x: 247, y: 338},
  {x: 247, y: 509},
  {x: 247, y: 199},
  {x: 469, y: 146},
  {x: 731, y: 359},
  {x: 572, y: 285},
  {x: 731, y: 509},
  {x: 844, y: 146},
];

stationBtns[stationObj.tuosizhan] = [
  {x: 330, y: 199},
  {x: 658, y: 199},
  {x: 658, y: 359},
  {x: 330, y: 359},
  {x: 330, y: 504},
];

stationBtns[stationObj.tuowuzhan] = [
  {x: 145, y: 359},
  {x: 330, y: 199},
  {x: 330, y: 359},
  {x: 611, y: 359},
  {x: 798, y: 359},
  {x: 798, y: 199},
  {x: 798, y: 504},
];

stationBtns[stationObj.tuoliuzhan] = [
  {x: 330, y: 199},
  {x: 658, y: 379},
  {x: 658, y: 199},
  {x: 330, y: 359},
];

stationBtns[stationObj.ninghaizhan] = [
  {x: 143, y: 504},
  {x: 237, y: 199},
  {x: 517, y: 199},
  {x: 703, y: 359},
  {x: 703, y: 199},
  {x: 703, y: 504},
];

const Page = (props) => {

  const { dispatch, pageData } = props;
  const { station, flowData } = pageData;
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
              monitor: flowData && flowData.params && Array.isArray(flowData.params.stationTitle) && flowData.params.stationTitle[i]
            });
          }} style={{
            position: 'absolute',
            left: el.x,
            top: el.y,
            width: '40px',
            height: '40px',
          }} />
        })
      }
    </div>
  );
};

// export default Products;
export default Page;

