package com.giscafer.schedule.plan;

import java.io.Serializable;
import java.io.Writer;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.giscafer.general.GeneralController;
import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Page;

import data.general.DataService;

import freemarker.cache.ClassTemplateLoader;
import freemarker.cache.MultiTemplateLoader;
import freemarker.cache.TemplateLoader;
import freemarker.template.Configuration;
import freemarker.template.Template;

/**
 * 
 * @ClassName: PlanController
 * @Description: TODO(班次逻辑处理控制类)
 * @author giscafer
 * @date 2015-11-5 上午12:56:50
 * 
 */
public class PlanController extends Controller {


	public void index() {
		HttpServletRequest request = getRequest();
		HttpServletResponse response = getResponse();
		renderPlanIndex(request,response,10);
		renderNull();
	}
	/**
	 * 分页查询渲染plan首页
	 * @param request
	 * @param response
	 * @param pageSize
	 */
	public void renderPlanIndex(HttpServletRequest request,HttpServletResponse response,int pageSize) {
		int pageNumber = 1;
		// 获取分页参数
		String pno = request.getParameter("pno");
		if (pno != null) {
			pageNumber = Integer.parseInt(pno);
		}
		if(pageSize==0){
			pageSize=10;
		}
		Page<Plan> page = Plan.me.paginate(pageNumber, pageSize);
		GeneralController.renderIndex(request, response, page);
	}

	// @Before(PlanValidator.class)
	public void save() {
		getModel(Plan.class).save();
		redirect("/blog");
	}
	/**
	 * 编辑
	 */
	public void edit() {
		Map<String, Serializable> root = new HashMap();
		HttpServletRequest request = getRequest();
		HttpServletResponse response = getResponse();
		// 获取编辑参数
		String pid = request.getParameter("pid");
		root.put("result", Plan.me.findById(pid));
		GeneralController.renderTemplate(request, response, root);
		renderNull();
	}
	/**
	 * 更新
	 */
	// @Before(PlanValidator.class)
	public void update() {
		String insertedJson=getPara("updated");
//		System.out.println(insertedJson);
		boolean result=DataService.update(insertedJson, Plan.class);
		renderJson(result);
	}
	/**
	 * 删除
	 */
	public void delete() {
		Plan.me.deleteById(getParaToInt());
		renderNull();
	}
	/**
	 * 添加
	 */
	public void add(){
		Map<String, Serializable> root = new HashMap();
		HttpServletRequest request = getRequest();
		HttpServletResponse response = getResponse();
		GeneralController.renderTemplate(request, response, root);
		renderNull();
	}
}
