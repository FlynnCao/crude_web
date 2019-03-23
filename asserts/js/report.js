/**
 * @author RainSilver
 * @email [ppstream123@126.com]
 * @create date 2019-03-23 11:00:19
 * @modify date 2019-03-23 12:07:26
 * @desc [报表页面的逻辑]
 */
//切换日期页面 @pageNUm:点击的按钮标号
var currentPage = 0;
switchReportDate(0);
function switchReportDate(pageNum) {
    currentPage = pageNum;
    var pages = document.querySelectorAll("#col_right_list .report_list");
   // console.log(pages.length);

    var blocks = document.querySelectorAll("#col_right_date>ul li");
   // console.log(blocks.length);
    
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