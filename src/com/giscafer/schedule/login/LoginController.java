package com.giscafer.schedule.login;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
public class LoginController {

	
	@RequestMapping("/login.do")
	public String loginIndex(String errors, Model model,String userName,String passWord,
			HttpServletRequest request, HttpServletResponse response,
			String loginUrl){
		System.out.println(1111);
		return "view/index";		
	}
}
