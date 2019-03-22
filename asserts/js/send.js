/**
 * @author RainSilver
 * @email ppstream123@126.com
 * @create date 2019-03-18 20:54:56
 * @modify date 2019-03-19 08:10:35
 * @desc 主要页面的相关逻辑
 */
/*默认调用区 */
//givenListHeight();
bindingAddBatchConfirm();
//refreshBatchInfo();
/*系统变量区 */
//存储当前页和所有页
var allPages = new Array(1, 2, 3, );
var currentPage = 0;
var firstIntoPage = true;
//第一次启动时，载入发车页-今日批次
if (firstIntoPage) {
    switchPages(0);
    switchSentBatches(0);


}
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
    }

}

function bindingAddBatchConfirm() {
    //绑定新增批次确认按钮
    document.querySelector("#addBatch_ok").onclick = function () {
        //       addBatchSubmit();

       // batchUpdateJSON();
     //   refreshBatchInfo();

    }
    document.querySelector("#addBatch_refresh").onclick = function () {
        //       addBatchSubmit();

        batchUpdateJSON();
    }
}
// //新增批次-确认操作
// function batchUpdateJSON() {
//     // var num = document.querySelector("#addBatchConsole>form input");
//     // console.log(num.length);

//     //1批号 2日期 3油量 4水分 5密度 6车数
//     var carNum = document.getElementById("abc_num").value;
//     console.log(carNum);

//     // var oil = document.querySelector("#addBatchConsole>form input:nth-child(3)").value;
//     // var water = document.querySelector("#addBatchConsole>form input:nth-child(4)").value;
//     // var density = document.querySelector("#addBatchConsole>form input:nth-child(5)").value;

//     $.ajaxSettings.async = true;

//     $.getJSON("data/currentBatch.json",
//         function (data) {
//             //传入JSON数据
//             console.log("导入发出批次信息");
//             $.each(data, function (key, value) {
//                switch (key) {
//                    case "batch_density":
//                     value = "2.3232"
//                     console.log(value);
//                        break;
               
//                    default:
//                        break;
//                }
//                 //遍历JSON对象
                
                
//                 // switch (key) {
//                 //     case "batch_car_num":
//                 //         value = carNum;
//                 //         break;
//                 //     case "batch_oil":
//                 //         // value = oil;
//                 //         break;
//                 //     case "batch_water":
//                 //         // value = water;
//                 //         break;
//                 //     case "batch_density":
//                 //         // value = density;
//                 //         break;
//                 //     default:
//                 //         break;
//                 // }

//             });
//         }   
//     );
//     // refreshBatchInfo();
//     $.ajaxSettings.async = false;


// }
// //刷新列表的状态和批次信息
// function refreshBatchInfo() {

//     $.ajaxSettings.async = true;

//         $.getJSON("data/currentBatch.json",
//         function (data) {
//             //传入JSON数据
//             console.log("刷新发出批信息");
//             $.each(data, function (key, value) {
//                 //遍历JSON对象
//                 switch (key) {
//                     case "batch_car_num":
//                         console.log(value);
//                         break;
//                     case "batch_oil":
//                         console.log(value);
//                         break;
//                     case "batch_water":
//                         console.log(value);
//                         break;
//                     case "batch_density":
//                         console.log(value);
//                         break;
//                     default:
//                         break;
//                 }

//             });
//         }


       

//     );
//     $.ajaxSettings.async = false;

// }