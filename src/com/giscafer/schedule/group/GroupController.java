package com.giscafer.schedule.group;

import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;

import com.giscafer.utils.DataUtils;
import com.jfinal.core.ActionKey;
import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Db;

import data.general.QueryFilter;
import data.general.UpdateFilter;

public class GroupController extends Controller{
	
	public void index(){}
	@ActionKey("/queryGroup")
	public void queryGroup(){
		QueryFilter queryFilter=new QueryFilter();
		String selectFields=getPara("selectFields");
		String whereString=getPara("whereString");
		String orderString=getPara("orderString");
		if(whereString==null){
			whereString="1=1";
		}
		if(selectFields==null){
			selectFields="*";
		}
		if(orderString==null){
			orderString="gid asc";
		}
		queryFilter.setSelectFields(selectFields);
		queryFilter.setWhereString(whereString);
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
	/**
	 * 删除
	 */
	@ActionKey("delGroupById")
	public void deleteById(){
		boolean result=Group.me.deleteById(getParaToInt());
		renderJson(result);
	}
	/**
	 * 清空表数据
	 */
	@ActionKey("delAllGroup")
	public void deleteAll(){
		int result=Group.me.deleteAll();
		renderJson(result);
	}
	/**
	 * 更新
	 */
	@ActionKey("updateGroup")
	public void update(){
		String setFields=getPara("setFields");
		String whereString=getPara("whereString");
		UpdateFilter updateFilter=new UpdateFilter();
		updateFilter.setSetFields(setFields);
		updateFilter.setWhereString(whereString);
		int result=Group.me.update(updateFilter);
		renderJson(result);
	}
}
