package com.giscafer.schedule.check;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.giscafer.general.GeneralController;
import com.giscafer.utils.DataUtils;
import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Page;

import data.general.QueryFilter;

public class CheckController extends Controller {

	/**
	 * 分页查询渲染Check首页
	 * 
	 * @param request
	 * @param response
	 * @param pageSize
	 */
	public void renderCheckIndex(HttpServletRequest request,
			HttpServletResponse response, int pageSize) {
		int pageNumber = 1;
		// 获取分页参数
		String pno = request.getParameter("pno");
		if (pno != null) {
			pageNumber = Integer.parseInt(pno);
		}
		if (pageSize == 0) {
			pageSize = 10;
		}
		Page<Check> page = Check.dao.paginate(pageNumber, pageSize);
		GeneralController.renderIndex(request, response, page);
	}

	public void index() {
		HttpServletRequest request = getRequest();
		HttpServletResponse response = getResponse();
		renderCheckIndex(request, response, 6);
		renderNull();
	}

	/**
	 * 查询
	 */
	public void getEntityList() {
		QueryFilter queryFilter = new QueryFilter();
		String whereStr = getPara("whereString") != null ? getPara("whereString"): "1=1";
		String selectFields = getPara("selectFields") != null ? getPara("selectFields"): "*";
		String orderString = getPara("orderString") != null ? getPara("orderString"): " pid asc";
		queryFilter.setWhereString(whereStr);
		queryFilter.setSelectFields(selectFields);
		queryFilter.setOrderString(orderString);
		List<Check> dictList = Check.dao.getEntityList(queryFilter);
		String result = DataUtils.listToJsonStr(dictList, Check.dao);
		renderJson(result);
	}
}
