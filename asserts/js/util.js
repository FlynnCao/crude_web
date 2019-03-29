/**
 * @author RainSilver
 * @email [ppstream123@126.com]
 * @create date 2019-03-29 15:20:15
 * @modify date 2019-03-29 15:20:15
 * @desc [作者自写的一些函数库]
 */
//清空所有子节点
function rs_removeAllChild(node) {
    while (node.hasChildNodes()) //当div下还存在子节点时 循环继续
    {
        node.removeChild(node.firstChild);
    }
}


