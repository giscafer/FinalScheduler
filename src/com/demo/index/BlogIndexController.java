package com.demo.index;

import com.jfinal.core.ActionKey;
import com.jfinal.core.Controller;

/**
 * BlogIndexController
 */
public class BlogIndexController extends Controller {
	@ActionKey("/login")
	public void login() {
		render("/datagrid_data1.json");
	}
	public void index() {
		render("401.html");
		setAttr("hellojfinal", "JFinal学习");
	}
}





