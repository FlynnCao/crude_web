/**
 * @author RainSilver
 * @email ppstream123@126.com
 * @create date 2019-03-18 20:54:56
 * @modify date 2019-03-19 08:10:35
 * @desc 主要页面的相关逻辑
 */
/*默认调用区 */
/*系统变量区 */
//存储当前页和所有页
var allPages = new Array(1, 2, 3, );
var currentPage = 0;
var firstIntoPage = true;
//第一次启动时，载入发车页-今日批次
if (firstIntoPage) {
    switchPages(0);
    switchSentBatches(0);
    firstIntoPage = false;
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
            blocks[index].style.color = "#38f"
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
            blocks[index].style.color = "#38f";
        } else {
            batches[index].style.display = "none";
            blocks[index].style.color = "black";
        }
    }

}