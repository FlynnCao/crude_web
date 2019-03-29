/**
 * @author RainSilver
 * @email [ppstream123@126.com]
 * @create date 2019-03-22 10:07:55
 * @modify date 2019-03-22 10:07:55
 * @desc [化验的相关逻辑0]
 */
//存储后台提交表单的变量
var selctedIdStr = ""; //所有选中的id
var selctedStatusStr = ""; //所有选中的状态
//默认函数启动区
var showHidden = true;
hiddenBackStage();



//控制二级窗口的显隐 @param:true(显示)，false(隐藏)
function showLayerAndConsole(flag) {
    if (flag == true) {
        labConsolePreLoading();
        document.querySelector("#assay_car_console").style.display = "block";
        document.querySelector("#assay_car_console_layer").style.display = "block";
    } else {
        document.querySelector("#assay_car_console").style.display = "none";
        document.querySelector("#assay_car_console_layer").style.display = "none";
    }
}

function labConsolePreLoading() {
    setSelectedCarInfo();
    console.log("已选车的id" + selctedIdStr);
    console.log("已选车的状态" + selctedStatusStr);
    var acc = document.querySelector("#assay_car_console");
    acc.querySelector("input:nth-child(2)").value = selctedIdStr;
    acc.querySelector("input:nth-child(3)").value = selctedStatusStr;
    //隐藏后台表单
    //document.querySelector("#assay_car_console menu").style.display = "none";

}

/*右侧-列表-隐藏后台表单和最后两个值*/
function hiddenBackStage() {
    var cells = document.querySelectorAll("#col_right_list>table tr>td:last-child,th:last-child,td:nth-last-child(2),th:nth-last-child(2)");
    for (let index = 0; index < cells.length; index++) {
        cells[index].style.display = "none";
    }
    document.querySelector("#assay_car_console>form>menu").style.display = "none";

}
//遍历获得列表信息
function setSelectedCarInfo() {
    var rows = document.querySelectorAll("#col_right_list>table>tbody tr");
    console.log(rows.length);
    for (let index = 0; index < rows.length; index++) {
        if (rows[index].className == "car_list_checked") {
            // //从已选中的车辆行重获取信息(其他信息)
            // seletedSendBatchStr += rows[index].children[1].innerHTML += ";";
            // selctedCarNumStr += rows[index].children[2].innerHTML += ";";
            // seletedSendDateStr += rows[index].children[3].innerHTML += ";";
            //从已选中的车辆行重获取信息(id和状态)
            selctedStatusStr += rows[index].lastElementChild.innerHTML + ";";
            selctedIdStr += rows[index].lastElementChild.previousElementSibling.innerHTML + ";"
        }
    }
}


// //绑定列表块点击事件(仅允许单选) (弃用)
// function car_list_handleSimpleClick() {
//     var rows = document.querySelectorAll("#col_right_list>table>tbody tr");
//     for (let index = 0; index < rows.length; index++) {
//         rows[index].onclick = function () {
//             car_list_select_clear();
//             this.className = "car_list_checked";
//             selectedCarId = this.children[0].innerHTML;
//             console.log("selected car id : " + selectedCarId);
//         }
//     }
// }

// //清除车辆列表的所有选择(弃用)
// function car_list_select_clear() {
//     var rows = document.querySelectorAll("#col_right_list>table>tbody tr");
//    // console.log("total rows:" + rows.length);
//     for (let index = 0; index < rows.length; index++) {
//         rows[index].className = "car_list_unchecked";
//     }
// }
//绑定列表车辆点击事件
// function car_list_handleClick() {

//     var rows = document.querySelectorAll("#col_right_list>table>tbody tr");
//     for (let index = 0; index < rows.length; index++) {
//         rows[index].onclick = function () {
//             if (this.className != "car_list_checked") {
//                 this.className = "car_list_checked";
//                 selectedCarNumStr += this.children[2].innerHTML + ";";
//                 hasSelectedCar++;
//                 if (hasSelectedCar > totalForSelectedCar) {
//                     hasSelectedCar = totalForSelectedCar;
//                 } //当用户重复选择时，避免出现不合理数字
//                 refreshSelectedCarNum();
//             } else {
//                 this.className = "car_list_unchecked";
//             }
//         }

//     }
// }