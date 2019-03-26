/**
 * @author RainSilver
 * @email [ppstream123@126.com]
 * @create date 2019-03-22 10:07:55
 * @modify date 2019-03-22 10:07:55
 * @desc [化验的相关逻辑0]
 */
/*默认运行的函数 */


//控制二级窗口的显隐 @param:true(显示)，false(隐藏)
function showLayerAndConsole(flag) {
    if (flag == false) {
        document.querySelector("#assay_car_console").style.display = "none";
        document.querySelector("#assay_car_console_layer").style.display = "none";
    } else {
        //  getSelectedCarNumStr();
        // console.log(selectedCarNumStr);
        console.log(getSelectedCar());
        document.querySelector("#assay_car_console").style.display = "block";
        document.querySelector("#assay_car_console>form input:first-child").value = selectedCarNumStr;
        document.querySelector("#assay_car_console_layer").style.display = "block";
    }

}
// //绑定列表块点击事件(仅允许单选) (弃用)
// function car_list_handleSimpleClick() {
//     var rows = document.querySelectorAll("#col_right_list>table>tbody tr");
//     for (let index = 0; index < rows.length; index++) {
//         rows[index].onclick = function () {
//             car_list_select_clear();
//             this.className = "car_list_checked";
//             selectedCarId = this.children[0].innerHTML;
//             console.log("selected car id : " + selectedCarId);
//         }
//     }
// }

// //清除车辆列表的所有选择(弃用)
// function car_list_select_clear() {
//     var rows = document.querySelectorAll("#col_right_list>table>tbody tr");
//    // console.log("total rows:" + rows.length);
//     for (let index = 0; index < rows.length; index++) {
//         rows[index].className = "car_list_unchecked";
//     }
// }
//绑定列表车辆点击事件
// function car_list_handleClick() {

//     var rows = document.querySelectorAll("#col_right_list>table>tbody tr");
//     for (let index = 0; index < rows.length; index++) {
//         rows[index].onclick = function () {
//             if (this.className != "car_list_checked") {
//                 this.className = "car_list_checked";
//                 selectedCarNumStr += this.children[2].innerHTML + ";";
//                 hasSelectedCar++;
//                 if (hasSelectedCar > totalForSelectedCar) {
//                     hasSelectedCar = totalForSelectedCar;
//                 } //当用户重复选择时，避免出现不合理数字
//                 refreshSelectedCarNum();
//             } else {
//                 this.className = "car_list_unchecked";
//             }


//         }



//     }
// }
