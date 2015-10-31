package com.demo.blog;

import java.io.IOException;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;

import net.sf.json.JSONArray;

import com.giscafer.utils.DataSetToJson;
import com.jfinal.aop.Before;
import com.jfinal.core.ActionKey;
import com.jfinal.core.Controller;

/**
 * BlogController
 * 所有 sql 与业务逻辑写在 Model 或 Service 中，不要写在 Controller 中，养成好习惯，有利于大型项目的开发与维护
 */
@Before(BlogInterceptor.class)
public class BlogController extends Controller {
	public void index() {
		setAttr("blogPage", Blog.me.paginate(getParaToInt(0, 1), 10));
		render("blog.html");
	}
	
	public void add() {
	}
	
	@Before(BlogValidator.class)
	public void save() {
		getModel(Blog.class).save();
		redirect("/blog");
	}
	
	public void edit() {
		setAttr("blog", Blog.me.findById(getParaToInt()));
	}
	
	@Before(BlogValidator.class)
	public void update() {
		getModel(Blog.class).update();
		redirect("/blog");
	}
	
	public void delete() {
		Blog.me.deleteById(getParaToInt());
		redirect("/blog");
	}
	@ActionKey("/findBlog")
	public void findBlog() throws IOException{
		int rows=Integer.parseInt(getPara("rows"));
		int page=Integer.parseInt(getPara("page"));
		String result=DataSetToJson.dataTableToJson(Blog.me.paginate(page, rows));
		renderJson(result);
	}
	/**
	 * datagrid提交修改数据
	 * @throws IOException 
	 * @throws JsonMappingException 
	 * @throws JsonParseException 
	 */
	public void commit() throws JsonParseException, JsonMappingException, IOException{
		String insertedJson=getPara("inserted");
		String updatedJson=getPara("updated");
		String deletedJson=getPara("deleted");
		//字符串json数组转为json数组对象
		JSONArray jsonArray = JSONArray.fromObject(insertedJson);  
        //json数组转List<Map>
        List<Map<String,Object>> mapListJson = (List)jsonArray;  
        //Map对象反序列化为Model
        Iterator<?> it = mapListJson.iterator();  
        for (int i = 0; i < mapListJson.size(); i++) {  
            Map<String,Object> map=mapListJson.get(i);  
            Blog.me.setAttrs(map).save();
        }  
		renderJson("{'status':true}");
	}
}


