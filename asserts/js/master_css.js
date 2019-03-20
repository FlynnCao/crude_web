/**
 * @author RainSilver
 * @email ppstream123@126.com
 * @create date 2019-03-20 19:57:26
 * @modify date 2019-03-20 19:57:26
 * @desc [用于多角色登陆下页面的统一样式的控制]
 */
/*自动启动的函数列表*/
adjustLeftNav(); //导航栏调整




//导航栏调整
/*功能：根据内部包含块的个数，动态调整外围的大小 */
function adjustLeftNav() {
    var real_blocks = document.querySelectorAll("#col_left>ul li");
    //console.log(real_blocks.length);
    document.querySelector("#col_left>ul").style.height = 50 * real_blocks.length + 50 + "px";
}