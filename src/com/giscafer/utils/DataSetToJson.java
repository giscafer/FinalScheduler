package com.giscafer.utils;

import java.util.List;

import com.demo.blog.Blog;
import com.jfinal.plugin.activerecord.Page;

public class DataSetToJson {

	/**
	 * dataTable转换成Json格式
	 * @param list
	 * @return
	 */
	public static String dataTableToJson(Page<Blog> paginate) {
		StringBuilder jsonBuilder = new StringBuilder();
		List<Blog> list=paginate.getList();
		int totalRow=paginate.getTotalRow();
		System.out.println(list.get(0));
		jsonBuilder.append("{\"total\":");
		jsonBuilder.append(totalRow);
		jsonBuilder.append(",\"rows\":[");
		for (int i = 0; i < list.size(); i++) {
			Blog blog = (Blog) list.get(i);
			jsonBuilder.append(blog.toJson());
			jsonBuilder.append(",");
		}
		jsonBuilder.deleteCharAt(jsonBuilder.length()-1);
		jsonBuilder.append("]}");
		System.out.println(jsonBuilder.toString());
		return jsonBuilder.toString();
	}
}
