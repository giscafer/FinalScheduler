package com.giscafer.utils;

import java.util.List;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Page;
/**
 * 
 * @ClassName: DataUtils  
 * @Description: TODO(数据处理转换工具类)  
 * @author giscafer 
 * @date 2015-11-1 下午2:32:18  
 *
 */
public class DataUtils {

	/**
	 * dataTable转换成Json格式
	 * @param list
	 * @return
	 */
	public static String pageToJson(Page<?> paginate,Model<?> model) {
		StringBuilder jsonBuilder = new StringBuilder();
		System.out.println(paginate);
		List<?> list=paginate.getList();
		//获取表内行数
		int totalRow=paginate.getTotalRow();
		jsonBuilder.append("{\"total\":");
		jsonBuilder.append(totalRow);
		jsonBuilder.append(",\"rows\":[");
		for (int i = 0; i < list.size(); i++) {
			model = (Model<?>) list.get(i);
			//将model转为json
			jsonBuilder.append(model.toJson());
			jsonBuilder.append(",");
		}
		jsonBuilder.deleteCharAt(jsonBuilder.length()-1);
		jsonBuilder.append("]}");
		return jsonBuilder.toString();
	}
	/**
	 * list转json
	 * @param list
	 * @param model
	 * @return
	 */
	public static String listToJsonStr(List<?> list,Model<?> model){
		StringBuilder jsonBuilder = new StringBuilder();
		if(list.size()==0){
			return "[]";
		}
		jsonBuilder.append("[");
		for (int i = 0; i < list.size(); i++) {
			model = (Model<?>) list.get(i);
			//将model转为json
			jsonBuilder.append(model.toJson());
			jsonBuilder.append(",");
		}
		jsonBuilder.deleteCharAt(jsonBuilder.length()-1);
		jsonBuilder.append("]");
		return jsonBuilder.toString();
		
	}
}
