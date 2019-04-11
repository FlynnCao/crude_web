/**
 * @author RainSilver
 * @email [ppstream123@126.com]
 * @create date 2019-03-30 09:51:40
 * @modify date 2019-04-09 16:50:23
 * @desc [分析页面的逻辑]
 */
/**
 * 成员变量区
 */
//------------------------------------------------------------------------
var hasSelectedCar = 0; //已经选中的车号
var totalForSelectedCar = 0; //所有车辆数
var showHidden = true;
//checkForTotalCars(); //获取车辆总数
// car_list_handleMutiClick();
car_list_handleSimpleClick(); //车辆单选控制
analyse_setCarListIndex();
switchPages(0); //默认打开页面1
car_list_handleSimpleClick(); //单选事件绑定
hiddenBackStage(); //隐藏后台
hiddenRowInfo(6, 9); //隐藏指定列的信息
/**
 * 变量区
 */

var canChangeCarNum = false; //允许修改车号标志
var selectedCarNum = ""; //被选中的车辆号码
var selectedSentCarNum = ""; //被选中的车辆发出号码
var selectedSentBatch = ""; //被选中的批次号
var selectedEnterBatch = ""; //被选中的批次号
var selectedCarFullWeight = ""; ////被选中的车辆重车
var selectedCarEmptyWeight = ""; ////被选中的车辆空车
var selectedCarWater = ""; //被选中的轻车重量
var selectedCarDensity = ""; //被选中的轻车重量
/**
 * 函数区
 */
//--------------------------------------------------------------------------
//A多选控制模块
//绑定多选点击

function car_list_handleMutiClick() {
    var rows = document.querySelectorAll("#col_right_list1>table>tbody tr");
    for (let index = 0; index < rows.length; index++) {
        rows[index].onclick = function () {
            if (this.className != "car_list_checked") {
                this.className = "car_list_checked";
                hasSelectedCar++;
                refreshSelectedCarNum();
            } else {
                this.className = "car_list_unchecked";
                hasSelectedCar--;
                refreshSelectedCarNum();
            }
        }
    }
}
//获取车辆总数
function checkForTotalCars() {
    var rows = document.querySelectorAll("#col_right_list1>table>tbody tr");
    totalForSelectedCar = rows.length;
    document.querySelector("#car_list_total_num").innerHTML = totalForSelectedCar;
    console.log(totalForSelectedCar);

}
//刷新车辆选择数
function refreshSelectedCarNum() {
    var num = hasSelectedCar;
    //   console.log("selected" + num);
    document.querySelector("#car_selected_num").innerHTML = num;
}

//按参选择选择所有车辆列表(true:全选;false:隐藏)
function car_list_select(flag) {
    var rows = document.querySelectorAll("#col_right_list1>table>tbody tr");
    console.log(rows.length);
    //页面变化
    for (let index = 0; index < rows.length; index++) {
        if (flag == true) {
            console.log(totalForSelectedCar);
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

//B列表自动序号模块
function analyse_setCarListIndex() {
    var pages = document.querySelectorAll(".analyse_page");
    for (let index = 0; index < pages.length; index++) {
        let rows = pages[index].querySelectorAll("table>tbody tr");
        for (let index = 0; index < rows.length; index++) {
            rows[index].children[0].innerHTML = index + 1;
        }
    }

}
//C主要页面切换模块
var currentPage = 0;

function switchPages(pageNum) {
    currentPage = pageNum;
    var pages = document.querySelectorAll(".analyse_page");
    var blocks = document.querySelectorAll("#col_left>ul li");
    //页面数量变更
    for (let index = 0; index < blocks.length; index++) {
        if (index == currentPage) {
            pages[index].style.display = "block";
            blocks[index].style.color = "#465DD2";
            if (currentPage == 1) {
                //隐藏功能区并显示批次列表
                document.querySelector("#col_right_func").style.display = "none";
            } else {
                document.querySelector("#col_right_func").style.display = "flex";

            }
        } else {
            pages[index].style.display = "none";
            blocks[index].style.color = "black";
        }
        //页面索引等于当前定位标号的页面显示，否则隐藏；导航栏颜色同理
    }

}

//D 单选列表模块
//绑定单选
//绑定列表块点击事件(仅允许单选)
function car_list_handleSimpleClick() {
    var rows = document.querySelectorAll("#col_right_list1>table>tbody tr");
    for (let index = 0; index < rows.length; index++) {
        rows[index].onclick = function () {
            car_list_select_clear();
            this.className = "car_list_checked";
            // selectedCarNum = this.children[2].innerHTML;
            // selectedBatchNum = this.children[1].innerHTML;
            // selectedCarFatWeight = this.children[5].innerHTML;
            // selectedCarEmptyWeight = this.children[6].innerHTML;
            // selectedCarStatus = this.lastElementChild.innerHTML;
            // selectedCarId = this.lastElementChild.previousElementSibling.innerHTML;
            // selectedCarIndex = index;   

        }
    }
}
//绑定列表块点击事件
function car_list_select_clear() {
    var rows = document.querySelectorAll("#col_right_list1>table>tbody tr");
    //console.log(rows.length);
    for (let index = 0; index < rows.length; index++) {
        rows[index].className = "car_list_unchecked";
    }
}

//允许用户在列中修改车号
function changeCarNumInRow() {
    if (canChangeCarNum == false) {
        //开启功能
        console.log("开启变更车号");
        var rows = document.querySelectorAll("#col_right_list1>table>tbody tr");
        if (rows.length != 0) {
            for (let index = 0; index < rows.length; index++) {
                let num = rows[index].children[3]; //选择每行的第三个子元素-车号
                var currentNum = num.innerHTML;
                num.innerHTML = "";
                var input = document.createElement("input");
                input.className = "alterCarNumInput";
                input.value = currentNum;
                input.onkeydown = function (e) {
                    var keyNum;
                    keyNum = window.event ? e.keyCode : e.which;
                    //  console.log(keyNum);
                    //var keyChar = String.fromCharCode(keyNum);
                    if (keyNum == 13) {
                        //当用户按下回车时，清空当前元素的子节点
                        rs_removeAllChild(num);
                        num.innerHTML = this.value
                    }
                }
                num.appendChild(input);
            }
        } else {
            console.log("行中没有数据！");
        }
        canChangeCarNum = true;
    } else {
        //关闭功能
        console.log("关闭变更车号");
        var rows = document.querySelectorAll("#col_right_list1>table>tbody tr");
        if (rows.length != 0) {
            for (let index = 0; index < rows.length; index++) {
                let num = rows[index].children[3]; //选择每行的第三个子元素-车号
                if (num.firstElementChild != null) {
                    //若当前元素有子节点时，清空子节点并赋值车号到本元素
                    let newCarNum = num.firstElementChild.value;
                    rs_removeAllChild(num);
                    num.innerHTML = newCarNum;
                }
            }
        } else {
            console.log("行内没有数据")
        }
        canChangeCarNum = false;
    }
}

//提交车号信息
function updateCarComparing() {
    setSelectedCarInfo();
    var form = document.querySelector("#app>form");
    if (form != null) {
        console.log("发出车号:" + selectedSentCarNum);
        console.log("进厂车号:" + selectedCarNum);
        console.log("发出批次:" + selectedSentBatch);
        console.log("进厂批次:" + selectedEnterBatch);
        console.log("重车:" + selectedCarFullWeight);
        console.log("空车:" + selectedCarEmptyWeight);
        console.log("水分:" + selectedCarWater);
        console.log("密度:" + selectedCarDensity);
        console.log("密度:" + selectedSentCarNum);
        document.querySelector("#analyse_sentcar").value = selectedSentCarNum;
        document.querySelector("#analyse_entercar").value = selectedCarNum;
        document.querySelector("#analyse_sentbatch").value = selectedSentBatch;
        document.querySelector("#analyse_enterbatch").value = selectedEnterBatch;
        document.querySelector("#analyse_fullcar").value = selectedCarFullWeight;
        document.querySelector("#analyse_emptycar").value = selectedCarEmptyWeight;
        document.querySelector("#analyse_water").value = selectedCarWater;
        document.querySelector("#analyse_density").value = selectedCarDensity;
        var flag = window.confirm("确认提交车号匹配信息吗？");
        if (flag == true) {
          //  document.querySelector("#analyse_form_submit").click();
            alert("提交成功！");


        }

    }

}

function setSelectedCarInfo() {
    var rows = document.querySelectorAll("#col_right_list1>table>tbody tr");
    console.log(rows.length);
    if (rows.length != 0) {
        for (let index = 0; index < rows.length; index++) {
            if (rows[index].className == "car_list_checked") {
                //从已选中的车辆行重获取信息(其他信息)
                selectedSentBatch += rows[index].children[1].innerHTML + ";";
                selectedEnterBatch += rows[index].children[2].innerHTML + ";";
                // selectedSentCarNum += rows[index].children[3].innerHTML + ";";
                selectedSentCarNum = document.getElementById("func_car_select").value;
                selectedCarNum += rows[index].children[4].innerHTML + ";";
                selectedCarFullWeight += rows[index].children[6].innerHTML + ";";
                selectedCarEmptyWeight += rows[index].children[7].innerHTML + ";";
                selectedCarWater += rows[index].children[8].innerHTML + ";";
                selectedCarDensity += rows[index].children[9].innerHTML + ";";
                console.log(1);
            }
        }
    }

}
//隐藏后台提交的表单
function hiddenBackStage() {
    if (showHidden == true) {
        document.querySelector("#app>form").style.display = "none";
        showHidden = false;
    } else {

        document.querySelector("#app>form").style.display = "block";
        showHidden = true;
    }

}
//隐藏车号匹配列表的指定列：参数1-开始的列下标；参数2：结束的列下标
function hiddenRowInfo(fromIndex, endIndex){
    //从DOM中获取列表的所有行
    var rows = document.querySelectorAll("#col_right_list1>table tr");
    console.log("row length from hidden:" + rows.length);
    if(rows != null){
        for (let index = 0; index < rows.length; index++) {
            //遍历行，然后遍历行中的每个元素（children为非空元素）
            let cells = rows[index].children;
            for (let i = 0; i < cells.length; i++) {
                //如果行内元素的下标在参数指定的范围内，隐藏之
                if(i >= fromIndex && i <= endIndex){
                    cells[i].style.display = "none";
                }
            }           
        }
    }
   
}
