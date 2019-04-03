/**
 * @author RainSilver
 * @email [ppstream123@126.com]
 * @create date 2019-03-21 08:49:10
 * @modify date 2019-04-01 22:41:32
 * @desc [进厂使用的页面逻辑]
 */
//car_list_handleSimpleClick(); //绑定列表块点击事件
//后台表单提交需要的字符串 
var selctedCarNumStr = ""; //车号
var seletedSendBatchStr = ""; //发出批次号
var seletedSendDateStr = ""; //发出批次日期
var selctedStatusStr = ""; //车辆状态
var selctedIdStr = ""; //车辆id
var showHidden = true;
var canChangeCarNum = false; //允许修改车号标志
//默认函数启动区
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
  document.querySelector("#enter_form_id").value = selctedIdStr;
  document.querySelector("#enter_form_status").value = selctedStatusStr;
  document.querySelector("#enter_form_batch").value = seletedSendBatchStr;
  document.querySelector("#enter_form_date").value = seletedSendDateStr;
  document.querySelector("#enter_form_car").value = selctedCarNumStr;
  //点击批量编组按钮，后台提交表单信息
  //点击批量编组按钮，后台提交表单信息
  var flag = window.confirm("确认将所选车辆编组吗？");
  if (flag == true) {
    document.querySelector("#enter_form_submit").click();
    alert("编组成功！");
  }

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
      seletedSendBatchStr += rows[index].children[1].innerHTML + ";";
      selctedCarNumStr += rows[index].children[2].innerHTML + ";";
      seletedSendDateStr += rows[index].children[3].innerHTML + ";";
      //从已选中的车辆行重获取信息(id和状态)
      selctedStatusStr += rows[index].lastElementChild.innerHTML + ";";
      selctedIdStr += rows[index].lastElementChild.previousElementSibling.innerHTML + ";";

    }
  }
}
//允许用户在列中修改车号
function changeCarNumInRow() {
  if (canChangeCarNum == false) {
    //开启功能
    console.log("开启变更车号");
    var rows = document.querySelectorAll("#col_right_list>table>tbody tr");
    if (rows.length != 0) {
      for (let index = 0; index < rows.length; index++) {
        let num = rows[index].children[2]; //选择每行的第三个子元素-车号
        var currentNum = num.innerHTML;
        num.innerHTML = "";
        var input = document.createElement("input");
        input.className = "alterCarNumInput";
        input.value = currentNum;
        input.onkeydown = function (e) {
          var keyNum;
          keyNum = window.event ? e.keyCode : e.which;
          //  console.log(keyNum);
          //var keyChar = String.fromCharCode(keyNum);
          if (keyNum == 13) {
            //当用户按下回车时，清空当前元素的子节点
             rs_removeAllChild(num);
             num.innerHTML = this.value
          }
        }
        num.appendChild(input);
      }
    } else {
      console.log("行中没有数据！");
    }
    canChangeCarNum = true;
  } else {
    //关闭功能
    console.log("关闭变更车号");
    var rows = document.querySelectorAll("#col_right_list>table>tbody tr");
    if(rows.length != 0){
        for (let index = 0; index < rows.length; index++) {
          let num = rows[index].children[2]; //选择每行的第三个子元素-车号
          if(num.firstElementChild != null){
            //若当前元素有子节点时，清空子节点并赋值车号到本元素
            let newCarNum = num.firstElementChild.value;
            rs_removeAllChild(num);
            num.innerHTML = newCarNum;
          }       
        }
    }else{
      console.log("行内没有数据")
    }
    canChangeCarNum = false;
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