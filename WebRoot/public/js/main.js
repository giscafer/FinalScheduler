/**
 * 系统界面切换加载
 * @param  {[type]} ui [description]
 * @return {[type]}    [description]
 */
function loadUI(ui)
{
	var title="ID"+ui.length;
	$("#giscafer_content").empty();
	if(ui&&ui!="")
	    ui = window.hostUrl+'home?template='+ui;
	var i = document.getElementById("title");
	if (i == null) {
		$.post(ui, {
					"cache" : "11"
				}, function(data) {
					if(data != null && data.indexOf("redirect->login")==0){
						window.location =window.hostUrl;
					}
					$(".workingModel").each(function() {
								$(this).hide();
							});
					if (data != "") {
						var dataStr = "<div id=" + title
								+ " class='workingModel'>" + data
								+ "</div>";
						$("#giscafer_content").append(dataStr);
					}
				},"html");
	} else {
		$(".workingModel").each(function() {
			if ($(this).attr("id") == title) {
				$(this).show();
			} else {
				$(this).hide();
			}
		})
	}
}