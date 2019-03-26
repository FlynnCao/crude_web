/**
 * @author RainSilver
 * @email ppstream123@126.com
 * @create date 2019-03-20 19:57:26
 * @modify date 2019-03-20 19:57:26
 * @desc [用于多角色登陆下页面的统一样式的控制]
 */
/*自动启动的函数列表*/
adjustLeftNav(); //导航栏调整
adjustFuncButton(); //功能区调整
adjustTitleName(); //网站标题调整

//网站标题调整
function adjustTitleName(){
    document.querySelector("#col_left>div span:nth-child(2)").innerHTML = "Crude";
}

//导航栏调整
/*描述：根据内部包含块的个数，动态调整外围的大小 */
function adjustLeftNav() {
    var real_blocks = document.querySelectorAll("#col_left>ul li");
    //console.log(real_blocks.length);
    document.querySelector("#col_left>ul").style.height = 50 * real_blocks.length + 50 + "px";
}
//功能区调整
/*描述：根据内部包含块的个数，动态调整外围的大小 */
function adjustFuncButton(){
    var real_buttons = document.querySelectorAll("#col_right_func>div button");
    var num = real_buttons.length;
   // console.log(real_buttons.length);
    if(num != 0){
        document.querySelector("#col_right_func>div").style.width = (num * 120) + 50 + "px";
        /*按钮盒子大小= 按钮盒子数量 * 长宽 + 50  */
    }

}