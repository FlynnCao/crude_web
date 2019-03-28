/**
 * @author RainSilver
 * @email [ppstream123@126.com]
 * @create date 2019-03-23 11:00:19
 * @modify date 2019-03-23 12:07:26
 * @desc [报表页面的逻辑]
 */
//切换日期页面 @pageNUm:点击的按钮标号
var currentPage = 0;
var currentPattern = 0;
switchReportDate(0);
// var boss = document.querySelector("#test_ul");
// rs_removeAllChild(boss);

function switchReportDate(pageNum) {
    currentPage = pageNum;
    var pages = document.querySelectorAll("#col_right_list .report_list");
    var blocks = document.querySelectorAll("#col_right_date>ul li");

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
//根据用户选择的模式更改图表样式 0表格 1柱状图 2饼状图 3折线图
function switchReportDatePattern(patternNum) {
    currentPattern = patternNum;
     //点选柱状图时，由列表创建新的列表块
    if (currentPattern == 1) {
        preLoadingBarList();
    }
    var pages = document.querySelectorAll(".report_list");
    //更改功能区的颜色
    var blocks = document.querySelectorAll("#col_right_chart>ul li");
    //更改要显示的图表格式
    var lists = pages[currentPage].querySelectorAll(".report_list .report_list_chart");

    for (let index = 0; index < lists.length; index++) {
        if (index == currentPattern) {
            lists[index].style.display = "block";
            blocks[index].style.color = "#465DD2";

        } else {
            lists[index].style.display = "none";
            blocks[index].style.color = "white";
        }
    }
}

/*柱状图前置 */
function preLoadingBarList() {
    var rows = document.querySelectorAll("#col_right_list_day_table>table>tbody tr");
   // console.log(rows.length);
    var ul = document.querySelector("#col_right_list_day_bar>ul");
    var ol = document.querySelector("#col_right_list_day_bar>ol");
    rs_removeAllChild(ul); //清空先前存在的柱，防止用户错按
    rs_removeAllChild(ol);
    //根据数据的长短创建块的大小
    for (let index = 0; index < rows.length; index++) {
        var block1 = document.createElement("li");
        var block2 = document.createElement("li");
        ul.appendChild(block1);
        ol.appendChild(block2);
    }
};
//清空所有子节点
function rs_removeAllChild(node) {
    while (node.hasChildNodes()) //当div下还存在子节点时 循环继续
    {
        node.removeChild(node.firstChild);
    }
}
//柱状图-展示 @requestData：请求展示的数据 0 发出油量 1发出车数 2进厂油量 3进厂车数
function report_showBarChart(row_index) {
    //获取列表中的第N个元素并将其录入字符串数组       
    var rows = document.querySelectorAll("#col_right_list_day_table>table>tbody tr");
    var amounts = new Array();
    for (let index = 0; index < rows.length; index++) {
        const x = rows[index].children[row_index].innerHTML;
        amounts.push(x);
    }
    //console.log(row_index);
    var bars = document.querySelectorAll("#col_right_list_day_bar>ul li");
    var tips = document.querySelectorAll("#col_right_list_day_bar>ol li");
  //  console.log(tips.length);
    for (let index = 0; index < bars.length; index++) {
        bars[index].style.height = amounts[index] + "px";
        tips[index].innerHTML = amounts[index];
    }
}