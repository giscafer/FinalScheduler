package com.giscafer.utils;

import java.util.List;

import com.demo.blog.Blog;

public class DataSetToJson {

	/**
	 * dataTable转换成Json格式
	 * @param list
	 * @return
	 */
	public static String dataTableToJson(List list) {
		StringBuilder jsonBuilder = new StringBuilder();
		jsonBuilder.append("{\"total\":");
		jsonBuilder.append(list.size());
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
