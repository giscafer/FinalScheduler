/**
 * 人员分组module
 */
define(function(require, exports, module) {
    var config = require('js/config');
    var Messager = require('common/messager');
    var Util=require('common/util.js')
    var groupMenuItem;
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
        //获取分组内容
    var getListItems = function(exampleNr) {
            //序列化 sortable 的项目 id 为一个字符串的数组
            var columns = $(exampleNr + ' ul.sortable-list').sortable("toArray");
            return columns.join("|");
        }
        //开始编辑
    var startEdit = function() {
            $("#group_saveBtn").show();
            $("#group_editBtn").hide();
            //可拖动
            $("#group_container .sortable-list").sortable("enable");
            $(".group_operation ul").show();
            Util.enableBtn($('#group_addBtn'));
            Util.enableBtn($('#group_resetBtn'));
        }
        //保存编辑
    var saveEdit = function(type) {
    		var groupArr=[];
            $("#group_container .fzgl-column").each(function(index, el) {
                var id = $(el).attr('id')
                var objectId = id.replace(/fzgl-column-/, "");
                var columns = getListItems("#" + id);
                // saveGroupList(objectId, columns);
                var groupObj={
                	gid:objectId,
                	groupItem:columns
                }
                groupArr.push(groupObj);
            });
            saveGroupList(groupArr);
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
        // 单个分组保存
    var saveGroupList = function(groupArr, callback) {
    	var effectGroup = new Object();
    	if(!groupArr.length){
    		return;
    	}
    	effectGroup["updated"]=JSON.stringify(groupArr);
    	var url = config.options.hostUrl + "saveGroup";
    	$.post(url, effectGroup, function(res) {
    	    if (res) {}
    	}, "JSON");
    }
        /**
         * 添加分组，直接插入记录刷新列表
         */
    var newGroup = function() {
            mini.openIbox({
                url: '../home?template=WEB-INF/view/xhgl/xhgl/pbgl/fzgl/fzgl_newGroup.html',
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
    var delGroup = function(e) {
            var flag = true;
            var fzglObjectId = $(e).parent().parent().attr('id');
            var liIdStr = $(e).parent().attr('id');
            //这代码丑爆了
            var personCount = $(e).parent().parent().parent().parent().parent().parent().siblings().find('ul li').length;
            if (personCount > 0) {
                mini.alert("目前只支持删除空分组！", 4000);
                return;
            }
            saveEdit();
            if (liIdStr.indexOf('first-') == -1) {
                flag = false;
            }
            var url = config.options.hostUrl + "delete/" + fzglObjectId;
            $.messager.confirm('删除提醒', '是否删除该分组？', function(ok) {
                if (ok) {
                    $.get(url, function(res) {
                        if (res) {
                            if (flag) {
                                Forestar.App.pbglWidget.instance.getItemsFormFZGL();
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
        //重置分组
    var resetGroup = function() {
            var url = config.options.hostUrl + "delete";
            $.messager.confirm('提醒', '是否重置分组（重置后恢复为现有人员分组）？', function(ok) {
                if (ok) {
                    $.get(url, function(data) {
                        $("#group_editBtn").show();
                        $("#group_saveBtn").hide();
                        $(".group_operation ul").hide();
                        Messager.alert("删除成功！");
                        getGroupInfoFromDB(); //重置后，初始化分组
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
    var groupListChangeNum = function(event, ui) {
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
    var menuOpen = function() {
            menuClose();
            groupMenuItem = $(this).find('ul').eq(0).css('visibility', 'visible');
        }
        /**
         * 关闭菜单
         */
    var menuClose = function() {
            if (groupMenuItem)
            groupMenuItem.css('visibility', 'hidden');
        }
        /**
         * 分组管理中人员分组List Body
         * @param  {String} obj 人员信息对象
         * @param  {Number} i   是否是第一个分组
         */
    var buildGroupListHtml = function(obj, i) {
        var order = obj.order,
            groupName = obj.groupName,
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
            '<a class="list_item"></a><div class="group_order">【' + (i + 1) + '】</div><div class="group_name" id="group_name_' + gid + '">' +
            groupName + '</div><span>(<span class="group_people_count">' + people_count + '</span> 人 )</span>' +
            '<div class="group_operation"><ul style="display:none;" class="group_operation_ul">' +
            '<li style="float: left;"class="jqx-menu-item-arrow-down"><a href="#">操作</a>' +
            '<ul style="visibility: hidden;" id="' + gid + '">' +
            '<li><a href="#" onclick="Forestar.App.pbglWidget.instance.updateGroupName(this);">修改分组名称</a></li>' +
            '<li id="' + firstStr + gid + '"><a href="#" onclick="Forestar.App.pbglWidget.instance.delGroup(this);">删除分组</a></li></ul></li>' +
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
    };
    //人生总有第一次
    var groupFirstSave = function() {
            var qf = {};
            qf.selectFields = "GHZ,C_ZQNAME,XM";
            qf.whereString = "1=1"
            qf.orderByString = "GHZ";
            ajaxDataService.getEntityList("XHGL_XHGL_PBGL_FZGL_V", qf, function(result) {
                pbglWidget.pbglRowCnt = result.length;
                if (pbglWidget.pbglRowCnt > 0) {
                    pbglWidget.objList = [];
                    var compareGhz = result[0].originalObjects.GHZ;
                    var compareGhzName = result[0].originalObjects.C_ZQNAME;
                    var ghz, xhyArr = [];
                    for (var i = 0; i < result.length; i++) {
                        ghz = result[i].originalObjects.GHZ;
                        if (compareGhz == ghz) {
                            xhyArr.push(result[i].originalObjects.XM);
                        } else {
                            var obj = {
                                'FZ_MC': compareGhzName,
                                'ITEMSLIST': xhyArr.join('|')
                            }
                            pbglWidget.objList.push(obj);
                            compareGhz = ghz;
                            compareGhzName = result[i].originalObjects.C_ZQNAME;
                            xhyArr = [];
                            xhyArr.push(result[i].originalObjects.XM);
                        }
                    };
                    var obj = {
                        'FZ_MC': compareGhzName,
                        'ITEMSLIST': xhyArr.join('|')
                    }
                    pbglWidget.objList.push(obj);
                    saveFZGLInfo(pbglWidget.objList);
                }
            });
        }
        /**
         * 人员分组信息查询
         * @param  {boolean} flag 
         */
    exports.getGroupInfoFromDB = function(flag) {
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
                for (var i = 0; i < data.length; i++) {
                    // var groupObj = $.parseJSON(data[i]);
                    buildGroupListHtml(data[i], i);
                }
                if (flag) {
                    $(".group_operation ul").show();
                    $("#group_container .sortable-list").sortable("enable");
                }
            })
            .fail(function() {
                Messager.alert("查询失败！");
                console.log("error");
            })
            .always(function() {
                console.log("group info query complete");
            });
    }

});
