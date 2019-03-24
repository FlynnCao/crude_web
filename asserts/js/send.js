/**
 * @author RainSilver
 * @email ppstream123@126.com
 * @create date 2019-03-18 20:54:56
 * @modify date 2019-03-19 08:10:35
 * @desc 主要页面的相关逻辑
 */
/*默认调用区 */
//givenListHeight();
//bindingAddBatchConfirm();
//refreshBatchInfo();
/*系统变量区 */
//存储当前页和所有页
var allPages = new Array(1, 2, 3);
var currentPage = 0;
var firstIntoPage = true;
var cars = new Array(); //存储车辆列表
var cars_i = 0; //存储车辆列表的下标
//第一次启动时，载入发车页-今日批次
if (firstIntoPage) {
    switchPages(0);
    switchSentBatches(1);


}
/*默认自动启动的函数 */
//1.search_pairngString
//2.handleSearchButton
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
//切换显示的批次
function switchSentBatches(batchNum) {
    currentBatch = batchNum;
    var batches = document.querySelectorAll(".crude_sent_batch");
    var blocks = document.querySelectorAll("#col_right_page1_func>ul li");
    // console.log(batches.length);
    // console.log(blocks.length);
    for (let index = 0; index < blocks.length; index++) {
        if (index == currentBatch) {
            batches[index].style.display = "block";
            blocks[index].style.color = "#465DD2";
        } else {
            batches[index].style.display = "none";
            blocks[index].style.color = "black";
        }
    }
}
//控制新增批次的显隐 @param:true(隐藏)，false(显示)
function showAddBatchConsole(flag) {
    if (flag == true) {
        document.querySelector("#addBatchConsole").style.display = "none";
        document.querySelector("#addBatchConsoleLayer").style.display = "none";

    } else {
        document.querySelector("#addBatchConsole").style.display = "block";
        document.querySelector("#addBatchConsoleLayer").style.display = "block";
        addBatch_handleCarListClick(); //新增批次选车列表点击

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
    console.log(carsStr);
}
//右侧-搜索按钮绑定事件-历史批
(function handleSearchButton() {
    document.querySelector("#col_right_top_search>span").onclick = function () {
        var info = document.querySelector("#col_right_top_search>input").value;
        // console.log(info);
        var historyList = document.querySelector("#col_right_page1_list2");
        //undefined 空的变量 null 空的对象
        if (historyList != null) {
            // console.log("list exist!");
            // var batchNums = document.querySelectorAll("#col_right_page1_list2>table>tbody tr>td:nth-child(2)");
            var rows = document.querySelectorAll("#col_right_page1_list2>table>tbody tr");
            for (let index = 0; index < rows.length; index++) {
                var num = rows[index].children[1].innerHTML; //获取每一行行对应的发出批号
                var date = rows[index].children[5].innerHTML; //获取每一行行对应的日期
                if(search_pairngString(info, num) || search_pairngString(info, date)){
                   rows[index].style.display = "table-row";
                }else{
                    rows[index].style.display = "none";

                }
            }
        }
    }
})();
//搜索-字符串匹配
function search_pairngString(obj, str) {
    if (str.indexOf(obj) >= 0) {
        return true;
    } else {
        return false;
    }
}