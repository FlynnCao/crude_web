/**
 * @author RainSilver
 * @email [ppstream123@126.com]
 * @create date 2019-03-21 15:11:04
 * @modify date 2019-03-23 09:17:00
 * @desc [轨道衡相关逻辑]
 */
car_list_handleSimpleClick(); //绑定列表块点击事件


//绑定列表块点击事件(仅允许单选)
function car_list_handleSimpleClick() {

    var rows = document.querySelectorAll("#col_right_list>table>tbody tr");
    for (let index = 0; index < rows.length; index++) {
        rows[index].onclick = function () {
            car_list_select_clear();
            this.className = "car_list_checked";      
        }   



    }
}
//绑定列表块点击事件

function car_list_select_clear(){
    var rows = document.querySelectorAll("#col_right_list>table>tbody tr");
   //console.log(rows.length);
    for (let index = 0; index < rows.length; index++) {
        rows[index].className = "car_list_unchecked";

    }
}
//控制过衡窗口的显隐 @param:true(隐藏)，false(显示)
function showOverBalanceConsole(flag) {
    if (flag == true) {
        document.querySelector("#overBalanceConsoleLayer").style.display = "none";
        document.querySelector("#overBalanceConsole").style.display = "none";


    } else {
        document.querySelector("#overBalanceConsoleLayer").style.display = "block";
        document.querySelector("#overBalanceConsole").style.display = "block";
    }

}



