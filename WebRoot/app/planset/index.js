/**
 * 班次设置逻辑处理module
 * @author giscafer
 * @version 1.0
 * @date    2015-11-08T18:45:59+0800
 */
define(function(require,exports,module){
	var hostUrl=require('js/config').options.hostUrl;
	/**
	 * 编辑班次保持
	 */
	exports.updatePlan=function(){
		var pid=$("#inputPid").val();
		var color=$("#inputColor").val();
		var planName=$("#inputPlanName").val();
		var defineType=$("#inputDefineType").val();
		var planType=$("#inputPlanType").val();
		var startTime=$("#inputStartTime").val();
		var endTime=$("#inputEndTime").val();
		var totalTime=$("#inputTotalTime").val();
		var periodTime="";
		var obj={
			"pid":pid,
			"color":color,
			"planName":planName,
			"defineType":defineType,
			"planType":planType,
			"periodTime":periodTime,
			"totalTime":totalTime,
		}
		var objJson=JSON.stringify(new Array(obj));
		$.post(hostUrl+'plan/update', {"updated":objJson}, function(data, textStatus, xhr) {
			if(textStatus=="success"){
				loadUIAndRender('plan','WEB-INF/views/planset/plan.html');
			}else{

			}
		});
		
	}
});
