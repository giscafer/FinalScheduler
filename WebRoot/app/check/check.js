/**
 * 考勤统计处理类
 * @author giscafer
 * @version 1.0
 * @date    2015-11-25T23:02:42+0800
 */
define(function(require, exports, module) {
    var hostUrl = require('js/config').options.hostUrl;
    Giscafer.checkPersonCache = [];
    Giscafer.checkInfoCache = {};
    //初始化统计日期
    function initCheckCalendar() {
        var calendar = $('#jxkh_calendar').fullCalendar({
            header: {
                left: 'prevYear,nextYear',
                center: 'dateTitle',
                right: 'prev,next today'
            },
            buttonText: {
                today: '本月',
            },
            defaultView: "month",
            firstDay: 1 //周一是第一天
        });
        return calendar;
    }


    function cpayClickHandler(event) {
        var cpayValue = $(this).html();
        var pid = $(this).parent().attr('name');
        var checkMonth = $(this).parent().attr('date-data');
        var evaluate = $(this).parent().attr('evaluate');
        // Giscafer.App.Giscafer.instance.updateCpayRecord(pid, checkMonth, evaluate);
    }

    function scoreClickHandler(event) {
        var cpayValue = $(this).html();
        var pid = $(this).parent().attr('name');
        var checkMonth = $(this).parent().attr('date-data');
        var cpay = $(this).parent().attr('cpay');
        // Giscafer.App.Giscafer.instance.updateEvaluateRecord(pid, checkMonth, cpay);
    }
    /**
     * 初始化日历标题
     */
    exports.initCheckCalendarTitle = function() {
            //设定标题
            var title = $.fullCalendar.formatDate(Giscafer.monthVisStart, "yyyy年MM月");
            var titleHtml = "<span style='font-weight:bold;'>" + title + " 人员考勤情况</span>";
            $('#jxkh_calendar .fc-header-center').html('');
            $('#jxkh_calendar .fc-header-center').append(titleHtml);
            //绑定工资补扣点击事件(先解绑，避免多次弹窗)
            $('#jxkh_calendar .check-pay > div').unbind('click', cpayClickHandler);
            $('#jxkh_calendar .check-pay > div').bind('click', cpayClickHandler);
            //考核评分点击事件(先解绑，避免多次弹窗)
            $('#jxkh_calendar .check-score > div').unbind('click', scoreClickHandler);
            $('#jxkh_calendar .check-score > div').bind('click', scoreClickHandler);
        }
        /**
         * 读取人员姓名信息到缓存中
         */
    exports.getPersonGroup = function() {
        Giscafer.checkPersonCache = [];
        $.ajax({
                url: hostUrl + 'queryPerson',
                type: 'GET',
                async: true,
                dataType: 'json'
            })
            .done(function(data) {
                if (!data.length) return;
                for (var i = 0; i < data.length; i++) {
                    var obj = {
                        'pid': data[i].pid,
                        'personName': data[i].name
                    }
                    Giscafer.checkPersonCache.push(obj);
                }
                //初始化考勤日历
                Giscafer.checkCalendar = initCheckCalendar();
            })
            .fail(function(e) {
                console.log(e);
            });
    };

    /**
     * 工作（&#10003;）、迟到（&#9670;）、旷工（&#10005;）、事假（&#9733;）、病假（&#10010;）、调休（&#9650;）
     * @author giscafer
     * @version 1.0
     * @date    2015-11-25T23:26:01+0800
     * @param   {Number|String}                 qdzt 签到状态值
     */
    function identifyCheckType(qdzt) {
        var checkType = 0;
        if (qdzt == 1) { //工作
            // checkType=qdzt;
            checkType = "&#10003;";
        } else if (qdzt == 2) { //迟到
            // checkType=2;
            checkType = "&#9670;";
        } else if (qdzt == 3) { //旷工
            // checkType=3;
            checkType = "&#10005;";
        } else if (!qdzt) { //null或者""
            // checkType=3;
            checkType = "&#10005;";
        } else if (qdzt == "病") {
            // checkType=4;
            checkType = "&#10010";
        } else if (qdzt == "事") {
            // checkType=5;
            checkType = "&#9733";
        } else if (qdzt == "休") {
            // checkType=6;
            checkType = "&#9650";
        } else { //如果是考勤表中有安排，但是没签到有没请假的就是旷工
            // checkType=3;
            checkType = "&#10005;";
        }
        return checkType;
    }
    /**
     * 读取人员签到信息到缓存中
     * @param checkMonth 查询的月份 如‘2015-11’
     */
    exports.getPersonCheckInfo = function(checkMonth) {
        Giscafer.checkInfoCache = {};
        var qf = {};
        qf.selectFields = "*";
        qf.whereString = "checkTime LIKE '" + checkMonth + "%'"; //月份
        qf.orderByString = "pid";
        $.ajax({
                url: hostUrl + 'check/getEntityList',
                type: 'POST',
                data: qf,
                async: true,
                dataType: 'json'
            })
            .done(function(data) {
                if (!data.length) return;
                resultHandler(data)
            })
            .fail(function(e) {
                console.log(e);
            });

        function resultHandler(res) {
            //组织结果，将结果按人员组织
            var comparepid = res[0].pid;
            var day = res[0].checkTime;
            var pid, qdzt, dayCheck = {};
            for (var i = 0; i < res.length; i++) {
                pid = res[i].pid;
                if (comparepid == pid) {
                    day = res[i].checkTime;
                    qdzt = res[i].checkStatus;
                    var checkType = identifyCheckType(qdzt);
                    //日期：班次
                    dayCheck[day] = checkType;
                } else {
                    Giscafer.checkInfoCache[comparepid] = dayCheck;
                    comparepid = pid;
                    dayCheck = {};
                    day = res[i].checkTime;
                    qdzt = res[i].checkStatus;
                    var checkType = identifyCheckType(qdzt);
                    dayCheck[day] = checkType;
                }
            };
            Giscafer.checkInfoCache[comparepid] = dayCheck;
        }

    };
    //重新统计
    /*exports.reStatistics = function() {
        var title = $.fullCalendar.formatDate(Giscafer.monthVisStart, "yyyy年MM月");
        var reStatisticsMonth = $.fullCalendar.formatDate(Giscafer.monthVisStart, "yyyy-MM");
        var currentMon = $.fullCalendar.formatDate(new Date(), 'yyyy-MM');
        var restatiticsDate = Giscafer.monthVisStart;
        var checkPersonCache = Giscafer.App.Giscafer.instance.checkPersonCache;
        var pids = "(";
        if (currentMon <= reStatisticsMonth) {
            mini.alert("只能重新统计历史月份！", 2000);
            return;
        }
        for (var i = 0; i < checkPersonCache.length; i++) {
            pids += checkPersonCache[i].pid + ",";
        };
        pids = pids.substring(0, pids.length - 1) + ")";
        var reStatisticsParam = reStatisticsMonth + "&" + pids;
        console.log(reStatisticsParam)
        mini.confirm("是否要重新统计【" + title + "】的考核得分和补扣工资？", "提醒",
            function(action) {
                if (action == "ok") {
                    $.ajax({
                            url: Config.hostUrl + '/Giscafer_reStatistics.do',
                            type: 'POST',
                            data: {
                                params: reStatisticsParam
                            },
                        })
                        .done(function() {
                            mini.alert('重新统计成功！', '提示', 1000);
                            //先跳到下月再回来本月来临时解决
                            $('#jxkh_calendar').fullCalendar('gotoDate', Giscafer.monthVisStart.getFullYear(), Giscafer.monthVisStart.getMonth() + 1);
                            $('#jxkh_calendar').fullCalendar('gotoDate', restatiticsDate.getFullYear(), restatiticsDate.getMonth());
                        })
                        .fail(function() {
                            mini.alert('重新统计成功！', 2000);
                        })

                } else {
                    return false;
                }
            });
    }*/
    Giscafer.getPersonGroup = exports.getPersonGroup;
    Giscafer.getPersonCheckInfo = exports.getPersonCheckInfo;
});
