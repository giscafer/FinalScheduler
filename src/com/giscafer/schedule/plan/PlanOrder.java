package com.giscafer.schedule.plan;

import java.util.List;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Page;

import data.general.DataService;
import data.general.QueryFilter;
/**
 * 
 * @ClassName: PlanOrder  
 * @Description: TODO(班次次序表model)  
 * @author giscafer 
 * @date 2015-11-15 下午3:30:15  
 *
 */
@SuppressWarnings("serial")
public class PlanOrder extends Model<PlanOrder> {

	public static final PlanOrder me = new PlanOrder();
	public static final String tableName = "gc_schedule_planorder";
	DataService dataService = new DataService();

	/**
	 * 分页查询
	 * 
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 */
	public Page<PlanOrder> paginate(int pageNumber, int pageSize) {
		Page<PlanOrder> pagePlanOrder = paginate(pageNumber, pageSize,
				"select * ", "from " + tableName + " order by id desc");
		return pagePlanOrder;
	}

	@SuppressWarnings("unchecked")
	public List<PlanOrder> getEntityList(QueryFilter queryFilter) {
		return (List<PlanOrder>) dataService.getEntityList(tableName,
				queryFilter, me);
	}
}
