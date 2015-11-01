package com.giscafer.schedule.person;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Page;
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
	/**
	 * 分页查询
	 */
	public Page<Person> paginate(int pageNumber, int pageSize) {
		Page<Person> pagePerson=paginate(pageNumber, pageSize, "select * ", "from gc_schedule_person order by pid desc");
		return pagePerson;
	}
}
