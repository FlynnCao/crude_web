/**
 * @author RainSilver
 * @email [ppstream123@126.com]
 * @create date 2019-03-21 08:49:10
 * @modify date 2019-03-21 08:49:10
 * @desc [进厂使用的页面逻辑]
 */
//car_list_handleSimpleClick(); //绑定列表块点击事件
function enterFactory(){
    alert("批量进厂成功！");
    
}

// //绑定列表块点击事件(仅允许单选)
// function car_list_handleSimpleClick() {
//     var rows = document.querySelectorAll("#col_right_list>table>tbody tr");
//     for (let index = 0; index < rows.length; index++) {
//         rows[index].onclick = function () {
//             car_list_select_clear();
//             this.className = "car_list_checked";      
//         }   
//     }
// }
// //清除车辆列表的所有选择
// function car_list_select_clear(){
//     var rows = document.querySelectorAll("#col_right_list>table>tbody tr");
//    //console.log(rows.length);
//     for (let index = 0; index < rows.length; index++) {
//         rows[index].className = "car_list_unchecked";

//     }
// }