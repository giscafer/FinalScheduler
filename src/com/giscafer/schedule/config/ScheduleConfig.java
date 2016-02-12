package com.giscafer.schedule.config;

import com.demo.blog.Blog;
import com.giscafer.schedule.check.Check;
import com.giscafer.schedule.dict.Dict;
import com.giscafer.schedule.group.Group;
import com.giscafer.schedule.person.Person;
import com.giscafer.schedule.plan.Plan;
import com.giscafer.schedule.plan.PlanOrder;
import com.giscafer.schedule.routes.AdminRoutes;
import com.giscafer.schedule.routes.FrontRoutes;
import com.giscafer.schedule.scheduler.GroupPerson;
import com.giscafer.schedule.scheduler.Scheduler;
import com.jfinal.config.Constants;
import com.jfinal.config.Handlers;
import com.jfinal.config.Interceptors;
import com.jfinal.config.JFinalConfig;
import com.jfinal.config.Plugins;
import com.jfinal.config.Routes;
import com.jfinal.core.JFinal;
import com.jfinal.ext.handler.UrlSkipHandler;
import com.jfinal.kit.PropKit;
import com.jfinal.plugin.activerecord.ActiveRecordPlugin;
import com.jfinal.plugin.c3p0.C3p0Plugin;

/**
 * API引导式配置
 */
public class ScheduleConfig extends JFinalConfig {
	
	/**
	 * 配置常量
	 * 1：模板路径= BaseViewPath + ViewPath + render时的参数
	 * 
	 * 2：当 render 时view的参数以 "/" 打头，则模板路径使用从WebRoot下的绝对路
	 * 
	 * 3：在配置路由时如果省略第三个参数，则 viewPath = controllerKey
	 */
	public void configConstant(Constants me) {
		// 加载少量必要配置，随后可用PropKit.get(...)获取值
		PropKit.use("a_little_config.txt");
		//设置基础路径
		me.setDevMode(PropKit.getBoolean("devMode", false));
		me.setBaseViewPath("/WEB-INF/views/");
		me.setError401View("/WEB-INF/views/error/401.html");
		me.setError403View("/WEB-INF/views/error/403.html");
		me.setError404View("/WEB-INF/views/error/404.html");
		me.setError500View("/WEB-INF/views/error/500.html");
	}
	
	/**
	 * 配置路由
	 */
	public void configRoute(Routes me) {
		me.add(new FrontRoutes()); // 前端路由
		me.add(new AdminRoutes()); // 后端路由
	}
	
	/**
	 * 配置插件
	 */
	public void configPlugin(Plugins me) {
		// 配置C3p0数据库连接池插件
		C3p0Plugin c3p0Plugin = new C3p0Plugin(PropKit.get("jdbcUrl"), PropKit.get("user"), PropKit.get("password").trim());
		me.add(c3p0Plugin);
		
		// 配置ActiveRecord插件
		ActiveRecordPlugin arp = new ActiveRecordPlugin(c3p0Plugin);
		me.add(arp);
		//Config config = getConfig();  ActiveRecord调用DbKit的方法,取得DB配置
		arp.addMapping("blog", Blog.class);	// 映射blog 表到 Blog模型
		arp.addMapping("gc_schedule_person","pid",Person.class);	// 映射表gc_schedule_person到 Person模型,指定主键为pid,不指定主键将会默认是id
		//词典翻译
		arp.addMapping("gc_common_dict",Dict.class);
		//人员分组
		arp.addMapping("gc_schedule_group","gid",Group.class);	
		//班次设置
		arp.addMapping("gc_schedule_plan","pid",Plan.class);
		arp.addMapping("gc_schedule_planorder",PlanOrder.class);
		//排班管理
		arp.addMapping("gc_schedule_group_person_v","gid",GroupPerson.class);	
		arp.addMapping("gc_schedule_scheduler",Scheduler.class);
		//考勤统计
		arp.addMapping("gc_schedule_check_statistics_v",Check.class);
	}
	
	/**
	 * 配置全局拦截器
	 */
	public void configInterceptor(Interceptors me) {
		
	}
	
	/**
	 * 配置处理器
	 */
	public void configHandler(Handlers me) {
		//使用此方式跳过jfinal过滤器对servlet的拦截
		me.add(new UrlSkipHandler("/home", false));
	}
	
	/**
	 * 使用jetty-server-XXX.jar
	 * 运行此 main 方法可以启动项目，此main方法可以放置在任意的Class类定义中，不一定要放于此
	 */
	public static void main(String[] args) {
		JFinal.start("WebRoot", 8000, "/FinalScheduler", 5);
	}
}
