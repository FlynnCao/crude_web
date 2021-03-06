/**
 * @author RainSilver
 * @email [ppstream123@126.com]
 * @create date 2019-03-23 11:00:19
 * @modify date 2019-04-27 21:52:11
 * @desc [报表页面的逻辑]
 */
//切换日期页面 @pageNUm:点击的按钮标号
var currentPage = 0; //当前报表
var currentPattern = 0; //当前模式
switchReportDate(0); //默认定位到日报
report_setCarListIndex(); //自动生成列表序号
handleChartMenuClick(); //控制柱状图菜单的点击
setChartBarTotalStatus(); //设置柱状图批次状态
handleSearchEvent(); //绑定键盘回车搜索
adjustListHeight(); //调整列表大小




function switchReportDate(pageNum) {
    currentPage = pageNum;
    var pages = document.querySelectorAll("#col_right_list .report_list");
    var blocks = document.querySelectorAll("#col_right_date>ul li");

    //切换报表页面
    for (let index = 0; index < blocks.length; index++) {
        if (index == currentPage) {
            pages[index].style.display = "block";
            blocks[index].style.color = "#465DD2"
            setChartBarTotalStatus();
        } else {
            pages[index].style.display = "none";
            blocks[index].style.color = "black";
        }
        //页面索引等于当前定位标号的页面显示，否则隐藏；导航栏颜色同理
    }
    //生成报表-列表序号
    report_setCarListIndex();


}
//根据用户选择的模式更改图表样式 0表格 1柱状图 2饼状图 3折线图
function switchReportDatePattern(patternNum) {
    currentPattern = patternNum;
    //点选柱状图时，由列表创建新的列表块
    if (currentPattern == 1) {
        preLoadingBarList();
        //    console.log("pre");

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
    //获取列表中的第N个元素并将其录入字符串数组    
    var pages = document.querySelectorAll("#col_right_list .report_list");
    var page = pages[currentPage]; //当前报表   
    var rows = page.querySelectorAll(".report_list_chart>table>tbody tr");
    // console.log(rows.length);
    var list = page.querySelector(".report_list_chart_bar");
    var ul = list.querySelector("ul");
    var ol = list.querySelector("ol");
    rs_removeAllChild(ul); //清空先前存在的柱，防止用户错按
    rs_removeAllChild(ol);
    //根据数据的长短创建块的大小
    for (let index = 0; index < rows.length; index++) {
        var block1 = document.createElement("li");
        var block2 = document.createElement("li");
        ul.appendChild(block1);
        ol.appendChild(block2);
    }
    // console.log("柱的刷零" + ul.length);
};

//柱状图-展示 @requestData：请求展示的数据 0 发出油量 1发出车数 2进厂油量 3进厂车数
function report_showBarChart(row_index) {
    //获取列表中的第N个元素并将其录入字符串数组    
    var pages = document.querySelectorAll("#col_right_list .report_list");
    var page = pages[currentPage]; //当前报表   
    var rows = page.querySelectorAll(".report_list_chart>table>tbody tr");
    //console.log(rows.length);
    var amounts = new Array();
    var dates = new Array();
    for (let index = 0; index < rows.length; index++) {
        const x = rows[index].children[row_index].innerHTML;
        amounts.push(x);
        const d = rows[index].children[1].innerHTML;
        dates.push(d);

    }
    //console.log(row_index);
    var bars = page.querySelectorAll(".report_list_chart_bar>ul li");
    var tips = page.querySelectorAll(".report_list_chart_bar>ol li");
    // amounts.forEach(element => {
    //     console.log(element);

    // });
    var max_amount = Math.max.apply(null, amounts);
    //console.log("max" + max_amount);
    //  console.log(tips.length);
    for (let index = 0; index < bars.length; index++) {
        var height = ((amounts[index] / max_amount) * 180);
        // console.log(height);
        bars[index].style.height = height + "px";
        if (height != 0) {
            bars[index].innerHTML = amounts[index];
        }
        tips[index].innerHTML = dates[index];

    }
}

//自动生成序号
function report_setCarListIndex() {
    var pages = document.querySelectorAll("#col_right_list .report_list");
    var page = pages[currentPage]; //当前报表
    var rows = page.querySelectorAll("table>tbody tr");
    //console.log(rows.length);
    for (let index = 0; index < rows.length; index++) {
        rows[index].children[0].innerHTML = index + 1;

    }
}

//控制柱状图菜单的点击
function handleChartMenuClick() {
    var pages = document.querySelectorAll("#col_right_list .report_list");
    var buttons = document.querySelectorAll(".bar_menu_button");
   // console.log("button" + buttons.length);
    for (let index = 0; index < buttons.length; index++) {
        buttons[index].addEventListener('click', function () {
            for (let index = 0; index < buttons.length; index++) {
                buttons[index].style.borderLeft = "3px solid transparent";
            }
            this.style.borderLeft = "3px solid #38f";
        })

    }

}
//设置柱状图统计总量数据
function setChartBarTotalStatus() {
    var pages = document.querySelectorAll("#col_right_list .report_list");
    var page = pages[currentPage]; //当前报表
    //获取数据
    rows = page.querySelectorAll(".report_list_chart>table>tbody tr");
    var totalSentOil = 0;
    var totalSentCar = 0;
    var totalGetOil = 0;
    var totalGetCar = 0;
    for (let index = 0; index < rows.length; index++) {
        totalSentOil += Number(rows[index].children[2].innerHTML);
        totalSentCar += Number(rows[index].children[3].innerHTML);
        totalGetOil += Number(rows[index].children[4].innerHTML);
        totalGetCar += Number(rows[index].children[5].innerHTML);

    }

     console.log(totalSentOil);
     console.log(totalSentCar);
     console.log(totalGetOil);
     console.log(totalGetCar);

    //提交数据
    divs = page.querySelectorAll(".bar_menu_button");
    //  console.log(divs.length);
    divs[0].querySelector("ul li:nth-child(2)").innerHTML = totalSentOil.toFixed(4);
    divs[1].querySelector("ul li:nth-child(2)").innerHTML = totalSentCar;
    divs[2].querySelector("ul li:nth-child(2)").innerHTML = totalGetOil.toFixed(4);
    divs[3].querySelector("ul li:nth-child(2)").innerHTML = totalGetCar;


}
//键盘回车绑定事件-开始搜索
function handleSearchEvent() {
    var search = document.querySelector("#col_right_top_search");
    search.onkeydown = function (e) {
        var keyNum;
        var keyChar;
        keyNum = window.event ? e.keyCode : e.which;
        console.log(keyNum);
        //keyChar = String.fromCharCode(keyNum);
        if (keyNum == 13) {
            //当按下回车键时
          //  console.log("bingoooo!");
            var info = document.querySelector("#col_right_top_search input").value;
         //   console.log(info);
            //获取当前页的当前行
            var pages = document.querySelectorAll("#col_right_list .report_list");
            var page = pages[currentPage]; //当前报表   
            var rows = page.querySelectorAll(".report_list_chart>table>tbody tr");
            for (let index = 0; index < rows.length; index++) {
                    var text = rows[index].children[1].innerHTML;
                    if (search_pairngString(info, text)) {
                        rows[index].style.display = "table-row";
                    } else {
                        rows[index].style.display = "none";

                    }
                

            }


        }

    }

    var historyList = document.querySelector("#col_right_page1_list2");
    //undefined 空的变量 null 空的对象
    if (historyList != null) {
        // console.log("list exist!");
        // var batchNums = document.querySelectorAll("#col_right_page1_list2>table>tbody tr>td:nth-child(2)");
        var rows = document.querySelectorAll("#col_right_page1_list2>table>tbody tr");
        for (let index = 0; index < rows.length; index++) {
            var num = rows[index].children[1].innerHTML; //获取每一行行对应的发出批号
            var date = rows[index].children[5].innerHTML; //获取每一行行对应的日期
            if (search_pairngString(info, num) || search_pairngString(info, date)) {
                rows[index].style.display = "table-row";
            } else {
                rows[index].style.display = "none";

            }
        }
    }

}
//搜索-字符串匹配
function search_pairngString(obj, str) {
    if (str.indexOf(obj) >= 0) {
        return true;
    } else {
        return false;
    }
}


function adjustListHeight() {
    
    //1、获取所有列表
    //2、获取右侧栏的实际高度
    //3、循环列表数组，减去功能区和搜索栏高度，为每一个列表设置剩余的高度
    var lists = document.querySelectorAll(".report_list");
    var onlyList = document.querySelector("#col_right_list");

    var box = document.getElementById("col_right");
    console.log(lists.length);
    console.log(box.offsetHeight);
    // if(lists != null){
    //    for (let index = 0; index < lists.length; index++) {

    //     lists[index].style.height = (box.offsetHeight - 300) + "px";
    //     lists[index].style.background = "lightgreen";


    //    }
       
    // } 
    onlyList.style.height = (box.offsetHeight - 79 -70 -100) + "px";

    
  };
