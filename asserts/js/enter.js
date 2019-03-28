/**
 * @author RainSilver
 * @email [ppstream123@126.com]
 * @create date 2019-03-21 08:49:10
 * @modify date 2019-03-21 08:49:10
 * @desc [进厂使用的页面逻辑]
 */
//car_list_handleSimpleClick(); //绑定列表块点击事件
//后台表单提交需要的字符串 
var selctedCarNumStr = ""; //车号
var seletedSendBatchStr = ""; //发出批次号
var seletedSendDateStr = ""; //发出批次日期
var selctedStatusStr = ""; //车辆状态
var selctedIdStr = ""; //车辆id
//默认函数启动区
var showHidden = true;
hiddenBackStage();
//车辆编组
function groupSelectedCar() {
  /**
   * 表单：
   * 1 id
   * 2 status
   * 3 batch num 
     4 batch date
     5 car num
    **/
  setSelectedCarInfo()
  console.log("状态:" + selctedStatusStr);
  console.log("id:" + selctedIdStr);
  console.log("车号:" + selctedCarNumStr);
  console.log("发出批次:" + seletedSendBatchStr);
  console.log("发出日期:" + seletedSendDateStr);
  document.querySelector("form input:nth-child(2)").value = selctedIdStr;
  document.querySelector("form input:nth-child(3)").value = selctedStatusStr;
  document.querySelector("form input:nth-child(4)").value = seletedSendBatchStr;
  document.querySelector("form input:nth-child(5)").value = seletedSendDateStr;
  document.querySelector("form input:nth-child(6)").value = selctedCarNumStr;
  //点击批量编组按钮，后台提交表单信息
   document.querySelector("form input:last-child").click();

}
//隐藏后台信息
/*右侧-列表-隐藏每列最后两个*/
function hiddenBackStage() {
  var cells = document.querySelectorAll("#col_right_list>table tr>td:last-child,th:last-child,td:nth-last-child(2),th:nth-last-child(2)");
  if (showHidden == true) {
    for (let index = 0; index < cells.length; index++) {
      cells[index].style.display = "none";
    }
    document.querySelector("#app>form").style.display = "none";
    showHidden = false;
  } else {
    for (let index = 0; index < cells.length; index++) {
      cells[index].style.display = "table-cells";
    }
    document.querySelector("#app>form").style.display = "block";
    showHidden = true;
  }


}
//遍历获得车辆单个信息
function setSelectedCarInfo() {
  var rows = document.querySelectorAll("#col_right_list>table>tbody tr");
  console.log(rows.length);
  for (let index = 0; index < rows.length; index++) {
    if (rows[index].className == "car_list_checked") {
      //从已选中的车辆行重获取信息(其他信息)
      seletedSendBatchStr += rows[index].children[1].innerHTML = ";";
      selctedCarNumStr += rows[index].children[2].innerHTML = ";";
      seletedSendDateStr += rows[index].children[3].innerHTML = ";";
      //从已选中的车辆行重获取信息(id和状态)
      selctedStatusStr += rows[index].lastElementChild.innerHTML + ";";
      selctedIdStr += rows[index].lastElementChild.previousElementSibling.innerHTML + ";";

    }
  }

}


// //绑定列表块点击事件(仅允许单选)
// function car_list_handleSimpleClick() {
//     var rows = document.querySelectorAll("#col_right_list>table>tbody tr");
//     for (let index = 0; index < rows.length; index++) {
//         rows[index].onclick = function () {
//             car_list_select_clear();
//             this.className = "car_list_checked";      
//         }   
//     }
// }
// //清除车辆列表的所有选择
// function car_list_select_clear(){
//     var rows = document.querySelectorAll("#col_right_list>table>tbody tr");
//    //console.log(rows.length);
//     for (let index = 0; index < rows.length; index++) {
//         rows[index].className = "car_list_unchecked";

//     }
// }