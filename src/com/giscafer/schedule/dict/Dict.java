package com.giscafer.schedule.dict;

import java.util.List;

import com.jfinal.plugin.activerecord.Model;

import data.general.DataService;
import data.general.QueryFilter;
/**
 * 
 * @ClassName: Dict  
 * @Description: TODO(业务字典model)  
 * @author giscafer 
 * @date 2015-11-1 下午6:18:37  
 *
 */
@SuppressWarnings("serial")
public class Dict extends Model<Dict>{

	public static Dict me=new Dict();
	DataService dataService=new DataService();
	@SuppressWarnings("unchecked")
	public List<Dict> find(QueryFilter queryFilter){
		return  (List<Dict>) dataService.getEntityList("gc_common_dict",queryFilter, me);
	}
}
