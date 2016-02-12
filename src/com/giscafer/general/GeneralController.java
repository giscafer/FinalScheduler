package com.giscafer.general;

import java.io.Writer;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.jfinal.plugin.activerecord.Page;

import freemarker.cache.ClassTemplateLoader;
import freemarker.cache.MultiTemplateLoader;
import freemarker.cache.TemplateLoader;
import freemarker.template.Configuration;
import freemarker.template.Template;
/**
 * 
 * @ClassName: GeneralController  
 * @Description: TODO(描述该类的作用)  
 * @author giscafer 
 * @date 2015-11-8 下午3:01:56  
 *
 */
@SuppressWarnings("serial")
public class GeneralController extends HttpServlet {
	private static Configuration configuration = null;
	/**
	 * freemarker渲染
	 * 配合前端JS的loadUIAndRender方法接收如下url请求：
	 * localhost:8000/FinalScheduler/plan?template
	 * =WEB-INF/views/planset/plan.html&pno=1 仅对loadUIAndRender方法有使用意义
	 * @param request
	 * @param response
	 * @param root 
	 */
	@SuppressWarnings("rawtypes")
	public static void renderTemplate(HttpServletRequest request,HttpServletResponse response, Map root) {
		String template = null;
	
		// 使用servlet
		response.setCharacterEncoding("UTF-8");
		response.setHeader("content-type", "text/html;charset=UTF-8");
		configuration = new Configuration();
		configuration.setServletContextForTemplateLoading(request.getServletContext(), "");
		template = request.getParameter("template");
		if (template== null) return;
		ClassTemplateLoader ctl = new ClassTemplateLoader(GeneralController.class, "/");
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

	}

	public static void renderIndex(HttpServletRequest request,HttpServletResponse response,Page<?> page) {
		Map root = new HashMap();
		
		int rowNumber = page.getTotalRow();
		// 总行数
		root.put("totalRows", rowNumber);
		// 分页结果
		root.put("resultPage", page);
		GeneralController.renderTemplate(request, response, root);
	}

}
