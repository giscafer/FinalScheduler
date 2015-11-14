package com.giscafer.schedule.group;

import java.util.List;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Model;

import data.general.DataService;
import data.general.QueryFilter;
import data.general.UpdateFilter;
/**
 * 
 * @ClassName: Group  
 * @Description: TODO(人员分组model)  
 * @author giscafer 
 * @date 2015-11-1 下午11:16:34  
 *
 */
@SuppressWarnings("serial")
public class Group extends Model<Group>{

	public static Group me=new Group();
	DataService dataService=new DataService();
	@SuppressWarnings("unchecked")
	public List<Group> find(QueryFilter queryFilter){
		return (List<Group>) dataService.getEntityList("gc_schedule_group",queryFilter, me);
	}
	public int deleteAll(){
		return Db.update("delete from gc_schedule_group where 1=1");
	}
	public int update(UpdateFilter updateFiter){
		String sql="update gc_schedule_group "+updateFiter.getSetFields()+" where "+updateFiter.getWhereString();
		return Db.update(sql);
	}
}
