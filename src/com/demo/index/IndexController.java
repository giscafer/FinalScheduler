package com.demo.index;

import com.jfinal.core.Controller;

/**
 * IndexController
 */
public class IndexController extends Controller {
	public void index() {
		render("index.html");
		setAttr("hellojfinal", "JFinal学习");
	}
}





