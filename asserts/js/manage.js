/**
 * @author RainSilver
 * @email [ppstream123@126.com]
 * @create date 2019-03-30 18:01:55
 * @modify date 2019-03-30 18:01:55
 * @desc [管理页面的相关逻辑]
 */
/**
 * 成员变量区
 */
var selectedUserData = new Array();
var selectedUserId = "";
/**
 * 自启动函数列表
 */
list_handleSimpleClick(); //列表单选绑定
/**
 * 函数方法区
 */
//绑定用户列表点击事件(仅允许单选)
function list_handleSimpleClick() {
    var rows = document.querySelectorAll("#col_right_list>table>tbody tr");
    for (let index = 0; index < rows.length; index++) {
        rows[index].onclick = function () {
            list_select_clear(); //清除用户
            this.className = "car_list_checked";
            selectedUserId = this.lastElementChild.innerHTML;
            for (let index = 0; index < this.children.length; index++) {
                if (index >= 1 && index <= 3) {
                    selectedUserData.push(this.children[index].innerHTML);
                }

            }

            // this.lastElementChild.innerHTML = selectedUserId;
        }
    }
}
//绑定列表块点击事件
function list_select_clear() {
    var rows = document.querySelectorAll("#col_right_list>table>tbody tr");
    //console.log(rows.length);
    for (let index = 0; index < rows.length; index++) {
        rows[index].className = "car_list_unchecked";
    }
}

//点击功能区按钮打开二级菜单
//flag参数:true显示窗口、 false隐藏；which：要打开的窗口 0 新增 1 修改
function showUserControl(flag, which) {
    //获取窗口列表和二级菜单浮层
    var consoles = document.querySelectorAll(".setUserConsole");
    var layer = document.querySelector("#SecondConsoleLayer");
    var num = which;
    if (flag == true) {
        //为真，将对应下标的窗口显示，
        layer.style.display = "block";
        consoles[num].style.display = "block";
        if (num == 1) {
            preUpdateUser();
        }
    } else {
        //为假，将二级窗口和浮层隐藏
        layer.style.display = "none";
        for (let index = 0; index < consoles.length; index++) {
            consoles[index].style.display = "none";
        }
    }
}

function preUpdateUser() {
    //若为修改，将获取到的Id放置在对应的Input中
    var inputs = document.querySelectorAll("#updateUserConsole p input");
    for (let index = 0; index < inputs.length; index++) {
        inputs[index].value = selectedUserData[index];
    }
    // selectedUserData.forEach(element => {
    //     console.log(element);
    // });
    document.querySelector("#uuc_id").value = selectedUserId;
}
//删除用户信息
function deleteUserData() {
    var flag = window.confirm("删除是不可恢复的，你确定要删除吗？");
    console.log(selectedUserId);
    if (flag == true) {
        //确认删除，追加id数据并提交隐藏的表单
        document.querySelector("#deleteUserForm input:first-child").value = selectedUserId;
        document.querySelector("#deleteUserForm").submit();

    } else {
        //取消删除，清除选择
        list_select_clear();
    }

}