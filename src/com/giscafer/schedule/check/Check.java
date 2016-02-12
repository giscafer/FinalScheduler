package com.giscafer.schedule.check;

import java.util.List;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Page;

import data.general.DataService;
import data.general.QueryFilter;
/**
 * 
 * @ClassName: Check  
 * @Description: TODO(考勤签到统计)  
 * @author giscafer 
 * @date 2015-11-25 下午10:16:00  
 *
 */
@SuppressWarnings("serial")
public class Check extends Model<Check>{

	public static final Check dao=new Check();
	DataService dataService=new DataService();
	/**
	 * 分页查询
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 */
	public Page<Check> paginate(int pageNumber, int pageSize) {
		Page<Check> pageCheck=paginate(pageNumber, pageSize, "select * ", "from gc_schedule_check_statistics_v");
		return pageCheck;
	}
	@SuppressWarnings("unchecked")
	public List<Check> getEntityList(QueryFilter queryFilter){
		return  (List<Check>) dataService.getEntityList("gc_schedule_check_statistics_v",queryFilter, dao);
	}
}
