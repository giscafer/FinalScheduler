package com.giscafer.schedule.scheduler;

import java.util.List;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Page;

import data.general.DataService;
import data.general.QueryFilter;
/**
 * 
 * @ClassName: GroupPerson  
 * @Description: TODO(人员分租信息视图model)  
 * @author giscafer 
 * @date 2015-11-15 上午12:30:16  
 *
 */
@SuppressWarnings("serial")
public class GroupPerson extends Model<GroupPerson>{

	public static final GroupPerson me=new GroupPerson();
	DataService dataService=new DataService();
	/**
	 * 分页查询
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 */
	public Page<GroupPerson> paginate(int pageNumber, int pageSize) {
		Page<GroupPerson> page=paginate(pageNumber, pageSize, "select * ", "from gc_schedule_group_person_v order by pid desc");
		return page;
	}
	@SuppressWarnings("unchecked")
	public List<GroupPerson> getEntityList(QueryFilter queryFilter){
		return  (List<GroupPerson>) dataService.getEntityList("gc_schedule_group_person_v",queryFilter, me);
	}
}
