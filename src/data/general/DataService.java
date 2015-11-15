/**
 * Copyright (c) 2015, giscafer (giscafer@outlook.com).
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package data.general;

import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Model;
/**
 * 
 * @ClassName: DataService  
 * @Description: TODO(数据CDUQ接口)  
 * @author giscafer 
 * @date 2015-11-14 下午5:01:49  
 *
 */
public class DataService implements IDataService{
	/**
	 * 更新接口
	 * @param insertedJson json数组字符串
	 * @param Class<?> c
	 * @return Boolean
	 */
	@Override
	public boolean update(String insertedJson,Class<?> c){
		boolean result=false;
		//
		if(insertedJson!=null && !insertedJson.equals("")){
			//字符串json数组转为json数组对象
			JSONArray jsonArray = JSONArray.fromObject(insertedJson);  
	        //json数组转List<Map>
	        List<Map<String,Object>> mapListJson = (List)jsonArray;  
	        //Map对象反序列化为Model
	        for (int i = 0; i < mapListJson.size(); i++) {  
	            Map<String,Object> map=mapListJson.get(i);  
	            try {
					result=((Model<?>) c.newInstance()).setAttrs(map).update();
				} catch (InstantiationException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (IllegalAccessException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
	        }  
		}
		return result;
	}
	/**
	 * 更新接口
	 * <p>
	 * @param tableName 表名
	 * @param updateFilter 更新条件对象
	 * @return int 更新记录数
	 */
	@Override
	public int update(String tableName, UpdateFilter updateFilter) {
		String whereString = updateFilter.getWhereString();
		String setFields = updateFilter.getSetFields();

		if ("".equals(tableName) || tableName == null)
			return 0;
		if ("".equals(whereString) || whereString == null)
			whereString = "1=1";
		if ("".equals(setFields) || setFields == null)
			return 0;
		
		String sql = "update " + tableName+" set " + setFields + " where (" + whereString + ")";
		
		return  Db.update(sql);
	}
	/**
	 * 保存
	 * @param insertedJson json数组字符串
	 * @param queryFilter 查询条件对象
	 * @return Boolean 
	 */
	@Override
	public boolean save(String insertedJson,Class<?> c){
		boolean result=false;
		//
		if(insertedJson!=null && !insertedJson.equals("")){
			//字符串json数组转为json数组对象
			JSONArray jsonArray = JSONArray.fromObject(insertedJson);  
	        //json数组转List<Map>
	        List<Map<String,Object>> mapListJson = (List)jsonArray;  
	        //Map对象反序列化为Model
	        for (int i = 0; i < mapListJson.size(); i++) {  
	            Map<String,Object> map=mapListJson.get(i);  
	            try {
					result=((Model<?>) c.newInstance()).setAttrs(map).save();
				} catch (InstantiationException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (IllegalAccessException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
	        }  
		}
		return result;
	}
	/**
	 * 数据查询方法
	 * @param tableName 表名
	 * @param queryFilter 查询条件对象
	 * @param model 表的model对象
	 * @return List<?>
	 */
	@Override
	public List<?> getEntityList(String tableName, QueryFilter queryFilter,
			Model<?> model) {
		String whereString = queryFilter.getWhereString();
		String orderString = queryFilter.getOrderString();
		String selectFields = queryFilter.getSelectFields();

		if ("".equals(tableName) || tableName == null)
			return null;
		if ("".equals(whereString) || whereString == null)
			whereString = "1=1";
		if ("".equals(selectFields) || selectFields == null)
			selectFields = "*";
		
		String sql = "select " + selectFields+" from " + tableName + " where (" + whereString+ ")";
		if (!"".equals(orderString) && orderString != null) {
			sql+=" order by "+orderString;
		}
		return model.find(sql);
	}
	/**
	 * 删除接口
	 */
	@Override
	public int del(String tableName, String whereString) {
		if(whereString==null || "".equals(whereString)){
			whereString="1=1";
		}
		String sql = "delete from " + tableName+" where (" + whereString + ")";
		return  Db.update(sql);
	}
	

	
}
