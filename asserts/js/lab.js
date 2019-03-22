/**
 * @author RainSilver
 * @email [ppstream123@126.com]
 * @create date 2019-03-22 10:07:55
 * @modify date 2019-03-22 10:07:55
 * @desc [化验的相关逻辑0]
 */
/*默认运行的函数 */
// var hasSelectedCar = 0; //已经选择的车数
// var totalForSelectedCar = 10; //全部车数
// var selectedCarsArray; //存储已经选择的车的ID
//checkForTotalCars();
//car_list_handleClick(); //绑定列表块点击事件
// showLayerAndConsole(true);
car_list_handleSimpleClick(); //绑定列表块点击事件
var selectedCarId = "0"; // WPF车辆对应的Id值


//绑定列表块点击事件(仅允许单选) WPF
function car_list_handleSimpleClick() {
    var rows = document.querySelectorAll("#col_right_list>table>tbody tr");
    for (let index = 0; index < rows.length; index++) {
        rows[index].onclick = function () {
            car_list_select_clear();
            this.className = "car_list_checked";
            selectedCarId = this.children[0].innerHTML;
            console.log("selected car id : " + selectedCarId);
        }
    }
}

//清除车辆列表的所有选择
function car_list_select_clear() {
    var rows = document.querySelectorAll("#col_right_list>table>tbody tr");
   // console.log("total rows:" + rows.length);
    for (let index = 0; index < rows.length; index++) {
        rows[index].className = "car_list_unchecked";
    }
}
// //绑定列表车辆点击事件(弃用)
// function car_list_handleClick() {

//     var rows = document.querySelectorAll("#col_right_list>table>tbody tr");
//     for (let index = 0; index < rows.length; index++) {
//         rows[index].onclick = function () {
//             this.className = "car_list_checked";

//             hasSelectedCar++;
//             if (hasSelectedCar > totalForSelectedCar) {
//                 hasSelectedCar = totalForSelectedCar;
//             } //当用户重复选择时，避免出现不合理数字
//             refreshSelectedCarNum();

//         }



//     }
// }
// //按参数选择选择列表块(弃用)
// function car_list_select(flag) {
//     var rows = document.querySelectorAll("#col_right_list>table>tbody tr");
//     for (let index = 0; index < rows.length; index++) {
//         if (flag == true) {
//             rows[index].className = "car_list_checked";
//             hasSelectedCar = totalForSelectedCar;
//             refreshSelectedCarNum();
//         } else {
//             rows[index].className = "car_list_unchecked";
//             hasSelectedCar = 0;
//             refreshSelectedCarNum();

//         }
//         //如果参数为1则全部选择 反之全部取消选择
//     }
// }
// //刷新车辆选择数
// function refreshSelectedCarNum(){
//     var num = hasSelectedCar;
//     //console.log(hasSelectedCar);
//     document.querySelector("#car_selected_num").innerHTML = num;
// }
// //获取车辆总数
// function checkForTotalCars(){
//     var rows = document.querySelectorAll("#col_right_list>table>tbody tr");
//     totalForSelectedCar = rows.length;
//     document.querySelector("#car_list_total_num").innerHTML = totalForSelectedCar;
// }
//控制二级窗口的显隐 @param:true(显示)，false(隐藏)
function showLayerAndConsole(flag) {
    if (flag == false) {
        document.querySelector("#assay_car_console").style.display = "none";
        document.querySelector("#assay_car_console_layer").style.display = "none";


    } else {

        document.querySelector("#assay_car_console").style.display = "block";
        document.querySelector("#assay_car_console_layer").style.display = "block";
    }

}