package com.giscafer.schedule.general;

import java.io.IOException;
import java.io.Writer;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import freemarker.cache.ClassTemplateLoader;
import freemarker.cache.MultiTemplateLoader;
import freemarker.cache.TemplateLoader;
import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;



public class HomeServlet extends HttpServlet {

	private Configuration configuration = null;
	/**
	 * Constructor of the object.
	 */
	public HomeServlet() {
		super();
	}

	/**
	 * Destruction of the servlet. <br>
	 */
	public void destroy() {
		super.destroy(); // Just puts "destroy" string in log
	}

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
        doPost(request, response);
	}

	/**
	 * The doPost method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to post.
	 * 
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String template = "index.html";
		response.setCharacterEncoding("UTF-8");
		response.setHeader("content-type","text/html;charset=UTF-8");
		if(request.getParameter("template")!=null)
		     template = request.getParameter("template");
		ClassTemplateLoader ctl = new ClassTemplateLoader(this.getClass(), "/");
		TemplateLoader tl = configuration.getTemplateLoader();
		TemplateLoader[] loaders = new TemplateLoader[] { tl, ctl };
		MultiTemplateLoader mtl = new MultiTemplateLoader(loaders);
		configuration.setTemplateLoader(mtl);
		Template temp = configuration.getTemplate(template, "utf-8");
		Writer writer = response.getWriter();
		try {
			temp.process(null, writer);
			String htmlStr = writer.toString();
			System.out.println(htmlStr);
		} catch (TemplateException e) {
			e.printStackTrace();
		}
	}

	/**
	 * Initialization of the servlet. <br>
	 *
	 * @throws ServletException if an error occurs
	 */
	public void init() throws ServletException {
		configuration = new Configuration();
		configuration.setServletContextForTemplateLoading(getServletContext(),"");
	}

}
