package com.giscafer.schedule.dict;

import java.io.IOException;
import java.util.List;

import com.giscafer.utils.DataUtils;
import com.jfinal.core.ActionKey;
import com.jfinal.core.Controller;

public class DictController extends Controller{

	public void index(){}
	/**
	 * 查询
	 * @throws IOException
	 */
	@ActionKey("/queryDict")
	public void queryDict() throws IOException{
		String whereString="domainName='"+getPara("filter")+"'";
		List<Dict> dictList=Dict.me.find("dictCode,dictName",whereString);
		String result=DataUtils.listToJsonStr(dictList, Dict.me);
		renderJson(result);
	}
}
