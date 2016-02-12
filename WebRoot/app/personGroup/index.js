/**
 * 人员分组module
 * @author giscafer
 * @version 1.0
 * @date    2015-11-04T01:06:14+0800
 */
define(function(require, exports, module) {
    var config = require('js/config');
    var Messager = require('common/messager');
    var Util = require('common/util.js');
    var Ibox = require('common/ibox.js');
    var groupMenuItem;

    //获取分组内容
    function getListItems(exampleNr) {
        //序列化 sortable 的项目 id 为一个字符串的数组
        var columns = $(exampleNr + ' ul.sortable-list').sortable("toArray");
        return columns.join("|");
    }
    //开始编辑
    function startEdit() {
        $("#group_saveBtn").show();
        $("#group_editBtn").hide();
        //可拖动
        $("#group_container .sortable-list").sortable("enable");
        $(".group_operation ul").show();
        Util.enableBtn($('#group_addBtn'));
        Util.enableBtn($('#group_resetBtn'));
    }
    //保存编辑
    function saveEdit(type) {
        var groupArr = [];
        $("#group_container .fzgl-column").each(function(index, el) {
            var id = $(el).attr('id')
            var objectId = id.replace(/fzgl-column-/, "");
            var columns = getListItems("#" + id);
            var groupObj = {
                gid: objectId,
                groupItem: columns
            }
            groupArr.push(groupObj);
        });
        saveGroupList(groupArr, "updated");
        if (type === 1) {
            //不可拖动
            $("#group_container .sortable-list").sortable("disable");
            $("#group_editBtn").show();
            $("#group_saveBtn").hide();
            Util.disableBtn($('#group_addBtn'));
            Util.disableBtn($('#group_resetBtn'));
            $(".group_operation ul").hide();
            Messager.alert("分组保存成功!", 1000);
        }
    }
    /**
     * 分组保存
     * @param  {Array<Object>}   groupArr
     * @param  {String}   saveType 保存方式"inserted和updated"
     */
    function saveGroupList(groupArr, saveType) {
        var effectGroup = new Object();
        if (!groupArr.length) {
            return;
        }
        if (!saveType) {
            saveType = "updated";
        }
        effectGroup[saveType] = JSON.stringify(groupArr);
        var url = config.options.hostUrl + "saveGroup";
        $.post(url, effectGroup, function(res) {
            if (res) {}
        }, "JSON");
    }
    /**
     * 添加分组，直接插入记录刷新列表
     */
    function newGroup() {
        Ibox.openIbox({
            url: 'home?template=WEB-INF/views/personGroup/newGroup.html',
            requestType: 'ajax',
            title: '添加新分组',
            onload: function() {
                Giscafer.box = this;
                $("#winCl").click(function() {
                    Giscafer.box.close();
                });
            }
        });
    }
    /**
     * 删除分组名称
     * @param  {String} objectId
     */
    function delGroup(e) {
        var flag = true;
        var fzglObjectId = $(e.target).parent().parent().attr('id');
        var liIdStr = $(e.target).parent().attr('id');
        //这代码丑爆了
        var personCount = $(e.target).parent().parent().parent().parent().parent().parent().siblings().find('ul li').length;
        if (personCount > 0) {
            Messager.alert("目前只支持删除空分组！", 3000);
            return;
        }
        saveEdit();
        if (liIdStr.indexOf('first-') == -1) {
            flag = false;
        }
        var url = config.options.hostUrl + "delGroupById/" + fzglObjectId;
        $.messager.confirm('删除提醒', '是否删除该分组？', function(ok) {
            if (ok) {
                $.get(url, function(res) {
                    if (res) {
                        if (flag) {
                            getGroupInfoFromDB();
                        } else {
                            $("#fzgl-column-" + fzglObjectId).remove();
                        }
                    } else {
                        Messager.alert("删除失败！", "提示", 2000);
                    }
                });
            } else {
                return false;
            }
        });
    }
    /**
     * 分组排序
     * @param  {Event} event
     * @param  {Object} ui  
     */
    function groupListChangeNum(event, ui) {
        var srcCount, disCount;
        if (ui.sender) { //判断原先来的坑是否有值
            //目标坑
            var p = ui.item.parent();
            p.find('li').each(function() {
                var indexNum = p.find('li').index(this);
                $(this).find(".nurse_order_container").text(indexNum + 1);
                disCount = $(this).parent().parent().parent();
            });
            //重新计算目标坑数量
            var pcount = p.find('li').length;
            var $pcount = disCount.find('.group_people_count');
            $pcount.html(pcount);
            //原坑
            var senderp = ui.sender.parent();
            senderp.find('li').each(function() {
                var indexNum = senderp.find('li').index(this);
                $(this).find(".nurse_order_container").text(indexNum + 1); //-2
                srcCount = $(this).parent().parent().parent();
            });
            //重新计算原坑数量
            var csenderp = senderp.find('li').length;
            var $csenderp = srcCount.find('.group_people_count');
            $csenderp.html(csenderp);
        } else { //如果没有目标坑
            var p = ui.item.parent();
            p.find('li').each(function() {
                var indexNum = p.find('li').index(this);
                $(this).find(".nurse_order_container").text(indexNum + 1);

            });
        }
    }
    /**
     * 打开菜单
     */
    function menuOpen() {
        menuClose();
        groupMenuItem = $(this).find('ul').eq(0).css('visibility', 'visible');
    }
    /**
     * 关闭菜单
     */
    function menuClose() {
        if (groupMenuItem)
            groupMenuItem.css('visibility', 'hidden');
    }
    /**
     * 分组管理中人员分组List Body
     * @param  {String} obj 人员信息对象
     * @param  {Number} i   是否是第一个分组
     */
    function buildGroupListHtml(obj, i) {
        var order = obj.order,
            groupName = obj.groupName,
            shortGroupName=groupName.length>10?(groupName.substring(0,10)+".."):groupName;
            firstStr = "",
            gid = obj.gid,
            divClass = "fzgl-column fzgl-left fzgl-first",
            groupItem = [];
        if (obj.groupItem !== "" && obj.groupItem !== null) {
            groupItem = obj.groupItem.split("|");
        } else {
            groupItem = [];
        }
        var people_count = groupItem.length
        if (i === 0) {
            divClass = "fzgl-column fzgl-left fzgl-first";
            firstStr = "first-";
        } else {
            divClass = "fzgl-column fzgl-left";
            firstStr = "";
        }
        var html = '<div class="' + divClass + '" id="fzgl-column-' + gid + '"><div class="group_top">' +
            '<a class="list_item"></a><div class="group_order">【' + (i + 1) + '】</div><div class="group_name" title="'+groupName+'" id="group_name_' + gid + '">' +
            shortGroupName + ' </div><span>(<span class="group_people_count">' + people_count + '</span> 人 )</span>' +
            '<div class="group_operation"><ul style="display:none;" class="group_operation_ul">' +
            '<li style="float: left;"class="jqx-menu-item-arrow-down"><a href="#">操作</a>' +
            '<ul style="visibility: hidden;" id="' + gid + '">' +
            '<li><a href="#" class="rename_group">修改分组名称</a></li>' +
            '<li id="' + firstStr + gid + '"><a href="#" class="del_group">删除分组</a></li></ul></li>' +
            '</ul></div></div><div class="fzgl-container-div"><ul class="sortable-list">'
        for (var i = 0; i < groupItem.length; i++) {
            html += '<li class="sortable-item" id="' + groupItem[i] + '"><div class="nurse_order_container">' + (i + 1) + '</div>' + groupItem[i] + '</li>';
        };
        html += '</ul></div></div>';
        $("#group_container").append(html);
        //拖拽
        $('#group_container .sortable-list').sortable({
            connectWith: '#group_container .sortable-list'
        }).bind('sortupdate', function(event, ui) {
            groupListChangeNum(event, ui);
        });
        $("#group_container .sortable-list").sortable("disable");
        //菜单事件绑定
        $('.group_operation_ul > li').bind('mouseover', menuOpen);
        $('.group_operation_ul > li').bind('mouseout', menuClose);
        $('.group_operation_ul a.del_group').unbind('click');
        $('.group_operation_ul a.rename_group').unbind('click');
        $('.group_operation_ul a.del_group').bind('click', function(e) {
            delGroup(e)
        });
        $('.group_operation_ul a.rename_group').bind('click', function(e) {
            renameGroup(e)
        });
    };
    /**
     * 重命名分组
     */
    function renameGroup(e) {
        Giscafer.fzglObjectId = $(e.target).parent().parent().attr('id');
        Ibox.openIbox({
            url: 'home?template=WEB-INF/views/personGroup/renameGroup.html',
            requestType: 'ajax',
            title: '重命名分组',
            onload: function() {

            }
        });
    }

    //重置分组
    function resetGroup() {
        var url = config.options.hostUrl + "delAllGroup";
        $.messager.confirm('提醒', '是否重置分组（重置后恢复为现有人员分组）？', function(ok) {
            if (ok) {
                $.get(url, function(data) {
                    $("#group_editBtn").show();
                    $("#group_saveBtn").hide();
                    $(".group_operation ul").hide();
                    Messager.alert("重置成功！");
                    getGroupInfoFromDB(); //重置后，初始化分组
                });
            } else {
                return false;
            }
        });
    }

    /**
     * 人生总有第一次
     */
    function groupFirstSave() {
        $.ajax({
                url: config.options.hostUrl + 'queryPerson',
                type: 'GET',
                dataType: 'json'
            })
            .done(function(data) {
                if (!data.length) return;
                save(data);
            })
            .fail(function(e) {
                console.log(e);
            });
        //内部函数，用来保存分组
        function save(data) {
            var personArr = new Array();
            for (var i = 0; i < data.length; i++) {
                personArr.push(data[i].name);
            }
            var groupObj = {
                groupName: "未命名",
                order: 1,
                groupItem: personArr.join("|")
            }
            saveGroupList([groupObj], "inserted");
            //重新加载
            getGroupInfoFromDB();
        }
    }
        /**
         * 人员分组信息查询
         * @param  {boolean} flag 
         */
    function getGroupInfoFromDB(flag) {
        $.ajax({
                url: config.options.hostUrl + 'queryGroup',
                type: 'GET',
                dataType: 'JSON'
            })
            .done(function(data) {
                if (!data.length) {
                    groupFirstSave();
                    Messager.alert("查询数据为空！");
                }
                $("#group_container").html('');
                for (var i = 0; i < data.length; i++) {
                    // var groupObj = $.parseJSON(data[i]);
                    buildGroupListHtml(data[i], i);
                }
                if (flag) {
                    $(".group_operation ul").show();
                    $("#group_container .sortable-list").sortable("enable");
                }
            })
            .fail(function(e) {
                Messager.alert("查询失败！");
                console.log("error",e);
            })
    }
    exports.getGroupInfoFromDB=getGroupInfoFromDB;
    /**
     * 初始化按钮事件
     */
    exports.init = function() {
            //新增按钮
            $("#group_editBtn").click(function() {
                startEdit();
            });
            $("#group_saveBtn").click(function() {
                saveEdit(1);
            });
            $("#group_addBtn").click(function() {
                newGroup();
            });
            $("#group_resetBtn").click(function() {
                resetGroup();
            });
        }
   

    exports.initAddNewGroupSave = function() {
        $("#newGroupSaveBtn").click(function() {
            var groupName = $("#groupNewName").val();
            if (groupName == "") {
                alert('请输入分组名称！');
                return;
            }
            var objStr = {
                'groupName': groupName,
                'groupItem': ""
            }
            saveGroupList([objStr], "inserted");
            //重新加载
            getGroupInfoFromDB(true);
            $("#newGroupCloseBtn").trigger('click');
        });
    }
    exports.initRenameGroup = function() {
        $("#renameGroupSaveBtn").click(function() {
            var groupName = $("#groupNewName").val();
            if (groupName == "") {
                alert('请输入分组名称！');
                return;
            }
            var updateFilter = {
                'setFields': "set groupName='" + groupName + "'",
                'whereString': "gid=" + Giscafer.fzglObjectId
            }
            $.post(config.options.hostUrl+"updateGroup", updateFilter, function(res) {
                if (res) {
                    Messager.alert('重命名成功', 1000);
                    $("#group_name_" + Giscafer.fzglObjectId).html(groupName);
                    $("#renameGroupCloseBtn").trigger('click');
                }
            }, "JSON");
        });
    }
    /**
     * 新增人员的时候，添加到分组
     * @author giscafer
     * @version 1.0
     * @date    2015-11-25T00:11:54+0800
     */
    exports.insertNewPerson=function(personNames){
        if(!personNames) return;
        var personNameStr="";
        var queryFilter={
            selectFields:"*",
            orderString:"gid asc"
        }
        for (var i = 0; i < personNames.length; i++) {
            personNameStr+=("|"+personNames[i]);
        };
        $.ajax({
            url: config.options.hostUrl + 'queryGroup',
            type: 'POST',
            data: queryFilter
        })
        .done(function(res) {
            console.log(res);
            res[0].groupItem=res[0].groupItem+personNameStr;
            saveGroupList([res[0]], "updated");
        })
        .fail(function() {
            console.log("error");
        });
        
    }
});
