package com.giscafer.schedule.scheduler;

import java.util.List;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Page;

import data.general.DataService;
import data.general.QueryFilter;

@SuppressWarnings("serial")
public class Scheduler extends Model<Scheduler>{

	public static final Scheduler me=new Scheduler();
	public static final String tableName="gc_schedule_scheduler";
	DataService dataService=new DataService();
	/**
	 * 分页查询
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 */
	public Page<Scheduler> paginate(int pageNumber, int pageSize) {
		Page<Scheduler> page=paginate(pageNumber, pageSize, "select * ", "from "+tableName+" order by pid desc");
		return page;
	}
	@SuppressWarnings("unchecked")
	public List<Scheduler> getEntityList(QueryFilter queryFilter){
		return  (List<Scheduler>) dataService.getEntityList(tableName,queryFilter, me);
	}
}
