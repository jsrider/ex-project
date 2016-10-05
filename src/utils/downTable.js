/**
 * @name table 导出 excel
 * @author weishao
 * @date 2016-5-31
 **/
//obj是table表格外面嵌套div id
export default function downTable(tableData) {
  // debugger;
  try {
    // let table = this.refs.table;
    // let str = getRCTableData(table.props.columns, table.props.dataSource);
    // const uri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(str);//要编码
    // const uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
    const { data, params } = tableData;
    const { groupArr, groupArrCN, keyArr, keyArrCN } = params;
    const groupLen = groupArr.length;
    const keyLen = keyArr.length;
    let rowArr = [];
    let groupRowArr = [];
    let keyRowArr = [];
    let valueArr = [];

    for (let el of data) {
      let valueRowArr = [];

      for (let i = 0; i < groupLen; i++) {
        for (let j = 0; j< keyLen; j++) {
          valueRowArr.push(el[groupArr[i] + keyArr[j]])
        }
      }

      valueArr.push(valueRowArr.join(','))
    }

    for (let i = 0; i < groupLen; i++) {
      for (let j = 0; j< keyLen; j++) {
        keyRowArr.push(keyArrCN[keyArr[i]]);
        groupRowArr.push(groupArrCN[i]);
      }
    }

    rowArr.push(groupRowArr.join(','));
    rowArr.push(keyRowArr.join(','));

    // var str = "栏位1,栏位2,栏位3\n值1,值2,值3";
    let str = rowArr.concat(valueArr).join('\n');
    str =  encodeURIComponent(str);

    let uri = "data:text/csv;charset=utf-8,\ufeff"+str;
    //创建a标签模拟点击下载
    const downloadLink = document.createElement("a");
    downloadLink.href = uri;
    downloadLink.download = "excel.csv";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

  } catch (e) {
    alert(e.Message);
    return false;
  }
  return false;
}

// const getRCTableData = (columns, dataSource) => {
//   let thKeys = [];
//   let thArr = columns.map(col => {
//     col.dataIndex && thKeys.push(col.dataIndex);
//
//     return col.title;
//   });
//
//   let tbArr = dataSource.map(el =>
//     thKeys.map(key => el[key]).join(',')
//   );
//
//   return [thArr.join(',')].concat(tbArr).join('\r\n');
// };
//
//
//
// function getTblData(inTbl, inWindow) {
//   var rows = 0;
//   var tblDocument = document;
//   tblDocument = eval(inWindow).document;
//   var curTbl = tblDocument.getElementById(inTbl);
//   var outStr = "";
//   if (curTbl != null) {
//     for (var j = 0; j < curTbl.rows.length; j++) {
//       for (var i = 0; i < curTbl.rows[j].cells.length; i++) {
//
//         if (i == 0 && rows > 0) {
//           outStr += ",";// \t";
//           rows -= 1;
//         }
//
//         outStr += curTbl.rows[j].cells[i].innerText + ",";//\t";
//         if (curTbl.rows[j].cells[i].colSpan > 1) {
//           for (var k = 0; k < curTbl.rows[j].cells[i].colSpan - 1; k++) {
//             outStr += ",";// \t";
//           }
//         }
//         if (i == 0) {
//           if (rows == 0 && curTbl.rows[j].cells[i].rowSpan > 1) {
//             rows = curTbl.rows[j].cells[i].rowSpan - 1;
//           }
//         }
//       }
//       outStr += "\r\n";
//     }
//   }
//
//   else {
//     outStr = null;
//     alert(inTbl + "不存在 !");
//   }
//   return outStr;
// }
