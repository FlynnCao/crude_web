/**
 * @author RainSilver
 * @email [ppstream123@126.com]
 * @create date 2019-03-23 09:04:52
 * @modify date 2019-03-23 09:04:52
 * @desc [对所有页面适用的交互逻辑]
 */

//刷新当前页面
function refreshWebPage(){
    location.replace(location);
}
var crudeSet = document.querySelector("#crude_setting");
//============================================================================
/**
 * 车辆列表多选
 */ 
var selectedCarNumStr = ""; //所有选中车号数量
var hasSelectedCar = 0; //已经选中的车号
var totalForSelectedCar = 0; //所有车辆数
//绑定多选点击事件
//console.log(document.querySelector(".crude_setting_carListMutiSelct").innerHTML);
if(crudeSet.querySelector(".crude_setting_carListMutiSelct").innerHTML == 1){

    car_list_handleMutiClick();
    checkForTotalCars();
}
function car_list_handleMutiClick() {
    var rows = document.querySelectorAll("#col_right_list>table>tbody tr");
    for (let index = 0; index < rows.length; index++) {
        rows[index].onclick = function () {
            if (this.className != "car_list_checked") {
                this.className = "car_list_checked";
                selectedCarNumStr += this.children[2].innerHTML + ";";
                hasSelectedCar++;
                // if (hasSelectedCar > totalForSelectedCar) {
                //     hasSelectedCar = totalForSelectedCar;
                // } //当用户重复选择时，避免出现不合理数字
                refreshSelectedCarNum();
            } else {
                this.className = "car_list_unchecked";
                hasSelectedCar--;
                refreshSelectedCarNum();

            }
        }
    }
}
//获取车辆总数
function checkForTotalCars() {
    var rows = document.querySelectorAll("#col_right_list>table>tbody tr");
    totalForSelectedCar = rows.length;
    document.querySelector("#car_list_total_num").innerHTML = totalForSelectedCar;
}
//刷新车辆选择数
function refreshSelectedCarNum() {
    var num = hasSelectedCar;
     console.log("已经选中的：" + hasSelectedCar);
    document.querySelector("#car_selected_num").innerHTML = num;
}

//按参选择选择所有车辆列表
function car_list_select(flag) {
    var rows = document.querySelectorAll("#col_right_list>table>tbody tr");
    //console.log(rows.length);
    for (let index = 0; index < rows.length; index++) {
        if (flag == true) {
            rows[index].className = "car_list_checked";
            hasSelectedCar = totalForSelectedCar;
            selectedCarNumStr = getAllCarNum();
            refreshSelectedCarNum();
        } else {
            rows[index].className = "car_list_unchecked";
            hasSelectedCar = 0;
            selectedCarNumStr = "";
            refreshSelectedCarNum();

        }
        //如果参数为1则全部选择 反之全部取消选择
    }
}
//获取已经选择的车辆号并将其转化为字符串（省去查重）
function getAllCarNum() {
    var str = "";
    var rows = document.querySelectorAll("#col_right_list>table>tbody tr");
    for (let index = 0; index < rows.length; index++) {
        str += rows[index].children[2].innerHTML + ";";
    }
    return str;

};

function getSelectedCar() {
    var str = "";
    var rows = document.querySelectorAll("#col_right_list>table>tbody tr");
    for (let index = 0; index < rows.length; index++) {
        if (rows[index].className == "car_list_checked") {
            str += rows[index].children[2].innerHTML + ";";
        }
    }
    return str;
}

//===========================================================================================