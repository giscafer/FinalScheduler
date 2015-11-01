package com.giscafer.schedule.dict;

import java.util.List;

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
	public List<Dict> find(String selectFields,String whereString){
		if("".equals(whereString) || whereString==null) whereString="1=1";
		if("".equals(selectFields) || selectFields==null) selectFields="*";
		String selectStr="select "+selectFields;
		String queryStr=" from gc_common_dict where "+whereString+" order by dictCode asc";
		return find(selectStr+queryStr);
		
	}
}
