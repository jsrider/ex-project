import * as stationObj from './stations';
const getMonitor = (station) => {

  let stationTitle, title;

  switch (station) {
    case stationObj.zhongxinzhan:
      stationTitle = ['坨五接收', '坨二接收', '坨三接收', '坨四接收', '坨六接收', '去汽车二队', '去总外输'];
      title = '中心站流程图';
      break;

    case stationObj.tuoyizhan:
      stationTitle = ['坨一产气', '轻烃进口', '轻烃出口', '去宁海', '坨一外供', '坨一自用', '坨一汇东', '镇政府'];
      title = '坨一站流程图';
      break;

    case stationObj.tuoerzhan:
      stationTitle = ['坨二自用', '坨二产气', '轻烃进口', '轻烃出口', '坨二外输', '坨二稳定'];
      title = '坨二站流程图';
      break;

    case stationObj.tuosanzhan:
      stationTitle = ['坨三供轻烃', '坨三稳定', '坨三产气', '坨三自用', '看守所', '坨三外供', '殡仪馆', '坨三外输'];
      title = '坨三站流程图';
      break;

    case stationObj.tuosizhan:
      stationTitle = ['坨四产气', '轻烃进口', '轻烃出口', '坨四自用', '去总外输'];
      title = '坨四站流程图';
      break;

    case stationObj.tuowuzhan:
      stationTitle = ['坨三来气', '坨五产气', '轻烃进口', '轻烃出口', '垦化', '坨五外输', '坨五备用'];
      title = '坨五站流程图';
      break;

    case stationObj.tuoliuzhan:
      stationTitle = ['坨六产气', '鲁胜', '坨六外输', '坨六自用'];
      title = '坨六站流程图';
      break;

    case stationObj.ninghaizhan:
      stationTitle = ['宁海稳定', '宁海产气', '轻烃出口', '宁海自用', '发电', '坨一来气'];
      title = '宁海站流程图';
      break;

  }

  return { stationTitle, title }
};

export default getMonitor;
