package com.giscafer.schedule.dict;

import java.util.List;

import com.giscafer.schedule.query.QueryController;
import com.giscafer.schedule.query.QueryFilter;
import com.jfinal.plugin.activerecord.Model;
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
	@SuppressWarnings("unchecked")
	public List<Dict> find(QueryFilter queryFilter){
		return  (List<Dict>) QueryController.find("gc_common_dict",queryFilter, me);
	}
}
