package data.general;
/**
 * 
 * @ClassName: QueryFilter  
 * @Description: TODO(查询过滤接口)  
 * @author giscafer 
 * @date 2015-11-1 下午11:28:30  
 *
 */
public class QueryFilter {

	private String selectFields;
	private String whereString;
	private String orderString;
	
	public QueryFilter() {
		super();
	}
	public QueryFilter(String selectFields, String whereString,
			String orderString) {
		super();
		this.selectFields = selectFields;
		this.whereString = whereString;
		this.orderString = orderString;
	}
	public String getSelectFields() {
		return selectFields;
	}
	public void setSelectFields(String selectFields) {
		this.selectFields = selectFields;
	}
	public String getWhereString() {
		return whereString;
	}
	public void setWhereString(String whereString) {
		this.whereString = whereString;
	}
	public String getOrderString() {
		return orderString;
	}
	public void setOrderString(String orderString) {
		this.orderString = orderString;
	}
	
}
