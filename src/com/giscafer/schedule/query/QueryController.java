package com.giscafer.schedule.query;

import java.util.List;

import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Model;

/**
 * 
 * @ClassName: QueryController
 * @Description: TODO(数据查询接口类)
 * @author giscafer
 * @date 2015-11-1 下午11:14:02
 * 
 */
public class QueryController extends Controller {
	/**
	 * 数据查询方法
	 * @param tableName 表名
	 * @param queryFilter 查询条件对象
	 * @param model 表的model对象
	 * @return List<?>
	 */
	public static List<?> find(String tableName, QueryFilter queryFilter,
			Model<?> model) {
		String whereString = queryFilter.getWhereString();
		String orderString = queryFilter.getOrderString();
		String selectFields = queryFilter.getSelectFields();

		if ("".equals(tableName) || tableName == null)
			return null;
		if ("".equals(whereString) || whereString == null)
			whereString = "1=1";
		if ("".equals(selectFields) || selectFields == null)
			selectFields = "*";
		
		String sql = "select " + selectFields+" from " + tableName + " where " + whereString;
		if (!"".equals(orderString) && orderString != null) {
			sql+=" order by "+orderString;
		}
		return model.find(sql);
	}
}
