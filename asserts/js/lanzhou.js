/**
 * @author RainSilver
 * @email [ppstream123@126.com]
 * @create date 2019-03-20 21:06:26
 * @modify date 2019-03-20 21:51:01
 * @desc [兰州编组的逻辑]
 */
/*默认运行的函数 */
var hasSelectedCar = 0; //已经选择的车数
var totalForSelectedCar = 10; //全部车数

checkForTotalCars();

car_list_handleClick(); //绑定列表块点击事件



//绑定列表块点击事件
function car_list_handleClick() {

    var rows = document.querySelectorAll("#col_right_list>table>tbody tr");
    for (let index = 0; index < rows.length; index++) {
        rows[index].onclick = function () {
            this.className = "car_list_checked";
            hasSelectedCar++;
            if (hasSelectedCar > totalForSelectedCar) {
                hasSelectedCar = totalForSelectedCar;
            } //当用户重复选择时，避免出现不合理数字
            refreshSelectedCarNum();

        }



    }
}
//按参数选择选择列表块
function car_list_select(flag) {
    var rows = document.querySelectorAll("#col_right_list>table>tbody tr");
    for (let index = 0; index < rows.length; index++) {
        if (flag == true) {
            rows[index].className = "car_list_checked";
            hasSelectedCar = totalForSelectedCar;
            refreshSelectedCarNum();
        } else {
            rows[index].className = "car_list_unchecked";
            hasSelectedCar = 0;
            refreshSelectedCarNum();
            
        }
        //如果参数为1则全部选择 反之全部取消选择
    }


}
//刷新车辆选择数
function refreshSelectedCarNum(){
    var num = hasSelectedCar;
    //console.log(hasSelectedCar);
    document.querySelector("#car_selected_num").innerHTML = num;
}
//获取车辆总数
function checkForTotalCars(){
    var rows = document.querySelectorAll("#col_right_list>table>tbody tr");
    totalForSelectedCar = rows.length;
    document.querySelector("#car_list_total_num").innerHTML = totalForSelectedCar;
}