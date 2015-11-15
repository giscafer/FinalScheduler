/**
 * 排班管理业务逻辑module
 * @author giscafer
 * @version 1.0
 * @date    2015-11-15T00:15:37+0800
 */
define(function(require,exports,module){

	var EventProxy=require('module/eventproxy');
	var hostUrl=require('js/config').options.hostUrl;
    var Messager = require('common/messager');
    //外部全局变量
	Giscafer.pbglXhyCache=[];
	Giscafer.pbglBcColorObj={};
	Giscafer.pbglEventsCache ={};
	/**
	 * 获取人员的分组信息
	 * @author giscafer
	 * @version 1.0
	 * @date    2015-11-15T00:44:06+0800
	 */
	exports.getPersonGroup=function(){
		$.ajax({
			url: hostUrl+'schedule/getGroupPersonList/',
			type: 'GET',
			dataType: 'json'
		})
		.done(function(data) {
			dealTheData(data);
		})
		.fail(function() {
			console.log("error");
		});
		//处理结果数据
		function dealTheData(data){
            Giscafer.pbglXhyCache=[];
			Giscafer.pbglRowCnt=data.length;
			if (data.length> 0) {
			    var compareGid = data[0].gid;
			    var compareGName = data[0].groupName;
			    var Gid, personArr = [];
			    for (var i = 0; i < data.length; i++) {
			        Gid = data[i].gid;
			        if (compareGid == Gid) {
			            var name=data[i].pid+"|"+data[i].name;
			            personArr.push(name);
			        } else {
			            var obj = {
			                'groupName': compareGName,
			                'personArr': personArr
			            }
			            Giscafer.pbglXhyCache.push(obj);
			            compareGid = Gid;
			            compareGName = data[i].groupName || '未分组人员';
			            personArr = [];
			            var name=data[i].pid+"|"+data[i].name;
			            personArr.push(name);
			        }
			    };
			    var obj = {
			        'groupName': compareGName,
			        'personArr': personArr
			    }
			    Giscafer.pbglXhyCache.push(obj);
			    //初始化日历
			    Giscafer.calendar=initCalender();
			}
		}
	}
	/**
	 * 初始化Calender
	 */
	function initCalender() {
		var calendar = $('#pbgl_calendar').fullCalendar({
			header : {
				left : '',
				center : '',
				right : 'prev,next today'
			},
			buttonText : {
				today : '本周',
			},
			defaultView : "basicWeek",
			firstday : 1
		//周一是第一天
		/*,loading:function(isLoading, view){
		    debugger;
		    alert(isLoading);
		}*/
		});
		return calendar;
	}
	exports.getPlanInfoAndColor=function(){
		$.ajax({
			url: hostUrl+'plan/getList/',
			type: 'GET',
			dataType: 'json'
		})
		.done(function(result) {
			 Giscafer.pbglBcColorObj={};
            if (!result.length) return;
            for (var i = 0; i < result.length; i++) {
                var bcmc=result[i].planName;
                var color=result[i].color;
                Giscafer.pbglBcColorObj[bcmc]=color;
            };
            getBcOrderInfo();
		})
		.fail(function() {
			console.log("error");
		});
    }
    /**
     * 查询班次顺序，并创建班次弹出选择层
     */
    function getBcOrderInfo(){
        $.ajax({
			url: hostUrl+'plan/getPlanOrderList/',
			type: 'GET',
			dataType: 'json'
		})
		.done(function(result) {
			dealPlanOrderData(result);
		})
		.fail(function() {
			console.log("error");
		});
		
        function dealPlanOrderData(result){
        	var className="btn-toolbar-button paiban_btn float_button";
        	if (!result.length) return;
            var bcData=result[0].planItem || "";
            if(bcData.length>0){
                var pbglBcInfo=bcData.split("|");
                Giscafer.pbglBcInfo=pbglBcInfo;
                var html='';
                for(var k=0;k<pbglBcInfo.length;k++){
                    var color=Giscafer.pbglBcColorObj[pbglBcInfo[k]] || "#fff";
                    html+='<button class="'+className+'" name="'+color+'">'+pbglBcInfo[k]+'</button>';
                }
                html+='<span class="paiban_seperator"></span>';
                $("#paiban_toolbar_container").html('');
                $("#paiban_toolbar_container").append(html);
                bcBtnEventBand();
            }
        }
    }
    /**
     * 弹出层的班次按钮绑定事件
     */
    function bcBtnEventBand(){
        //弹窗选择层
        $("#paiban_toolbar_container").find('button').click(function(e){
            var bcmc=$(this).html();
            var bcolor=$(this).attr('name');
            var itemContainer=currentPopupTargetObj.find('.fc-day-content');
            var itemLen=itemContainer.children().length;
            //获取已有班次名称
            var itemInfo=itemContainer.children().find('.pbschedualitem').map(function() {
                    return $(this).html();
                }).get().join('|');
            if(itemLen<3){

                if(bcmc=='病' || bcmc=='事' || bcmc=='休'){
                    if(itemInfo.indexOf('病')!=-1 || itemInfo.indexOf('休')!=-1 || itemInfo.indexOf('事')!=-1){
                        Messager.alert('当天内【病、事、休】班次只能排一个！',1000);
                        return;
                    }
                }

                if(itemInfo.indexOf(bcmc)==-1){
                    var html='<div class="schedualitem" style="background-color:'+bcolor+'">';
                    html+='<div class="pbschedualitem">'+bcmc+'</div>'+
                    '<button type="button" class="close pbschedualitemclose">&times;</button></div>';
                    itemContainer.append(html);
                }else{
                     Messager.alert('已存在相同的班次！',1000);
                }
                //delete
               // $("button[name=pbschedualitemdel]").unbind("click");
               $("button.pbschedualitemclose").click(function(e){
                   $(this).parent().parent().attr('data-edit','edit');;
                   $(this).parent().remove();
               });
            }else{
                Messager.alert('每天排班数量不许超过3个！',1000);
            }
            //标记为修改
            currentPopupTargetObj.find('.fc-day-content').attr('data-edit','edit');
        });
        //为删除按钮添加事件
        // $("button[name=pbschedualitemdel]").unbind("click");
        $("button.pbschedualitemclose").click(function(e){
            $(this).parent().parent().attr('data-edit','edit');;
            $(this).parent().remove();
        });
    }
	/**
 	* 初始化日历标题
 	*/
    exports.initCalendarTitle = function() {
        //设定标题
        var weekEndTime = new Date(Giscafer.calenderVisEnd) - (24 * 60 * 60 * 1000);
        var monday = $.fullCalendar.formatDate(Giscafer.calenderVisStart,
            "yyyy年MM月dd日");
        var sunday = $.fullCalendar.formatDate(new Date(weekEndTime),
            "yyyy年MM月dd日");
        var titleHtml = "<span style='font-weight:bold;'>本周 (" + monday + " - " + sunday + ") 排班表</span>"
        $('#pbgl_calendar .fc-header-left').html('');
        $('#pbgl_calendar .fc-header-left').append(titleHtml);
    }
    /**
     * 查询排班记录
     * @param  {Date} visStart 周一
     * @param  {Date} visEnd   次周周一
     */
    var getScheduleEvents=function(visStart,visEnd){
        var dayS=$.fullCalendar.formatDate(visStart, "yyyy-MM-dd");
        var dayE=$.fullCalendar.formatDate(visEnd, "yyyy-MM-dd");
        var whereString = "day>='"+dayS+"' and day<'"+dayE+"'";
        var queryFilter={
            "whereString":whereString
        }
        $.ajax({
			url: hostUrl+'schedule/getSchedulerList',
			type: 'GET',
			async: false, //同步
            data:queryFilter,
			dataType: 'json'
		})
		.done(function(result) {
			dealScheduleData(result);
		})
		.fail(function() {
			console.log("error");
		});
        function dealScheduleData(result){
        	//清空
        	Giscafer.pbglEventsCache ={};
        	if (result.length > 0) {
        	    //组织结果，将结果按人员组织
        	    var comparepid = result[0].pid;
        	    var day = result[0].day;
        	    var pid,dayEvents = {};
        	    for (var i = 0; i < result.length; i++) {
        	        pid = result[i].pid;
        	        if (comparepid == pid) {
        	            day=result[i].day;
        	            //日期：班次
        	            dayEvents[day]=result[i].events;
        	        } else {
        	            Giscafer.pbglEventsCache[comparepid]=dayEvents;
        	            comparepid = pid;
        	            dayEvents = {};
        	            day=result[i].day;
        	            dayEvents[day]=result[i].events;
        	        }
        	    };
        	    Giscafer.pbglEventsCache[comparepid]=dayEvents;
        	}
        }
    }
    //提供给外部js调用
    Giscafer.getScheduleEvents=getScheduleEvents;


    /**
     * 日历编辑
     */
	exports.calendarEditFuc = function() {
        //可编辑
        Giscafer.popUpLayer = new PopupLayer({
            trigger: ".fc-day-content",
            popupBlk: "#paiban_toolbar_container",
            closeBtn: "#close7",
            eventType: "mouseover",
            disEventType: "mouseout"
        });
        $("#piaban_startEdit").hide();
        $("#piaban_stopEdit").show();
        //控制编辑的时候不能夸周编辑
        $(".fc-button").addClass('fc-state-disabled');
    }

    /**
     * 结束编辑
     * @return {[type]} [description]
     */
	exports.calendarStopEditFuc = function() {
	    try {
	        $("#piaban_stopEdit").hide();
	        $("#piaban_startEdit").show();
	        $("#pbgl_calendar .fc-day-content").unbind('mouseover');
	        $("#pbgl_calendar .fc-day-content").unbind('mouseout');
	        $("#pbgl_calendar .fc-border-separate").find('td').removeClass(
	            'tdselected');
	        Giscafer.popUpLayer.close();
	        $("#paiban_toolbar_container").hide();
	        //保存后释放按钮
	        $(".fc-button").removeClass('fc-state-disabled');
	    } catch (e) {
	        console.log(e);
	    }

	    //保存数据库……
	    updateSchedual();
	    $("#pbgl_calendar .pbschedualitemclose").hide();
	}
	/**
	 * 保存排班（更新）
	 */
	function updateSchedual(){
        var shedualtd=$(".fc-border-separate").find('td.fc-day');
        var divContents=shedualtd.find('.fc-day-content[data-edit=edit]'); 
        divContents.each(function(index, el) {
            var divContent=$(el) //获取编辑过的td.div
            var pid=divContent.attr('id');                                //获取巡护员ID
            // var name=divContent.attr('name');                           //获取巡护员姓名
            var dateStr=divContent.parent().attr('data-date');            //获取时间
            var data = divContent.children().find('.pbschedualitem').map(function() {
                return $(this).html();
            }).get().join('|');
            updateSchedualByPerson(pid,dateStr,data);
        });
        //保存数据库
        function updateSchedualByPerson(pid,dateStr,data) {
            var whereStr="pid="+pid+" and day='"+dateStr+"'";
            var setFields="events='"+data+"'";
            var updateFilter={
                "setFields":setFields,
                "whereString":whereStr
            }
            $.ajax({
                url: hostUrl+'schedule/updateSchedule',
                type: 'POST',
                data: updateFilter,
                dataType: 'json'
            })
            .done(function(result) {
                console.log(result);
            })
            .fail(function() {
                console.log("error");
            });
        }
    }
     /**
     * 新增空的排班记录到数据库（新增）
     * @param  {String} pid  分组人员Id
     * @param  {String} name 
     * @param  {String} day  排班日期如 2015-10-11
     */
    function saveNullScheduleByPerson(pid,name,day){
        var objStr = {
            'pid': pid,
            'name': name,
            'day': day,
            'events': ""
        }
        //对象数据字符串
       var objJson=JSON.stringify(new Array(objStr));
       $.ajax({
            url: hostUrl+'schedule/saveSchedule',
            type: 'POST',
            async: false, //同步（避免主键重复问题）
            data:{"inserted":objJson},
            dataType: 'json'
        })
        .done(function(result) {
        })
        .fail(function() {
            console.log("error");
        });
    }
     //提供给外部js调用
    Giscafer.saveNullScheduleByPerson=saveNullScheduleByPerson;
});