package com.giscafer.schedule.plan;

import java.util.List;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Page;

import data.general.DataService;
import data.general.QueryFilter;

/**
 * 
 * @ClassName: Plan  
 * @Description: TODO(描述该类的作用)  
 * @author giscafer 
 * @date 2015-11-4 下午11:15:13  
 *
 */
@SuppressWarnings("serial")
public class Plan extends Model<Plan>{
	public static final Plan me=new Plan();
	DataService dataService=new DataService();
	/**
	 * 分页查询
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 */
	public Page<Plan> paginate(int pageNumber, int pageSize) {
		Page<Plan> pagePlan=paginate(pageNumber, pageSize, "select * ", "from gc_schedule_plan order by pid desc");
		return pagePlan;
	}
	@SuppressWarnings("unchecked")
	public List<Plan> getEntityList(QueryFilter queryFilter){
		return  (List<Plan>) dataService.getEntityList("gc_schedule_plan",queryFilter, me);
	}
}
