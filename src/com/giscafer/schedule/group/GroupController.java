package com.giscafer.schedule.group;

import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;

import com.giscafer.schedule.group.Group;
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
	@ActionKey("/saveGroup")
	public void saveGroup(){
		boolean result=false;
		String insertedJson=getPara("inserted");
		String updatedJson=getPara("updated");
		if(insertedJson!=null && !insertedJson.equals("")){
			//字符串json数组转为json数组对象
			JSONArray jsonArray = JSONArray.fromObject(insertedJson);  
	        //json数组转List<Map>
	        List<Map<String,Object>> mapListJson = (List)jsonArray;  
	        //Map对象反序列化为Model
	        Group group=null;
	        for (int i = 0; i < mapListJson.size(); i++) {  
	            Map<String,Object> map=mapListJson.get(i);  
	            group=new Group();
	            result=group.setAttrs(map).save();
	        }  
		}
		if(updatedJson!=null && !updatedJson.equals("")){
			JSONArray updatedJsonArray = JSONArray.fromObject(updatedJson);  
	        List<Map<String,Object>> updatedListJson = (List)updatedJsonArray;  
	        Group updateGroup=null;
	        for (int i = 0; i < updatedListJson.size(); i++) {  
	            Map<String,Object> map=updatedListJson.get(i);  
	            updateGroup=new Group();
	            result=updateGroup.setAttrs(map).update();
	        }  
		}
		renderJson(result);
	}

}
