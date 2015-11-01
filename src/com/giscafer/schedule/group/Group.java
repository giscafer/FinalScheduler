package com.giscafer.schedule.group;

import java.util.List;

import com.giscafer.schedule.query.QueryController;
import com.giscafer.schedule.query.QueryFilter;
import com.jfinal.plugin.activerecord.Model;
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
	@SuppressWarnings("unchecked")
	public List<Group> find(QueryFilter queryFilter){
		return (List<Group>) QueryController.find("gc_shcedule_group",queryFilter, me);
	}
}
