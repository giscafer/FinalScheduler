package com.giscafer.schedule.scheduler;

import java.util.List;

import com.giscafer.utils.DataUtils;
import com.jfinal.core.Controller;

import data.general.DataService;
import data.general.QueryFilter;
import data.general.UpdateFilter;

/**
 * 
 * @ClassName: SchedulerController
 * @Description: TODO(排班管理Controller)
 * @author giscafer
 * @date 2015-11-15 上午12:31:15
 * 
 */
public class SchedulerController extends Controller {

	public DataService dataService = new DataService();

	/**
	 * 加载首页
	 */
	public void index() {
	}

	/**
	 * 查询人员分组信息
	 */
	public void getGroupPersonList() {
		QueryFilter queryFilter = new QueryFilter();
		if (getPara() == null) {
			queryFilter.setWhereString("1=1");
		} else {
			queryFilter.setWhereString(getPara());
		}
//		System.out.println(getPara());// 传参方式分隔符为“/”
		queryFilter.setSelectFields("*");
		queryFilter.setOrderString("gid desc");
		List<GroupPerson> dictList = GroupPerson.me.getEntityList(queryFilter);
		String result = DataUtils.listToJsonStr(dictList, GroupPerson.me);
		renderJson(result);
	}

	/**
	 * 查询排班记录信息
	 */
	public void getSchedulerList() {
		QueryFilter queryFilter = new QueryFilter();

		String whereString = getPara("whereString"); // 排班日期
		if (whereString == null) {
			whereString = "1=1";
		}
		queryFilter.setWhereString(whereString);

		queryFilter.setSelectFields("*");
		queryFilter.setOrderString("id ASC");
		List<Scheduler> dictList = Scheduler.me.getEntityList(queryFilter);
		String result = DataUtils.listToJsonStr(dictList, Scheduler.me);
//		System.out.println(result);
		renderJson(result);
	}

	/**
	 * 更新排班
	 */
	public void updateSchedule() {
		int result = 0;
		UpdateFilter updateFilter = new UpdateFilter();
		String setFields = getPara("setFields"); // 排班日期
		String whereString = getPara("whereString"); // 排班日期
		updateFilter.setWhereString(whereString);
		if (setFields == null)
			renderNull();
		updateFilter.setSetFields(setFields);
		result = dataService.update(Scheduler.tableName, updateFilter);
		renderJson(result);
	}

	/**
	 * 保存排班记录
	 */
	public void saveSchedule() {
		String insertedJson = getPara("inserted");
		boolean result = dataService.save(insertedJson, Scheduler.class);
		renderJson(result);
	}
}
