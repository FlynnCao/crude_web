/**
 * @author RainSilver
 * @email [ppstream123@126.com]
 * @create date 2019-03-30 09:51:40
 * @modify date 2019-03-30 09:51:40
 * @desc [分析页面的逻辑]
 */
/**
 * 成员变量区
 */
//------------------------------------------------------------------------
var hasSelectedCar = 0; //已经选中的车号
var totalForSelectedCar = 0; //所有车辆数
checkForTotalCars(); //获取车辆总数
car_list_handleMutiClick();
analyse_setCarListIndex();
switchPages(0); //默认打开页面1
car_list_handleSimpleClick(); //单选事件绑定
/**
 * 函数区
 */
//--------------------------------------------------------------------------
//A多选控制模块
//绑定多选点击

function car_list_handleMutiClick() {
    var rows = document.querySelectorAll("#col_right_list1>table>tbody tr");
    for (let index = 0; index < rows.length; index++) {
        rows[index].onclick = function () {
            if (this.className != "car_list_checked") {
                this.className = "car_list_checked";
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
    var rows = document.querySelectorAll("#col_right_list1>table>tbody tr");
    totalForSelectedCar = rows.length;
    document.querySelector("#car_list_total_num").innerHTML = totalForSelectedCar;
    console.log(totalForSelectedCar);

}
//刷新车辆选择数
function refreshSelectedCarNum() {
    var num = hasSelectedCar;
 //   console.log("selected" + num);
    document.querySelector("#car_selected_num").innerHTML = num;
}

//按参选择选择所有车辆列表(true:全选;false:隐藏)
function car_list_select(flag) {
    var rows = document.querySelectorAll("#col_right_list1>table>tbody tr");
    console.log(rows.length);
    //页面变化
    for (let index = 0; index < rows.length; index++) {
        if (flag == true) {
            console.log(totalForSelectedCar);
            rows[index].className = "car_list_checked";

            hasSelectedCar = totalForSelectedCar;
            refreshSelectedCarNum();
        } else {
            rows[index].className = "car_list_unchecked";
            hasSelectedCar = 0;
            refreshSelectedCarNum();

        }
        //如果参数为1则全部选择 反之全部取消选择
    }

}

//B列表自动序号模块
function analyse_setCarListIndex() {
    var pages = document.querySelectorAll(".analyse_page");
    for (let index = 0; index < pages.length; index++) {
        let rows = pages[index].querySelectorAll("table>tbody tr");
        for (let index = 0; index < rows.length; index++) {
            rows[index].children[0].innerHTML = index + 1;
        }
    }

}
//C主要页面切换模块
var currentPage = 0;
function switchPages(pageNum) {
    currentPage = pageNum;
    var pages = document.querySelectorAll(".analyse_page");
    var blocks = document.querySelectorAll("#col_left>ul li");
    //页面数量变更
    for (let index = 0; index < blocks.length; index++) {
        if (index == currentPage) {
            pages[index].style.display = "block";
            blocks[index].style.color = "#465DD2";
            if(currentPage == 1){
                //隐藏功能区并显示批次列表
                document.querySelector("#col_right_func").style.display = "none";
            }else{
                document.querySelector("#col_right_func").style.display = "flex";

            }
        } else {
            pages[index].style.display = "none";
            blocks[index].style.color = "black";
        }
        //页面索引等于当前定位标号的页面显示，否则隐藏；导航栏颜色同理
    }

}

//D 单选列表模块
//绑定单选
//绑定列表块点击事件(仅允许单选)
function car_list_handleSimpleClick() {
    var rows = document.querySelectorAll("#col_right_list2>table>tbody tr");
    for (let index = 0; index < rows.length; index++) {
        rows[index].onclick = function () {
            car_list_select_clear();
            this.className = "car_list_checked";
            // selectedCarNum = this.children[2].innerHTML;
            // selectedBatchNum = this.children[1].innerHTML;
            // selectedCarFatWeight = this.children[5].innerHTML;
            // selectedCarEmptyWeight = this.children[6].innerHTML;
            // selectedCarStatus = this.lastElementChild.innerHTML;
            // selectedCarId = this.lastElementChild.previousElementSibling.innerHTML;
            // selectedCarIndex = index;   

        }
    }
}
//绑定列表块点击事件
function car_list_select_clear() {
    var rows = document.querySelectorAll("#col_right_list2>table>tbody tr");
    //console.log(rows.length);
    for (let index = 0; index < rows.length; index++) {
        rows[index].className = "car_list_unchecked";
    }
}