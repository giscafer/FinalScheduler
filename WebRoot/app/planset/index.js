/**
 * 班次设置逻辑处理module
 * @author giscafer
 * @version 1.0
 * @date    2015-11-08T18:45:59+0800
 */
define(function(require, exports, module) {
    var hostUrl = require('js/config').options.hostUrl;
    var Messager = require('common/messager');
    var Util = require('common/util.js');
    var Ibox = require('common/ibox.js');
    var EventProxy = require('module/eventproxy.js');

    var ep=new EventProxy();
    /**
     * 编辑班次保持
     */
    exports.updatePlan = function(callback) {

        var isvalid = $("#updatePlanForm").data('bootstrapValidator').isValid();
        if (!isvalid) {
            $("#updatePlanForm").data('bootstrapValidator').validate()
            return;
        }
        var pid = $("#inputPid").val();
        var color = $("#inputColor").val();
        var planName = $("#inputPlanName").val();
        var defineType = $("#inputDefineType").val();
        var planType = $("#inputPlanType").val();
        var startTime = $("#inputStartTime").val();
        var endTime = $("#inputEndTime").val();
        var totalTime = $("#inputTotalTime").val();
        var periodTime = $("#inputPeriodTime").val();
        var obj = {
            "pid": pid,
            "color": color,
            "planName": planName,
            "defineType": defineType,
            "planType": planType,
            "periodTime": periodTime,
            "totalTime": totalTime,
        }
        var objJson = JSON.stringify(new Array(obj));

        var effectPlan = {
            "updated": objJson
        };
        var url = hostUrl + 'plan/update';
        $.post(url, effectPlan, function(res) {
            if (res) {
                loadUIAndRender('plan', 'WEB-INF/views/planset/plan.html');
            }
        }, "JSON");

    };
    /**
     * 新增班次
     * @author giscafer
     * @version 1.0
     * @date    2015-11-15T14:37:47+0800
     */
    exports.addPlan = function() {
        var isvalid = $("#updatePlanForm").data('bootstrapValidator').isValid();
        if (!isvalid) {
            $("#updatePlanForm").data('bootstrapValidator').validate()
            return;
        }
        var color = $("#inputColor").val();
        var planName = $("#inputPlanName").val();
        var defineType = $("#inputDefineType").val();
        var planType = $("#inputPlanType").val();
        var startTime = $("#inputStartTime").val();
        var endTime = $("#inputEndTime").val();
        var totalTime = $("#inputTotalTime").val();
        var periodTime = $("#inputPeriodTime").val();
        var obj = {
            "color": color,
            "planName": planName,
            "defineType": defineType,
            "planType": planType,
            "periodTime": periodTime,
            "totalTime": totalTime,
        }
        var objJson = JSON.stringify(new Array(obj));

        var effectPlan = {
            "inserted": objJson
        };
        var url = hostUrl + 'plan/save';
        $.post(url, effectPlan, function(res) {
            if (res) {
                loadUIAndRender('plan','WEB-INF/views/planset/plan.html',function(){
                    Giscafer.ep.emit("afterPlanAddSuccess");
                });
                Giscafer.ep.all("afterPlanAddSuccess","planPageReady",function() {
                     exports.addPlanOrderAfterAddPlan(planName);
                });
            }
        }, "JSON");
    };
    //删除grid数据的时候移除班次
    exports.removePlan = function(bcmc) {
            var data = $("#plan_order_list li").map(function() {
                return $(this).children().html();
            }).get();
            for (var i = 0; i < data.length; i++) {
                if (data[i] === bcmc) {
                    data.splice(i, 1);
                    i--;
                }
            }
            var orderStr = data.join("|");
            addPlanOrderAfterModifiedPlan(orderStr);
        }
        //更新班次
        function addPlanOrderAfterModifiedPlan(orderStr){
             var uFilter = {};
            uFilter.id = Giscafer.bcglObjectId;
            uFilter.planItem =orderStr;
            //对象数据字符串
            var objJson=JSON.stringify(new Array(uFilter));
           $.ajax({
                url: hostUrl+'plan/updatePlanOrder',
                type: 'POST',
                data:{"updated":objJson},
                dataType: 'json'
            })
            .done(function(result) {
                exports.getPlanOrder();
            })
            .fail(function() {
                console.log("error");
            });
        }
        /**
         * 开始编辑班次
         * @author giscafer
         * @version 1.0
         * @date    2015-11-15T14:37:56+0800
         * @return  {[type]}                 [description]
         */
    exports.planDragStart = function() {
        $("#plan_order_list").dragsort({
            dragSelector: "button",
            dragBetween: true,
            dragEnd: cachePlanOrder,
            placeHolderTemplate: "<li class='placeHolder'><div></div></li>"
        });
        $("#planDragSave").show();
        $("#planDragStart").hide();
        $(".bcgrid-btn").removeAttr("disabled");
        Util.enableBtn($('#addPlanBtn'));
        Util.enableBtn($('#resetPlanBtn'));
    };
    /**
     * 保存编辑班次
     * @author giscafer
     * @version 1.0
     * @date    2015-11-15T14:38:05+0800
     * @return  {[type]}                 [description]
     */
    exports.planDragSave = function() {

            $("#plan_order_list").dragsort('destroy');
            $("#planDragStart").show();
            $("#planDragSave").hide();
            $(".bcgrid-btn").attr('disabled', 'true');
            Util.disableBtn($('#addPlanBtn'));
            Util.disableBtn($('#resetPlanBtn'));
            var orderStr = $("input[name=list1SortOrder]").val();
            if (!orderStr) {
                return;
            }
            var uFilter = {};
            uFilter.id = Giscafer.bcglObjectId;
            uFilter.planItem = orderStr;
            //对象数据字符串
            var objJson = JSON.stringify(new Array(uFilter));
            $.ajax({
                    url: hostUrl + 'plan/updatePlanOrder',
                    type: 'POST',
                    data: {
                        "updated": objJson
                    },
                    dataType: 'json'
                })
                .done(function(result) {
                    if (result) {
                        Messager.alert("班次排序保存成功!", 1500);
                    }
                })
                .fail(function() {
                    console.log("error");
                });
        }
        //新增表记录的时候添加班次
    exports.addPlanOrderAfterAddPlan = function(bcmc) {
            var planHtml = '<li><button class="bspbtn bspbtn-success">' + bcmc + '</button></li>';
            $("#plan_order_list").append(planHtml);
            cachePlanOrder();
            var orderStr = $("input[name=list1SortOrder]").val();
            if (!orderStr) {
                return;
            }
            addPlanOrderAfterModifiedPlan(orderStr);
        }
        /**
         * 查询展示班次
         * @author giscafer
         * @version 1.0
         * @date    2015-11-15T14:38:26+0800
         */
    exports.getPlanOrder = function(callback) {
        $.ajax({
                url: hostUrl + 'plan/getPlanOrderList',
                type: 'GET',
                dataType: 'json'
            })
            .done(function(result) {
                if (!result.length) {
                    queryPlanTable();
                } else {
                    Giscafer.bcglObjectId = result[0].id;
                    buildPlanOrderHtml(result[0].planItem);
                }
                if (typeof callback === "function") {
                    callback(result);
                }
            })
            .fail(function() {
                console.log("error");
            });
    }

    function buildPlanOrderHtml(planItem) {
        var order = planItem.split("|");
        var html = ""
        for (var i = 0; i < order.length; i++) {
            order[i]
            html += '<li><button class="bspbtn bspbtn-success">' + order[i] + '</button></li>';
        };
        $("#plan_order_list").html(html);
    }

    //第一次
    function queryPlanTable() {
        var bcArr = [];
        $.ajax({
                url: hostUrl + 'plan/getList',
                type: 'GET',
                dataType: 'json'
            })
            .done(function(result) {
                if (!result.length) {
                    return;
                } else {
                    for (var i = 0; i < result.length; i++) {
                        bcArr.push(result[i].planName);
                    };
                }
                fistTimeSaveBcOrder(bcArr.join('|'));
            })
            .fail(function() {
                console.log("error");
            });
    }
    /**
     * 保存班次顺序
     * @author giscafer
     * @version 1.0
     * @date    2015-11-15T14:45:05+0800
     * @param   {String}                 orderStr 班次顺序字符串
     */
    function fistTimeSaveBcOrder(orderStr) {
        var obj = {
                planItem: orderStr
            }
            //对象数据字符串
        var objJson = JSON.stringify(new Array(obj));
        $.ajax({
                url: hostUrl + 'plan/savePlanOrder',
                type: 'POST',
                async: true,
                data: {
                    "inserted": objJson
                },
                dataType: 'json'
            })
            .done(function(result) {
                if (result) {
                    exports.getPlanOrder();
                }
            })
            .fail(function() {
                console.log("error");
            });
    }
    //班次保存到缓存
    function cachePlanOrder() {
        var data = $("#plan_order_list li").map(function() {
            return $(this).children().html();
        }).get();
        $("input[name=list1SortOrder]").val(data.join("|"));
    }
    /**
     * 重置班次
     * @author giscafer
     * @version 1.0
     * @date    2015-11-15T15:18:08+0800
     */
    exports.resetPlan = function() {
        var url = hostUrl + "plan/delPlanOrder";
        $.messager.confirm('重置提醒', '是否重置班次（重置后恢复为班次列表次序）？', function(ok) {
            if (ok) {
                $.get(url, function(res) {
                    if (res) {
                        //
                        queryPlanTable();
                        $("#planDragStart").show();
                        $("#planDragSave").hide();
                        Util.disableBtn($('#addPlanBtn'));
                        Util.disableBtn($('#resetPlanBtn'));
                    } else {
                        Messager.alert("重置失败！", "提示", 2000);
                    }
                });
            } else {
                return false;
            }
        });
    }
});
