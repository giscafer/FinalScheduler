package com.giscafer.schedule.plan;

import java.util.List;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Page;

import data.general.DataService;
import data.general.QueryFilter;

@SuppressWarnings("serial")
public class PlanOrder extends Model<PlanOrder>{

	public static final PlanOrder me=new PlanOrder();
	DataService dataService=new DataService();
	/**
	 * 分页查询
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 */
	public Page<PlanOrder> paginate(int pageNumber, int pageSize) {
		Page<PlanOrder> pagePlanOrder=paginate(pageNumber, pageSize, "select * ", "from gc_schedule_planorder order by id desc");
		return pagePlanOrder;
	}
	@SuppressWarnings("unchecked")
	public List<PlanOrder> getEntityList(QueryFilter queryFilter){
		return  (List<PlanOrder>) dataService.getEntityList("gc_schedule_planorder",queryFilter, me);
	}
}
