package com.giscafer.schedule.plan;

import java.io.Writer;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Page;

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

	private Configuration configuration = null;
	/**
	 * 配合前端JS的loadUIAndRender方法接收如下url请求：
	 * localhost:8000/FinalScheduler/plan?template=WEB-INF/views/planset/plan.html&pno=1
	 * 仅对loadUIAndRender方法有使用意义
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public void index(){
		String template = null;
		int pageNumber=1;
		Map root = new HashMap();
		//使用servlet
		HttpServletRequest request = getRequest();
		HttpServletResponse response = getResponse();
		response.setCharacterEncoding("UTF-8");
		response.setHeader("content-type", "text/html;charset=UTF-8");
		configuration = new Configuration();
		configuration.setServletContextForTemplateLoading(request.getServletContext(),"");
		
		//获取分页参数
		String pno=request.getParameter("pno");
		if(pno!=null){
			pageNumber=Integer.parseInt(pno);
		}
		Page<Plan> page=Plan.me.paginate(pageNumber, 10);
		int rowNumber=page.getTotalRow();
		root.put("totalRows", rowNumber);
		root.put("planPage", page);
		if (request.getParameter("template") != null)
			template = request.getParameter("template");
		ClassTemplateLoader ctl = new ClassTemplateLoader(this.getClass(), "/");
		TemplateLoader tl = configuration.getTemplateLoader();
		TemplateLoader[] loaders = new TemplateLoader[] { tl, ctl };
		MultiTemplateLoader mtl = new MultiTemplateLoader(loaders);
		configuration.setTemplateLoader(mtl);
		Template temp;
		try {
			temp = configuration.getTemplate(template, "utf-8");
			Writer writer = response.getWriter();
			temp.process(root, writer);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		renderNull();
	}
	
	public void add() {
	}
	
//	@Before(PlanValidator.class)
	public void save() {
		getModel(Plan.class).save();
		redirect("/blog");
	}
	
	public void edit() {
		setAttr("blog", Plan.me.findById(getParaToInt()));
	}
	
//	@Before(PlanValidator.class)
	public void update() {
		getModel(Plan.class).update();
		redirect("/blog");
	}
	public void delete() {
		Plan.me.deleteById(getParaToInt());
//		index();
		renderNull();
	}
}
