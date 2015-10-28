package com.demo.blog;

import com.jfinal.core.Controller;
import com.jfinal.validate.Validator;

/**
 * BlogValidator.
 */
public class BlogValidator extends Validator {
	
	protected void validate(Controller controller) {
		validateRequiredString("blog.title", "titleMsg", "请输入Blog标题!");
		validateRequiredString("blog.content", "contentMsg", "请输入Blog内容!");
	}
	
	protected void handleError(Controller controller) {
		controller.keepModel(Blog.class);
		
		String actionKey = getActionKey();
		if (actionKey.equals("/blog/save"))
			controller.render("add.html");
		else if (actionKey.equals("/blog/update"))
			controller.render("edit.html");
	}
}
