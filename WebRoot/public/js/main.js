/**
 * 系统界面切换加载
 * @param  {String} ui    页面路径
 */
function loadUI(ui) {
    var title = "ID" + ui.length;
    $("#giscafer_content").empty();
    if (ui && ui != "")
        ui = window.hostUrl + 'home?template=' + ui;
    var i = document.getElementById("title");
    if (i == null) {
        $.post(ui, {
            "cache": "11"
        }, function(data) {
            if (data != null && data.indexOf("redirect->login") == 0) {
                window.location = window.hostUrl;
            }
            $(".workingModel").each(function() {
                $(this).hide();
            });
            if (data != "") {
                var dataStr = "<div id=" + title + " class='workingModel'>" + data + "</div>";
                $("#giscafer_content").append(dataStr);
            }
        }, "html");
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
/**
 * 加载页面并渲染（freemarker）
 * @author giscafer
 * @version 1.0
 * @date    2015-11-05T00:24:33+0800
 * @param   {String}                 route 请求路由
 * @param   {String}                 ui    页面路径
 */
function loadUIAndRender(route, ui, callback) {
    var title = "ID" + ui.length;
    $("#giscafer_content").empty();
    if (!route) route = "home";
    if (ui && ui != "")
        ui = window.hostUrl + route + '?template=' + ui;
    var i = document.getElementById("title");
    if (i == null) {
        $.post(ui, {
            "cache": "11"
        }, function(data) {
            if (data != null && data.indexOf("redirect->login") == 0) {
                window.location = window.hostUrl;
            }
            $(".workingModel").each(function() {
                $(this).hide();
            });
            if (data != "") {
                var dataStr = "<div id=" + title + " class='workingModel'>" + data + "</div>";
                $("#giscafer_content").append(dataStr);
            }
            if (typeof callback === "function") {
                callback();
            }
        }, "html");
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

function gcGet(url, callback) {
    $.get(url, function(data) {
        if (typeof callback === "function")
            callback(data);
    });
}
