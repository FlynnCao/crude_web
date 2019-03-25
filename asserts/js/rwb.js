/**
 * @author RainSilver
 * @email [ppstream123@126.com]
 * @create date 2019-03-21 15:11:04
 * @modify date 2019-03-23 09:17:00
 * @desc [轨道衡相关逻辑]
 */
car_list_handleSimpleClick(); //绑定列表块点击事件
var selectedCarNum = ""; //被选中的车辆号码
var selectedCarIndex = 0; //被选中的车辆行索引

//绑定列表块点击事件(仅允许单选)
function car_list_handleSimpleClick() {
    var rows = document.querySelectorAll("#col_right_list>table>tbody tr");
    for (let index = 0; index < rows.length; index++) {
        rows[index].onclick = function () {
            car_list_select_clear();
            this.className = "car_list_checked";
            selectedCarNum = this.children[2].innerHTML;
            selectedCarIndex = index;
        }
    }
}
//绑定列表块点击事件

function car_list_select_clear() {
    var rows = document.querySelectorAll("#col_right_list>table>tbody tr");
    //console.log(rows.length);
    for (let index = 0; index < rows.length; index++) {
        rows[index].className = "car_list_unchecked";

    }
}
//控制过衡窗口的显隐 @param:true(显示)，false(隐藏)
function showOverBalanceConsole(flag) {
    if (flag == true) {
        overBalancePreLoading();
        document.querySelector("#overBalanceConsoleLayer").style.display = "block";
        document.querySelector("#overBalanceConsole").style.display = "block";
    } else {
        document.querySelector("#overBalanceConsoleLayer").style.display = "none";
        document.querySelector("#overBalanceConsole").style.display = "none";

    }

}
function overBalancePreLoading(flag){
    document.querySelector("#overBalanceConsole>form input:first-child").value = selectedCarNum; //将油车号装填到Input中
    var rows = document.querySelectorAll("#col_right_list>table>tbody tr");
    //查看重车状态
    var fatWeight = rows[selectedCarIndex].children[5].innerHTML;
    if(fatWeight == ""){
        document.querySelector("#obc_emptyCar").disabled = "disabled";
        document.querySelector("#obc_emptyCar").style.background = "gray";
    }

}