package com.giscafer.schedule.routes;

import com.giscafer.schedule.check.CheckController;
import com.giscafer.schedule.dict.DictController;
import com.giscafer.schedule.group.GroupController;
import com.giscafer.schedule.index.IndexController;
import com.giscafer.schedule.person.PersonController;
import com.giscafer.schedule.plan.PlanController;
import com.giscafer.schedule.scheduler.SchedulerController;
import com.jfinal.config.Routes;
/**
 * 
 * @ClassName: FrontRoutes  
 * @Description: TODO(前端路由)  
 * @author giscafer 
 * @date 2015-11-1 下午4:01:12  
 *
 */
public class FrontRoutes extends Routes{

	public void config(){
		add("/", IndexController.class); //首页
		add("/person", PersonController.class); //人员信息
		add("/dict", DictController.class); //字典翻译
		add("/group", GroupController.class); //分组管理
		add("/plan", PlanController.class,"/planset"); //班次管理
		add("/schedule", SchedulerController.class); //排班管理
		add("/check", CheckController.class); //考勤统计
	}
}
