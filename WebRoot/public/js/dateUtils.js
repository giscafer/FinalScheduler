/**
 * 日期格式化工具
 * @type {Object}
 */
var DateUtils = {
    /**
     * 获得格式化后的日期
     * @param date
     * @returns {string}
     */
    getFormatDay: function(date) {
        var dateTime;
        var dateFormat;
        if (typeof date == "object") {
            dateTime = new Date(date);
        } else {
            dateTime = new Date(date.replace(/-/g, '/'));
        }
        //--- -将时间格式改为如2014-01-01----
        var mon2 = (Number(dateTime.getMonth()) + 1);
        var day2 = dateTime.getDate();
        if (mon2 < 10) {
            mon2 = "0" + mon2;
        } else {
            mon2 = mon2 + "";
        }
        if (day2 < 10) {
            day2 = "0" + day2;
        } else {
            day2 = day2 + "";
        }
        dateFormat = dateTime.getFullYear() + "-" + mon2 + "-" + day2;
        return dateFormat;
    },
    /**
     * 格式化日期
     * @param date
     * @returns {string}
     */
    getFormatDate: function(date) {
        var dateTime;
        var dateString;
        if(date===undefined){
            date=new Date();
        }
        //        var flag=date.indexOf("-");
        if (typeof date == "object") {
            dateTime = new Date(date);
        } else {
            dateTime = new Date(date.replace(/-/g, '/'));
        }
        //--- -将时间格式改为如2014-01-01----
        var mon2 = (Number(dateTime.getMonth()) + 1);
        var day2 = dateTime.getDate();
        var hours = dateTime.getHours();
        var minus = dateTime.getMinutes();
        var seconds = dateTime.getSeconds();
        if (mon2 < 10) {
            mon2 = "0" + mon2;
        } else {
            mon2 = mon2 + "";
        }
        if (day2 < 10) {
            day2 = "0" + day2;
        } else {
            day2 = day2 + "";
        }
        if (hours < 10) {
            hours = "0" + hours;
        } else {
            hours = hours + "";
        }
        if (minus < 10) {
            minus = "0" + minus;
        } else {
            minus = minus + "";
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        } else {
            seconds = seconds + "";
        }
        dateString = dateTime.getFullYear() + "-" + mon2 + "-" + day2 + " " + hours + ":" + minus + ":" + seconds;
        return dateString;

    },
    /**
     * 格式化时间，转为“日+小时+分+秒”
     * @param longTime 单位：秒
     */
    getFormatTimeStr: function(longTime) {
        if (longTime === null || longTime === "" || longTime === undefined) {
            return;
        }
        var time = parseFloat(longTime);
        if (time === 0) {
            return "0s";
        }
        if (time < 60) {
            var s = time;
            time = s + "s";
        } else if (time >= 60 && time < 3600) {
            var m = parseInt(time / 60);
            var s = parseInt(time % 60);
            time = m + "min" + s + "s";
        } else if (time >= 3600 && time < 86400) {
            var h = parseInt(time / 3600);
            var m = parseInt(time % 3600 / 60);
            var s = parseInt(time % 3600 % 60 % 60);
            time = h + "h" + m + "min" + s + "s";
        } else if (time >= 86400) {
            var d = parseInt(time / 86400);
            var h = parseInt(time % 86400 / 3600);
            var m = parseInt(time % 86400 % 3600 / 60);
            var s = parseInt(time % 86400 % 3600 % 60 % 60);
            time = d + "d" + h + "h" + m + "min" + s + "s";
        }
        return time;
    },
    /**
     * 获得今天凌晨的时间（秒为单位）
     */
    getTodayTime: function() {
        var today = new Date();
        var strYear = today.getFullYear();
        var strDay = today.getDate();
        var strMonth = today.getMonth() + 1;
        if (strMonth < 10)
            strMonth = "0" + strMonth;
        if (strDay < 10)
            strDay = "0" + strDay;
        var strToday = strYear + "-" + strMonth + "-" + strDay;
        var strTodayTime = strToday + " 00:00:00";

        var todayDate = new Date(strTodayTime.replace(/-/g, '/'));
        return todayDate.getTime();
    },
    /**
     * 获得昨天的日期
     */
    getProxDay: function() {
        var today = new Date();
        var yesterday_milliseconds = today.getTime() - 1000 * 60 * 60 * 24;
        var yesterday = new Date();
        yesterday.setTime(yesterday_milliseconds);

        var strYear = yesterday.getFullYear();
        var strDay = yesterday.getDate();
        var strMonth = yesterday.getMonth() + 1;
        if (strMonth < 10)
            strMonth = "0" + strMonth;
        if (strDay < 10)
            strDay = "0" + strDay;
        var strYesterday = strYear + "-" + strMonth + "-" + strDay;
        var strYesterdayTime = strYesterday + " 00:00:00";

        var proxDate = new Date(strYesterdayTime.replace(/-/g, '/'));
        return proxDate;
    },
    /**
     * 以日期串拼接
     * @return {[type]} [description]
     */
    getDateUId:function(){
        var dateStr=this.getFormatDate();
        dateStr=dateStr.replace(/ /g,"").replace(/-/g,"").replace(/:/g,"");
        return dateStr;
    }
};
