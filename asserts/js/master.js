/**
 * @author RainSilver
 * @email [ppstream123@126.com]
 * @create date 2019-03-23 09:04:52
 * @modify date 2019-03-27 13:07:31
 * @desc [对所有页面适用的交互逻辑]
 */

var crudeSet = document.querySelector("#crude_setting");
/**
 * 函数自动运行区
 */
setCarListIndex(); //获取序号

//handleSearchButtonClick(); //绑定搜索
//============================================================================
/**
 * 车辆列表多选
 */
//var selctedCarIndexArray = new Array();
var car_index = 0;
// var selctedIdStr = ""; //所有选中的id
// var selctedStatusStr = ""; //所有选中的状态
var hasSelectedCar = 0; //已经选中的车号
var totalForSelectedCar = 0; //所有车辆数
//绑定多选点击事件
//console.log(document.querySelector(".crude_setting_carListMutiSelct").innerHTML);

if (crudeSet.querySelector(".crude_setting_carListMutiSelct").innerHTML == 1) {
    car_list_handleMutiClick();
    checkForTotalCars();

}

function car_list_handleMutiClick() {
    var rows = document.querySelectorAll("#col_right_list>table>tbody tr");
    for (let index = 0; index < rows.length; index++) {
        rows[index].onclick = function () {
            if (this.className != "car_list_checked") {
                this.className = "car_list_checked";
                //  selctedCarIndexArray[car_index++] = index;
                // selctedStatusStr += this.lastElementChild.innerHTML + ";";
                //  selctedIdStr += this.lastElementChild.previousElementSibling.innerHTML + ";";
                hasSelectedCar++;
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
    var carNum = document.querySelector("#car_list_total_num");
    //  console.log(carNum.nodeValue);
    if (carNum != null) {
        carNum.innerHTML = totalForSelectedCar;
    }
}
//刷新车辆选择数
function refreshSelectedCarNum() {
    var num = hasSelectedCar;
    //  console.log("已经选中的：" + hasSelectedCar);
    document.querySelector("#car_selected_num").innerHTML = num;
}

//按参选择选择所有车辆列表(true:全选;false:隐藏)
function car_list_select(flag) {
    var rows = document.querySelectorAll("#col_right_list>table>tbody tr");
    // console.log(rows.length);
    //页面变化
    car_index = 0; //列表块Index归零
    for (let index = 0; index < rows.length; index++) {
        if (flag == true) {
            rows[index].className = "car_list_checked";
            hasSelectedCar = totalForSelectedCar;
            //  selctedCarIndexArray[car_index++] = index;
            refreshSelectedCarNum();
        } else {
            rows[index].className = "car_list_unchecked";
            hasSelectedCar = 0;
            refreshSelectedCarNum();
            //  selctedCarIndexArray.length = 0; //清空数组

        }
        //如果参数为1则全部选择 反之全部取消选择
    }
    //数据变化
    // setAllCarIdAndStatus(); //存储所有车辆的状态和id
}
//============================================================================

//设置车辆列表的序号
function setCarListIndex() {
    var rows = document.querySelectorAll("#col_right_list>table>tbody tr");
    //   console.log(rows.length);
    if (rows.length != 0) {
        for (let index = 0; index < rows.length; index++) {
            rows[index].children[0].innerHTML = index + 1;
        }
    }

}

//刷新当前页面
function refreshWebPage() {
    location.replace(location);
}
//清空搜索框
function emptySearchText() {
    var emp = document.querySelector("#col_right_top_search  div span:last-child");
    if (emp != null) {
        document.querySelector("#col_right_top_search div input").value = "";
    } else {
        console.log("no such search bar");
    }
}

// function handleSearchButtonClick(){
//     var sear = document.querySelector("#col_right_top_search>form");
//     var s = x.querySelector("div span:first-child");
//     var input = x.querySelector("div input");
//     console.log(s.nodeName);
//     s.onclick = function(){
//         x.submit();
//         console.log(input.value);
//     }
// }