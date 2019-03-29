/**
 * @author RainSilver
 * @email [ppstream123@126.com]
 * @create date 2019-03-21 15:11:04
 * 
 * @modify date 2019-03-23 09:17:00
 * @desc [轨道衡相关逻辑]
 */
car_list_handleSimpleClick(); //绑定列表块点击事件
var selectedCarNum = ""; //被选中的车辆号码
var selectedCarIndex = 0; //被选中的车辆行索引
var selectedBatchNum = ""; //被选中的批次号
var selectedCarFatWeight = ""; ////被选中的车辆重车
var selectedCarId = "" //////被选中的车辆的id
var selectedCarStatus = "" //////被选中的车辆的状态
var selectedCarEmptyWeight = ""; //被选中的轻车重量
//绑定列表块点击事件(仅允许单选)
function car_list_handleSimpleClick() {
    var rows = document.querySelectorAll("#col_right_list>table>tbody tr");
    for (let index = 0; index < rows.length; index++) {
        rows[index].onclick = function () {
            car_list_select_clear();
            this.className = "car_list_checked";
            selectedCarNum = this.children[2].innerHTML;
            selectedBatchNum = this.children[1].innerHTML;
            selectedCarFatWeight = this.children[5].innerHTML;
            selectedCarEmptyWeight = this.children[6].innerHTML;
            selectedCarStatus = this.lastElementChild.innerHTML;
            selectedCarId = this.lastElementChild.previousElementSibling.innerHTML;
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
function showOverBalanceConsole(isShow, commandNum) {
    if (isShow == true) {
        overBalancePreLoading(commandNum);
        document.querySelector("#overBalanceConsoleLayer").style.display = "block";
        document.querySelector("#overBalanceConsole").style.display = "block";
    } else {
        document.querySelector("#overBalanceConsoleLayer").style.display = "none";
        document.querySelector("#overBalanceConsole").style.display = "none";

    }

}

function overBalancePreLoading(commandNum) {
    //获取当前单车的批号和车牌号并赋值入框内
    console.log(selectedCarId);
    console.log(selectedCarStatus);
    document.querySelector("#obc_carNum").value = selectedCarNum;
    document.querySelector("#obc_batchNum").value = selectedBatchNum;
    document.querySelector("#obc_fullCar").value = selectedCarFatWeight;
    document.querySelector("#obc_emptyCar").value = selectedCarEmptyWeight;
    document.querySelector("#obc_id").value = selectedCarId;
    document.querySelector("#obc_status").value = selectedCarStatus;
    
    var inputs = document.querySelectorAll("#overBalanceConsole>form p input");
    for (let index = 0; index < inputs.length; index++) {
        inputs[index].style.background = "#ccc";
        inputs[index].readOnly = true;
    }
    // console.log(inputs.length);
    //参数-1 变更车重量-2变更车号
    switch (commandNum) {
        case 1:
            // var rows = document.querySelectorAll("#col_right_list>table>tbody tr");
            // var fatWeight = rows[selectedCarIndex].children[5].innerHTML;
            if (selectedCarFatWeight == "") {
                document.querySelector("#obc_fullCar").readOnly = false;
                document.querySelector("#obc_fullCar").style.background = "#eeeeee";
            } else {
                document.querySelector("#obc_emptyCar").readOnly = false;
                document.querySelector("#obc_emptyCar").style.background = "#eeeeee";
            }
            break;
        case 2:
            document.querySelector("#obc_carNum").readOnly = false;
            document.querySelector("#obc_carNum").style.background = "#eeeeee";
        default:
            break;
    }

}