/**
 * [DateToTime 时间戳转换为日期]
 * @param {[type]} unixTime [时间戳]
 * @param {String} type     [Y-m-d,Y-m-d H:i:s,Y/m/d,Y/m/d H:i:s,Y年m月d日,Y年m月d日 H:i:s]
 */
function DateToTime(unixTime, type = "Y-M-D H:i:s") {
    var date = new Date(unixTime * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var datetime = "";
    datetime += date.getFullYear() + type.substring(1, 2);
    datetime += (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + type.substring(3, 4);
    datetime += (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
    if (type.substring(5, 6)) {
        if (type.substring(5, 6).charCodeAt() > 255) {
            datetime += type.substring(5, 6);
            if (type.substring(7, 8)) {
                datetime += " " + (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours());
                if (type.substring(9, 10)) {
                    datetime += type.substring(8, 9) + (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes());
                    if (type.substring(11, 12)) {
                        datetime += type.substring(10, 11) + (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
                    }
                }
            }
        } else {
            datetime += " " + (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours());
            if (type.substring(8, 9)) {
                datetime += type.substring(7, 8) + (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes());
                if (type.substring(10, 11)) {
                    datetime += type.substring(9, 10) + (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
                }
            }
        }
    }
    return datetime;
}

/**
 * layui表格Checkbox默认选中方法
 * @param sourceJson 源json {0:1,1:2,2:3} OR [1,2,3] OR {1,2,3}
 * @param tableContainer table容器main主体，不是表头部分，注意区分
 * @param index ID列在所位置从0开始算，或者说判断标准列在的位置
 */
function layuiTableCheckboxDefault(sourceJson, tableContainer, index) {
    setTimeout(function () {
        tableContainer.find('tr').each(function () {
            for (var item in sourceJson) {
                if (parseInt(sourceJson[item]) == parseInt($(this).find("td").eq(index).find('.layui-table-cell').text())) {
                    $(this).find("td:first").find('.layui-form-checkbox').trigger('click');
                }
            }
        });
    }, 200);
}

//javascript  树形结构
function toTree(data) {
    // 删除 所有 children,以防止多次调用
    data.forEach(function (item) {
        delete item.children;
    });

    // 将数据存储为 以 id 为 KEY 的 map 索引数据列
    var map = {};
    data.forEach(function (item) {
        map[item.id] = item;
    });
//        console.log(map);

    var val = [];
    data.forEach(function (item) {

        // 以当前遍历项，的pid,去map对象中找到索引的id
        var parent = map[item.pid];

        // 好绕啊，如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
        if (parent) {

            (parent.children || (parent.children = [])).push(item);

        } else {
            //如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
            val.push(item);
        }
    });

    return val;
}

// 树列表
function toTreeList(data) {

    // 删除 所有 children,以防止多次调用
    data.forEach(function (item) {
        delete item.children;
    });

    // 将数据存储为 以 id 为 KEY 的 map 索引数据列
    var map = {};
    data.forEach(function (item) {
        map[item.id] = item;
    });

    var val = [];
    data.forEach(function (item) {
        if (item.pid === 0) {
            item.level = "";
            val.push(item)
            data.forEach(function (_item) {
                if (_item.pid === item.id) {
                    _item.level = " — "
                    val.push(_item)
                    data.forEach(function (__item) {
                        if (__item.pid === _item.id) {
                            __item.level = " — — "
                            val.push(__item)
                        }
                    });
                }
            });
        }
    });

    return val;
}
