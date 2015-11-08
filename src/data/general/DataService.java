package data.general;

import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;

import com.giscafer.schedule.plan.Plan;
import com.jfinal.plugin.activerecord.Model;

public class DataService {

	public static boolean update(String insertedJson,Class<?> c){
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
	public static boolean save(String insertedJson,Class<?> c){
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
}
