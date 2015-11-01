package com.giscafer.schedule.routes;

import com.giscafer.schedule.index.IndexController;
import com.giscafer.schedule.person.PersonController;
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
		add("/", IndexController.class);
		add("/person", PersonController.class);
	}
}
