/**
 * @author RainSilver
 * @email ppstream123@126.com
 * @create date 2019-03-18 20:54:56
 * @modify date 2019-04-02 16:22:07
 * @desc 主要页面的相关逻辑
 */
/*默认调用区 */
//givenListHeight();
//bindingAddBatchConfirm();
//refreshBatchInfo();
/*系统变量区 */
var allPages = new Array(1, 2, 3); //存储当前页和所有页
var currentPage = 0;
var firstIntoPage = true;
var cars = new Array(); //存储车辆列表
var cars_i = 0; //存储车辆列表的下标
var seletedBatchNum = ""; //选中批次的批号
var seletedBatchDate = ""; //选中批次的发出日期
var seletedBatchOil = ""; //选中批次的发出日期
var seletedBatchWater = ""; //选中批次的水分
var seletedBatchDensity = ""; //选中批次的密度
var seletedBatchCar = ""; //选中批次的车数
//当前批次信息
var latestOil = "";
var latestWater = "";
var latestDensity = "";
var latestCar = "";

/*自启动函数区 */
car_list_handleSimpleClick(); //列表单选控制
switchPages(0); //默认切换到  发出 页
setCarListIndex(); //设置车辆列表下标
addAlertMessage(); //添加提示信息
setBatchStatus(); //设置最新批信息
//当前或者历史批次
var currentBatch = 0;
/*功能函数区 */
//切换分页面 @pageNUm:点击的按钮标号
function switchPages(pageNum) {
    currentPage = pageNum;
    var pages = document.querySelectorAll(".crude_page");
    var blocks = document.querySelectorAll("#col_left>ul li");
    //页面数量变更
    for (let index = 0; index < blocks.length; index++) {
        if (index == currentPage) {
            pages[index].style.display = "block";
            blocks[index].style.color = "#465DD2"
        } else {
            pages[index].style.display = "none";
            blocks[index].style.color = "black";
        }
        //页面索引等于当前定位标号的页面显示，否则隐藏；导航栏颜色同理
    }

}
//控制新增批次的显隐 @param:true(显示)，false(隐藏)
function showBatchDetailConsole(flag) {
    if (flag == true) {
        document.querySelector("#BatchDetailConsole").style.display = "block";
        document.querySelector("#SecondConsoleLayer").style.display = "block";



    } else {

        document.querySelector("#BatchDetailConsole").style.display = "none";
        document.querySelector("#SecondConsoleLayer").style.display = "none";
    }
}
//控制新增批次的显隐 @param:true(显示)，false(隐藏)
function showAddBatchConsole(flag) {
    if (flag == true) {
        document.querySelector("#addBatchConsole").style.display = "block";
        document.querySelector("#SecondConsoleLayer").style.display = "block";
        addBatch_handleCarListClick(); //新增批次选车列表点击


    } else {
        document.querySelector("#addBatchConsole").style.display = "none";
        document.querySelector("#SecondConsoleLayer").style.display = "none";


    }
}
//新增批次-显示车辆选择列表
function showSelectCarList(flag) {
    if (flag == true) {
        document.querySelector("#addBatchConsole_carMenuBack").style.display = "none";
        document.querySelector("#addBatchConsole_carMenu").style.display = "flex";
    } else {
        document.querySelector("#addBatchConsole_carMenuBack").style.display = "block";
        document.querySelector("#addBatchConsole_carMenu").style.display = "none";
    }


}
//新增批次-控制车辆点击选择添加
function addBatch_handleCarListClick() {
    let flag = false;
    var rows = document.querySelectorAll("#addBatchConsole>div>div>table>tbody tr");
    for (let index = 0; index < rows.length; index++) {
        rows[index].onclick = function () {
            this.className = "batch_car_list_checked";
            let carNum = this.children[1].innerHTML;
            //查重
            cars.forEach(element => {
                if (element == carNum) {
                    flag = true;
                }
            });
            if (flag == false) {
                cars[cars_i++] = carNum;
            }
            flag = false;
            // console.log(this.children[1].innerHTML);
        }

    }
}
//新增批次-保存选择的车辆列表
function saveSelectedCarList() {
    var carsStr = "";
    // cars.forEach(element => {
    //     console.log(element);
    // });
    for (let index = 0; index < cars.length; index++) {
        carsStr += cars[index] + ";";
    }
    document.querySelector("#addBatch_form_car").value = carsStr;
    showSelectCarList(false);
    // console.log(carsStr);
}
//绑定列表块点击事件(仅允许单选)
function car_list_handleSimpleClick() {
    let rows = document.querySelectorAll("#col_right_page1_list>table>tbody tr");
    for (let index = 0; index < rows.length; index++) {
        rows[index].onclick = function () {
            car_list_select_clear();
            this.className = "car_list_checked";
            seletedBatchNum = this.children[1].innerHTML;
            seletedBatchOil = this.children[2].innerHTML;
            seletedBatchWater = this.children[3].innerHTML;
            seletedBatchDensity = this.children[4].innerHTML;
            seletedBatchDate = this.children[5].innerHTML;
            let cars = document.querySelectorAll("#BatchDetailConsole_carMenu table>tbody tr");
            seletedBatchCar = cars.length;
            let inputs = document.querySelectorAll(".bdc_input");
            let inputs_i = 0;
            inputs[inputs_i++].value = seletedBatchNum;
            inputs[inputs_i++].value = seletedBatchDate;
            inputs[inputs_i++].value = seletedBatchOil;
            inputs[inputs_i++].value = seletedBatchWater;
            inputs[inputs_i++].value = seletedBatchDensity;
            //  console.log(document.querySelectorAll(".bdc_input").length);
            document.querySelector("#SecondConsoleLayer").style.display = "block";
            document.querySelector("#BatchDetailConsole").style.display = "block";
        }
    }
}
//绑定列表块批量清除事件
function car_list_select_clear() {
    //console.log("clear");
    var rows = document.querySelectorAll("#col_right_page1_list>table>tbody tr");
    //console.log(rows.length);
    for (let index = 0; index < rows.length; index++) {
        rows[index].className = "car_list_unchecked";

    }
}

//设置列表2的序号
function setCarListIndex() {
    var rows = document.querySelectorAll("#col_right_page1_list>table>tbody tr");
    // console.log(rows.length);
    for (let index = 0; index < rows.length; index++) {
        rows[index].children[0].innerHTML = index + 1;
    }

}




function addAlertMessage() {
    var ok = document.querySelector("#addBatchConsole>form>div input:first-child");
    ok.onclick = function () {
        alert("发出成功!");
    }

}

function setBatchStatus() {
    var rows = document.querySelectorAll("#col_right_page1_list>table>tbody tr");
    console.log(rows.length);
    if (rows.length != 0) {
        //从批次列表中最首行中获取信息
        latestOil = rows[0].children[2].innerHTML;
        latestWater = rows[0].children[3].innerHTML;
        latestDensity = rows[0].children[4].innerHTML;
        latestCar = rows[0].children[5].innerHTML;
        //将信息添加到批次状态区中
        document.querySelector("#current_batch_num").innerHTML = latestCar;
        document.querySelector("#current_batch_oil").innerHTML = latestOil;
        document.querySelector("#current_batch_water").innerHTML = latestWater;
        document.querySelector("#current_batch_density").innerHTML = latestDensity;
    } else {
        console.log("No rows in sent batch list!");
    }

}
// //右侧-搜索按钮绑定事件-历史批
// (function handleSearchButton() {
//     document.querySelector("#col_right_top_search>span").onclick = function () {
//         var info = document.querySelector("#col_right_top_search>input").value;
//         // console.log(info);
//         var historyList = document.querySelector("#col_right_page1_list");
//         //undefined 空的变量 null 空的对象
//         if (historyList != null) {
//             // console.log("list exist!");
//             // var batchNums = document.querySelectorAll("#col_right_page1_list>table>tbody tr>td:nth-child(2)");
//             var rows = document.querySelectorAll("#col_right_page1_list>table>tbody tr");
//             for (let index = 0; index < rows.length; index++) {
//                 var num = rows[index].children[1].innerHTML; //获取每一行行对应的发出批号
//                 var date = rows[index].children[5].innerHTML; //获取每一行行对应的日期
//                 if(search_pairngString(info, num) || search_pairngString(info, date)){
//                    rows[index].style.display = "table-row";
//                 }else{
//                     rows[index].style.display = "none";

//                 }
//             }
//         }
//     }
// })();
// //搜索-字符串匹配
// function search_pairngString(obj, str) {
//     if (str.indexOf(obj) >= 0) {
//         return true;
//     } else {
//         return false;
//     }
// }