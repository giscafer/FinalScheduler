package com.giscafer.schedule.person;

import java.util.List;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Page;

import data.general.DataService;
import data.general.QueryFilter;
/**
 * 
 * @ClassName: Person  
 * @Description: Person model
 * @author giscafer 
 * @date 2015-11-1 下午2:21:21  
 *
 */
@SuppressWarnings("serial")
public class Person extends Model<Person>{
	public static final Person me = new Person();
	DataService dataService=new DataService();
	/**
	 * 分页查询
	 */
	public Page<Person> paginate(int pageNumber, int pageSize) {
		Page<Person> pagePerson=paginate(pageNumber, pageSize, "select * ", "from gc_schedule_person order by pid desc");
		return pagePerson;
	}
	@SuppressWarnings("unchecked")
	public List<Person> find(QueryFilter queryFilter){
		return  (List<Person>) dataService.getEntityList("gc_schedule_person",queryFilter, me);
	}
}
