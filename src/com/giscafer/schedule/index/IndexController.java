package com.giscafer.schedule.index;

import com.jfinal.core.Controller;

/**
 * IndexController
 */
public class IndexController extends Controller {
	public void index() {
		render("index.html");
		setAttr("finalshceduler", "终极排班系统");
	}
}





