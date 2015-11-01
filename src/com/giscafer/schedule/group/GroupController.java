package com.giscafer.schedule.group;

import java.util.List;

import com.giscafer.schedule.query.QueryFilter;
import com.giscafer.utils.DataUtils;
import com.jfinal.core.ActionKey;
import com.jfinal.core.Controller;

public class GroupController extends Controller{
	
	public void index(){}
	@ActionKey("/queryGroup")
	public void queryGroup(){
		QueryFilter queryFilter=new QueryFilter();
		queryFilter.setSelectFields("*");
		queryFilter.setWhereString("");
		List<Group> dictList=Group.me.find(queryFilter);
		String result=DataUtils.listToJsonStr(dictList, Group.me);
		renderJson(result);
	}

}
